"use client";

export default function GalleryViewer() {
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
              The gallery will unlock after our pre-graduation day.
            </p>
          </header>

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
                pre-graduation.
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

          <div className="gallery-grid-preview">
            <div className="gallery-preview-cell">01</div>
            <div className="gallery-preview-cell">02</div>
            <div className="gallery-preview-cell">03</div>
          </div>
        </div>

        <footer className="gallery-footer">
          <div>
            <span className="gallery-pulse" />
            <span>MEMORY ARCHIVE STANDBY</span>
          </div>

          <div>
            <span>PHOTOS PENDING</span>
            <span>•</span>
            <span>FTU 2026</span>
          </div>
        </footer>
      </section>
    </main>
  );
}