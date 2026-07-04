import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const BUCKET = "gallery";

export async function GET() {
  const { data, error } = await supabaseAdmin.storage
    .from(BUCKET)
    .list("", {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  if (error) {
    return NextResponse.json(
      { error: "Could not load gallery." },
      { status: 500 },
    );
  }

  const photos = (data ?? [])
    .filter((file) => file.name && !file.name.endsWith("/"))
    .map((file) => {
      const { data: publicUrl } = supabaseAdmin.storage
        .from(BUCKET)
        .getPublicUrl(file.name);

      return {
        name: file.name,
        url: publicUrl.publicUrl,
        createdAt: file.created_at,
      };
    });

  return NextResponse.json({ photos });
}