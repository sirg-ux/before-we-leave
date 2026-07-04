"use client";

import { useEffect, useState } from "react";

type GalleryPhoto = {
  name: string;
  url: string;
  createdAt: string | null;
};

export default function GalleryViewer() {
  const [photos, setPhotos] = useState<GalleryPhoto[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedPhoto, setSelectedPhoto] =
    useState<GalleryPhoto | null>(null);
  const [zoom, setZoom] = useState(1);
  const [isDownloading, setIsDownloading] = useState(false);

  useEffect(() => {
    async function loadGallery() {
      try {
        const response = await fetch("/api/gallery", {
          cache: "no-store",
        });

        const data = await response.json();

        if (response.ok) {
          setPhotos(data.photos ?? []);
        }
      } finally {
        setIsLoading(false);
      }
    }

    void loadGallery();
  }, []);

  function openPhoto(photo: GalleryPhoto) {
    setSelectedPhoto(photo);
    setZoom(1);
  }

  function closePhoto() {
    setSelectedPhoto(null);
    setZoom(1);
  }

  function zoomIn() {
    setZoom((current) => Math.min(current + 0.25, 2.5));
  }

  function zoomOut() {
    setZoom((current) => Math.max(current - 0.25, 0.75));
  }

  async function downloadPhoto() {
    if (!selectedPhoto) return;

    try {
      setIsDownloading(true);

      const response = await fetch(selectedPhoto.url);
      const blob = await response.blob();

      const objectUrl = URL.createObjectURL(blob);
      const link = document.createElement("a");

      link.href = objectUrl;
      link.download = selectedPhoto.name;
      document.body.appendChild(link);
      link.click();

      link.remove();
      URL.revokeObjectURL(objectUrl);
    } finally {
      setIsDownloading(false);
    }
  }

  return (
    <main className="gallery-viewer">
      <section className="gallery-shell">
        <div className="gallery-windowbar">
          <div>
            <span className="gallery-window-orb">◉</span>
            <span>MEMORY-GALLERY.EXE</span>
          </div>

          <span>TRACK 02 / 03</span>
        </div>

        <div className="gallery-body">
          <header className="gallery-header">
            <span>PHOTO ARCHIVE</span>

            <h1>MEMORY</h1>

            <p>
              A small collection of our last university memories.
            </p>
          </header>

          {isLoading && (
            <section className="gallery-empty-panel">
              <div className="gallery-loader-wrap">
                <div className="gallery-loader">
                  <span />
                </div>

                <span className="gallery-loader-dot">✦</span>
              </div>

              <div className="gallery-empty-copy">
                <p className="gallery-empty-title">
                  READING PHOTO ARCHIVE
                </p>

                <p className="gallery-empty-text">
                  Loading recorded memories...
                </p>
              </div>
            </section>
          )}

          {!isLoading && photos.length === 0 && (
            <section className="gallery-empty-panel">
              <div className="gallery-loader-wrap">
                <div className="gallery-loader">
                  <span />
                </div>

                <span className="gallery-loader-dot">✦</span>
              </div>

              <div className="gallery-empty-copy">
                <p className="gallery-empty-title">
                  ARCHIVE CURRENTLY EMPTY
                </p>

                <p className="gallery-empty-text">
                  New memories will be uploaded after our
                  pre-graduation day.
                </p>
              </div>

              <div className="gallery-status">
                <span>
                  <i />
                  WAITING FOR PHOTOS
                </span>

                <span>UPLOAD SLOT: LOCKED</span>
              </div>
            </section>
          )}

          {!isLoading && photos.length > 0 && (
            <>
              <section className="gallery-photo-grid">
                {photos.map((photo, index) => (
                  <button
                    key={photo.name}
                    type="button"
                    className="gallery-photo-card"
                    onClick={() => openPhoto(photo)}
                  >
                    <img
                      src={photo.url}
                      alt={`Graduation memory ${index + 1}`}
                    />

                    <span className="gallery-photo-index">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </button>
                ))}
              </section>

              <div className="gallery-status">
                <span>
                  <i />
                  {photos.length} MEMORY FILES LOADED
                </span>

                <span>FTU 2026</span>
              </div>
            </>
          )}
        </div>

        <footer className="gallery-footer">
          <div>
            <span className="gallery-pulse" />
            <span>MEMORY ARCHIVE STANDBY</span>
          </div>

          <div>
            <span>PHOTO LIBRARY</span>
            <span>•</span>
            <span>FTU 2026</span>
          </div>
        </footer>
      </section>

      {selectedPhoto && (
        <div
          className="gallery-lightbox"
          role="presentation"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              closePhoto();
            }
          }}
        >
          <div
            className="gallery-lightbox-window"
            role="dialog"
            aria-modal="true"
            aria-label="Photo viewer"
          >
            <header className="gallery-lightbox-bar">
              <span>PHOTO-VIEWER.EXE</span>

              <span>
                {Math.round(zoom * 100)}%
              </span>
            </header>

            <div className="gallery-lightbox-stage">
              <img
                src={selectedPhoto.url}
                alt="Graduation memory preview"
                className="gallery-lightbox-image"
                style={{
                  transform: `scale(${zoom})`,
                }}
              />
            </div>

            <footer className="gallery-lightbox-controls">
              <div className="gallery-lightbox-zoom">
                <button
                  type="button"
                  onClick={zoomOut}
                  disabled={zoom <= 0.75}
                >
                  −
                </button>

                <button
                  type="button"
                  onClick={() => setZoom(1)}
                >
                  100%
                </button>

                <button
                  type="button"
                  onClick={zoomIn}
                  disabled={zoom >= 2.5}
                >
                  +
                </button>
              </div>

              <div className="gallery-lightbox-actions">
                <button
                  type="button"
                  className="gallery-download-button"
                  onClick={() => void downloadPhoto()}
                  disabled={isDownloading}
                >
                  {isDownloading ? "SAVING..." : "DOWNLOAD"}
                </button>

                <button
                  type="button"
                  className="gallery-close-button"
                  onClick={closePhoto}
                >
                  CLOSE ×
                </button>
              </div>
            </footer>
          </div>
        </div>
      )}
    </main>
  );
}