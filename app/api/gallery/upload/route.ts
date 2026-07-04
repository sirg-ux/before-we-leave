import { NextResponse } from "next/server";

import { supabaseAdmin } from "@/lib/supabase-admin";

export const runtime = "nodejs";

const BUCKET = "gallery";
const MAX_FILE_SIZE = 12 * 1024 * 1024;

const allowedTypes = [
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
];

function isAuthorized(request: Request) {
  const password = request.headers.get("x-gallery-password");

  return Boolean(
    password &&
      process.env.GALLERY_ADMIN_PASSWORD &&
      password === process.env.GALLERY_ADMIN_PASSWORD,
  );
}

export async function POST(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 },
    );
  }

  const formData = await request.formData();
  const file = formData.get("file");

  if (!(file instanceof File)) {
    return NextResponse.json(
      { error: "No image file received." },
      { status: 400 },
    );
  }

  if (!allowedTypes.includes(file.type)) {
    return NextResponse.json(
      { error: "Use JPG, PNG, WEBP, or GIF only." },
      { status: 400 },
    );
  }

  if (file.size > MAX_FILE_SIZE) {
    return NextResponse.json(
      { error: "Image must be smaller than 12MB." },
      { status: 400 },
    );
  }

  const extension =
    file.name.split(".").pop()?.toLowerCase() ||
    file.type.split("/")[1] ||
    "jpg";

  const fileName = `${Date.now()}-${crypto.randomUUID()}.${extension}`;

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .upload(fileName, file, {
      contentType: file.type,
      upsert: false,
    });

  if (error) {
    return NextResponse.json(
      { error: "Upload failed." },
      { status: 500 },
    );
  }

  return NextResponse.json({
    success: true,
    fileName,
  });
}

export async function DELETE(request: Request) {
  if (!isAuthorized(request)) {
    return NextResponse.json(
      { error: "Unauthorized." },
      { status: 401 },
    );
  }

  const body = await request.json();
  const fileName = body?.fileName;

  if (!fileName || typeof fileName !== "string") {
    return NextResponse.json(
      { error: "Missing file name." },
      { status: 400 },
    );
  }

  const { error } = await supabaseAdmin.storage
    .from(BUCKET)
    .remove([fileName]);

  if (error) {
    return NextResponse.json(
      { error: "Could not delete image." },
      { status: 500 },
    );
  }

  return NextResponse.json({ success: true });
}