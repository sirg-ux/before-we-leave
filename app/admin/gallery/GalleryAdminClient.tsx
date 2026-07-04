"use client";

import { ChangeEvent, useState } from "react";

type GalleryPhoto = {
  name: string;
  url: string;
  createdAt: string | null;
};

type GalleryAdminClientProps = {
  initialPhotos: GalleryPhoto[];
};

export default function GalleryAdminClient({
  initialPhotos,
}: GalleryAdminClientProps) {
  const [password, setPassword] = useState("");
  const [photos, setPhotos] = useState(initialPhotos);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [message, setMessage] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  async function refreshPhotos() {
    setIsRefreshing(true);

    try {
      const response = await fetch("/api/gallery", {
        cache: "no-store",
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "Could not refresh gallery.");
        return;
      }

      setPhotos(data.photos ?? []);
      setMessage("Gallery refreshed.");
    } catch {
      setMessage("Could not refresh gallery.");
    } finally {
      setIsRefreshing(false);
    }
  }

  function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0] ?? null;

    setSelectedFile(file);
    setMessage("");
  }

  async function uploadPhoto() {
    if (!selectedFile) {
      setMessage("Choose an image first.");
      return;
    }

    if (!password) {
      setMessage("Enter the gallery password.");
      return;
    }

    setIsUploading(true);
    setMessage("Uploading image...");

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

      const response = await fetch("/api/gallery/upload", {
        method: "POST",
        headers: {
          "x-gallery-password": password,
        },
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "Upload failed.");
        return;
      }

      setMessage("Photo uploaded successfully.");
      setSelectedFile(null);

      const input = document.getElementById(
        "gallery-file",
      ) as HTMLInputElement | null;

      if (input) {
        input.value = "";
      }

      await refreshPhotos();
    } catch {
      setMessage("Upload failed.");
    } finally {
      setIsUploading(false);
    }
  }

  async function deletePhoto(fileName: string) {
    if (!password) {
      setMessage("Enter the gallery password first.");
      return;
    }

    const confirmed = window.confirm(
      "Delete this image permanently?",
    );

    if (!confirmed) return;

    try {
      const response = await fetch("/api/gallery/upload", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-gallery-password": password,
        },
        body: JSON.stringify({
          fileName,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.error ?? "Delete failed.");
        return;
      }

      setMessage("Photo deleted.");
      await refreshPhotos();
    } catch {
      setMessage("Delete failed.");
    }
  }

  return (
    <main className="gallery-admin-page">
      <section className="gallery-admin-shell">
        <header className="gallery-admin-bar">
          <span>◉ GALLERY-UPLOAD.EXE</span>
          <span>PRIVATE ADMIN PANEL</span>
        </header>

        <div className="gallery-admin-body">
          <div className="gallery-admin-heading">
            <p>MEMORY MANAGEMENT</p>

            <h1>Upload Gallery Photos</h1>

            <span>
              JPG, PNG, WEBP, GIF · Maximum 12MB per file
            </span>
          </div>

          <section className="gallery-admin-form">
            <label>
              <span>ADMIN PASSWORD</span>

              <input
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                placeholder="Enter password..."
              />
            </label>

            <label>
              <span>PHOTO FILE</span>

              <input
                id="gallery-file"
                type="file"
                accept="image/jpeg,image/png,image/webp,image/gif"
                onChange={handleFileChange}
              />
            </label>

            <button
              type="button"
              onClick={() => void uploadPhoto()}
              disabled={isUploading}
            >
              {isUploading ? "UPLOADING..." : "UPLOAD PHOTO"}
            </button>

            {message && (
              <p className="gallery-admin-message">
                {message}
              </p>
            )}
          </section>

          <section className="gallery-admin-list">
            <div className="gallery-admin-list-head">
              <span>UPLOADED FILES</span>

              <div className="gallery-admin-list-tools">
                <span>{photos.length} TOTAL</span>

                <button
                  type="button"
                  onClick={() => void refreshPhotos()}
                  disabled={isRefreshing}
                >
                  {isRefreshing ? "REFRESHING..." : "REFRESH"}
                </button>
              </div>
            </div>

            <div className="gallery-admin-photo-grid">
              {photos.map((photo) => (
                <article
                  key={photo.name}
                  className="gallery-admin-photo"
                >
                  <img src={photo.url} alt="" />

                  <button
                    type="button"
                    onClick={() => void deletePhoto(photo.name)}
                  >
                    DELETE
                  </button>
                </article>
              ))}

              {photos.length === 0 && (
                <p className="gallery-admin-empty">
                  No uploaded images yet.
                </p>
              )}
            </div>
          </section>
        </div>
      </section>
    </main>
  );
}