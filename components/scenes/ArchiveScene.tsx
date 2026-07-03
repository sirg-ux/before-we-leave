"use client";

import { useEffect, useRef } from "react";

import Disc from "@/components/disc/Disc";
import { archives } from "@/content/archive";

import { useScene } from "@/components/providers/SceneProvider";
import { useSound } from "@/hooks/useSound";

export default function ArchiveScene() {
  const {
    selectedArchive,
    setSelectedArchive,
    setScene,
  } = useScene();

  const sound = useSound();
  const wheelLocked = useRef(false);

  const activeArchive = archives[selectedArchive];

  function selectPrevious() {
    sound.click();

    setSelectedArchive(
      (selectedArchive - 1 + archives.length) % archives.length,
    );
  }

  function selectNext() {
    sound.click();

    setSelectedArchive(
      (selectedArchive + 1) % archives.length,
    );
  }

  function openArchive() {
    sound.insert();

    window.setTimeout(() => {
      setScene("drive");
    }, 120);
  }

  useEffect(() => {
    function handleWheel(event: WheelEvent) {
      event.preventDefault();

      if (wheelLocked.current || event.deltaY === 0) {
        return;
      }

      wheelLocked.current = true;

      if (event.deltaY > 0) {
        selectNext();
      } else {
        selectPrevious();
      }

      window.setTimeout(() => {
        wheelLocked.current = false;
      }, 240);
    }

    window.addEventListener("wheel", handleWheel, {
      passive: false,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [selectedArchive]);

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "ArrowRight" || event.key === "ArrowDown") {
        event.preventDefault();
        selectNext();
      }

      if (event.key === "ArrowLeft" || event.key === "ArrowUp") {
        event.preventDefault();
        selectPrevious();
      }

      if (event.key === "Enter") {
        event.preventDefault();
        openArchive();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedArchive]);

  return (
    <main className="archive-scene">
      <section className="archive-scene-shell">
        <header className="archive-scene-topbar">
          <div className="archive-scene-brand">
            <span className="archive-scene-orb">◉</span>

            <div>
              <p>MEMORY ARCHIVE / DISC SELECT</p>
              <h1>MEMORY LIBRARY</h1>
            </div>
          </div>

          <div className="archive-scene-status">
            <span>DISC INDEX</span>

            <strong>
              {String(selectedArchive + 1).padStart(2, "0")} /{" "}
              {String(archives.length).padStart(2, "0")}
            </strong>
          </div>
        </header>

        <div className="archive-scene-bar">
          <div>
            <span>✦</span>
            <span>ARCHIVE-SELECT.EXE</span>
          </div>

          <span>SCROLL TO SWITCH DISC</span>
        </div>

        <div className="archive-scene-content">
          <section className="archive-disc-stage">
            <div className="archive-stage-copy">
              <span>DISC LIBRARY</span>
              <p>Select a memory disc to continue.</p>
            </div>

            <div className="archive-disc-slot">
              <Disc
                title={activeArchive.code}
                selected
                onClick={openArchive}
              />
            </div>

            <p className="archive-open-hint">
              CLICK DISC TO OPEN
            </p>
          </section>

          <aside className="archive-info-panel">
            <span className="archive-info-kicker">
              SELECTED MEMORY
            </span>

            <p className="archive-info-code">
              {activeArchive.code}
            </p>

            <h2>{activeArchive.title}</h2>

            <div className="archive-info-rule" />

            <div className="archive-info-data">
              <div>
                <span>FORMAT</span>
                <strong>MEMORY DISC</strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong className="archive-ready">
                  <i />
                  READY
                </strong>
              </div>

              <div>
                <span>INPUT</span>
                <strong>SCROLL / CLICK</strong>
              </div>
            </div>

            <div className="archive-info-actions">
              <button
                type="button"
                onClick={selectPrevious}
              >
                ← PREVIOUS
              </button>

              <button
                type="button"
                className="archive-open-button"
                onClick={openArchive}
              >
                OPEN DISC
              </button>

              <button
                type="button"
                onClick={selectNext}
              >
                NEXT →
              </button>
            </div>
          </aside>
        </div>

        <footer className="archive-scene-footer">
          <div>
            <span className="archive-scene-pulse" />
            <span>MEMORY LINK ESTABLISHED</span>
          </div>

          <div>
            <span>SCROLL / ARROW KEYS / ENTER</span>
            <span>•</span>
            <span>FTU 2026</span>
          </div>
        </footer>
      </section>
    </main>
  );
}