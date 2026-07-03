"use client";

import { useEffect } from "react";

import { useScene } from "@/components/providers/SceneProvider";
import { useCurrentArchive } from "@/hooks/useCurrentArchive";
import { useSound } from "@/hooks/useSound";

import TrackList from "@/components/drive/TrackList";

export default function DriveScene() {
  const {
    selectedTrack,
    setSelectedTrack,
    nextTrack,
    previousTrack,
    setScene,
  } = useScene();

  const { archive, archiveTracks } = useCurrentArchive();
  const sound = useSound();

  function openTrack() {
    sound.insert();
    setScene("viewer");
  }

  function goBack() {
    sound.eject();
    setScene("archive");
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowDown":
          event.preventDefault();
          sound.click();
          nextTrack();
          break;

        case "ArrowUp":
          event.preventDefault();
          sound.click();
          previousTrack();
          break;

        case "Enter":
          event.preventDefault();
          openTrack();
          break;

        case "Escape":
          event.preventDefault();
          goBack();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [nextTrack, previousTrack, selectedTrack]);

  return (
    <main className="drive-scene">
      <section className="drive-shell">
        <header className="drive-topbar">
          <div className="drive-brand">
            <span className="drive-orb">◉</span>

            <div>
              <p>MEMORY DISC / TRACK SELECT</p>
              <h1>{archive.title}</h1>
            </div>
          </div>

          <div className="drive-code">
            <span>DISC CODE</span>
            <strong>{archive.code}</strong>
            <small>ARC-001 ONLINE</small>
          </div>
        </header>

        <div className="drive-windowbar">
          <div>
            <span>✦</span>
            <span>MEMORY-DRIVE.EXE</span>
          </div>

          <span>
            TRACK {String(selectedTrack + 1).padStart(2, "0")} /{" "}
            {String(archiveTracks.length).padStart(2, "0")}
          </span>
        </div>

        <div className="drive-body">
          <div className="drive-intro">
            <span>PLAYLIST LOADED</span>
            <p>Choose a track to open the next memory.</p>
          </div>

          <div className="drive-track-panel">
            <div className="drive-track-panel-head">
              <span>TRACK DIRECTORY</span>
              <span>SELECT WITH ↑ ↓</span>
            </div>

            <TrackList
              tracks={archiveTracks}
              selectedTrack={selectedTrack}
              onSelectTrack={(index) => {
                sound.click();
                setSelectedTrack(index);
              }}
            />
          </div>

          <div className="drive-controls">
            <button
              type="button"
              className="drive-button drive-button-secondary"
              onClick={goBack}
            >
              ← BACK TO ARCHIVE
            </button>

            <button
              type="button"
              className="drive-button drive-button-primary"
              onClick={openTrack}
            >
              OPEN TRACK
            </button>
          </div>
        </div>

        <footer className="drive-footer">
          <div>
            <span className="drive-pulse" />
            <span>MEMORY LINK ESTABLISHED</span>
          </div>

          <div>
            <span>↑ ↓ BROWSE</span>
            <span>•</span>
            <span>ENTER OPEN</span>
            <span>•</span>
            <span>ESC BACK</span>
          </div>
        </footer>
      </section>
    </main>
  );
}