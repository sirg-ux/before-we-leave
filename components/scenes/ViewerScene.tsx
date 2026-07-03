"use client";

import { useEffect } from "react";

import { useScene } from "@/components/providers/SceneProvider";
import { useCurrentArchive } from "@/hooks/useCurrentArchive";
import { useSound } from "@/hooks/useSound";

import OpeningViewer from "@/components/viewer/OpeningViewer";
import GalleryViewer from "@/components/viewer/GalleryViewer";
import EndingViewer from "@/components/viewer/EndingViewer";

export default function ViewerScene() {
  const {
    selectedTrack,
    nextTrack,
    previousTrack,
    setScene,
  } = useScene();

  const sound = useSound();

  const {
    archive,
    archiveTracks,
    currentTrack,
  } = useCurrentArchive();

  function goToDrive() {
    sound.eject();
    setScene("drive");
  }

  function goPrevious() {
    sound.click();
    previousTrack();
  }

  function goNext() {
    sound.click();
    nextTrack();
  }

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          goNext();
          break;

        case "ArrowLeft":
          event.preventDefault();
          goPrevious();
          break;

        case "Escape":
          event.preventDefault();
          goToDrive();
          break;
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedTrack]);

  if (!currentTrack) {
    return null;
  }

  function renderViewer() {
    switch (currentTrack.type) {
      case "opening":
        return <OpeningViewer />;

      case "gallery":
        return <GalleryViewer />;

      case "ending":
        return <EndingViewer />;

      default:
        return null;
    }
  }

  return (
    <main className="viewer-scene">
      <section
        key={currentTrack.id}
        className="viewer-scene-content archive-fade"
      >
        {renderViewer()}
      </section>

      <nav className="viewer-nav-dock" aria-label="Memory navigation">
        <button
          type="button"
          className="viewer-nav-drive"
          onClick={goToDrive}
        >
          <span className="viewer-nav-drive-orb">◉</span>
          <span>DRIVE</span>
        </button>

        <div className="viewer-nav-track">
          <span>
            TRACK {String(selectedTrack + 1).padStart(2, "0")} /{" "}
            {String(archiveTracks.length).padStart(2, "0")}
          </span>

          <strong>{archive.code}</strong>
        </div>

        <div className="viewer-nav-actions">
          <button type="button" onClick={goPrevious}>
            ← PREV
          </button>

          <button type="button" onClick={goNext}>
            NEXT →
          </button>
        </div>
      </nav>
    </main>
  );
}