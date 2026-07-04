import { supabaseAdmin } from "@/lib/supabase-admin";

import GalleryAdminClient from "./GalleryAdminClient";

export const dynamic = "force-dynamic";

type GalleryPhoto = {
  name: string;
  url: string;
  createdAt: string | null;
};

const BUCKET = "gallery";

export default async function GalleryAdminPage() {
  const { data } = await supabaseAdmin.storage
    .from(BUCKET)
    .list("", {
      limit: 100,
      offset: 0,
      sortBy: {
        column: "created_at",
        order: "desc",
      },
    });

  const initialPhotos: GalleryPhoto[] = (data ?? [])
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

  return <GalleryAdminClient initialPhotos={initialPhotos} />;
}