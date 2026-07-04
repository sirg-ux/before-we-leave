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
                    onClick={() => setSelectedPhoto(photo)}
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
              setSelectedPhoto(null);
            }
          }}
        >
          <button
            type="button"
            className="gallery-lightbox-close"
            onClick={() => setSelectedPhoto(null)}
          >
            ×
          </button>

          <img
            src={selectedPhoto.url}
            alt="Graduation memory preview"
            className="gallery-lightbox-image"
          />
        </div>
      )}
    </main>
  );
}