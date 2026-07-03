"use client";

import { useEffect } from "react";

import { useScene } from "@/components/providers/SceneProvider";
import { useCurrentArchive } from "@/hooks/useCurrentArchive";
import { useSound } from "@/hooks/useSound";

export default function TrackScene() {
  const { selectedTrack, setScene } = useScene();
  const { archive, archiveTracks } = useCurrentArchive();
  const sound = useSound();

  const activeTrack = archiveTracks[selectedTrack];

  function returnToDrive() {
    sound.eject();
    setScene("drive");
  }

  function openViewer() {
    sound.insert();
    setScene("viewer");
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        returnToDrive();
      }

      if (event.key === "Enter") {
        event.preventDefault();
        openViewer();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  if (!activeTrack) {
    return null;
  }

  const trackFileName = activeTrack.title
    .toUpperCase()
    .replace(/[^A-Z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <main className="track-scene">
      <section className="track-shell">
        <header className="track-topbar">
          <div className="track-brand">
            <span className="track-orb">◉</span>

            <div>
              <p>MEMORY DISC / TRACK PREVIEW</p>
              <h1>{archive.title}</h1>
            </div>
          </div>

          <div className="track-number">
            <span>SELECTED TRACK</span>

            <strong>
              {String(selectedTrack + 1).padStart(2, "0")}
            </strong>
          </div>
        </header>

        <div className="track-windowbar">
          <div>
            <span>✦</span>
            <span>TRACK-PREVIEW.EXE</span>
          </div>

          <span>{archive.code}</span>
        </div>

        <div className="track-body">
          <div className="track-label-row">
            <span>NOW LOADING</span>
            <span>MEMORY FILE READY</span>
          </div>

          <section className="track-preview-card">
            <div className="track-artwork">
              <span className="track-artwork-ring track-artwork-ring-one" />
              <span className="track-artwork-ring track-artwork-ring-two" />
              <span className="track-artwork-core">✦</span>

              <p>TRACK</p>

              <strong>
                {String(selectedTrack + 1).padStart(2, "0")}
              </strong>
            </div>

            <div className="track-copy">
              <p className="track-kicker">MEMORY ENTRY</p>

              <h2>{activeTrack.title}</h2>

              <p className="track-description">
                Select this track to open its memory entry in the archive
                viewer.
              </p>

              <div className="track-file-data">
                <div>
                  <span>FILE NAME</span>

                  <strong>{trackFileName}.MEM</strong>
                </div>

                <div>
                  <span>STATUS</span>

                  <strong className="track-ready">
                    <i />
                    READY
                  </strong>
                </div>
              </div>
            </div>
          </section>

          <div className="track-controls">
            <button
              type="button"
              className="track-button track-button-secondary"
              onClick={returnToDrive}
            >
              ← BACK TO TRACKS
            </button>

            <button
              type="button"
              className="track-button track-button-primary"
              onClick={openViewer}
            >
              OPEN MEMORY
            </button>
          </div>
        </div>

        <footer className="track-footer">
          <div>
            <span className="track-pulse" />
            <span>ARCHIVE LINK STABLE</span>
          </div>

          <div>
            <span>ENTER OPEN</span>
            <span>•</span>
            <span>ESC BACK</span>
          </div>
        </footer>
      </section>
    </main>
  );
}