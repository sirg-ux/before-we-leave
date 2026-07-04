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

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      if (wheelLocked.current) return;

      wheelLocked.current = true;

      if (event.deltaY > 0) {
        sound.click();

        setSelectedArchive(
          (selectedArchive + 1) % archives.length
        );
      }

      if (event.deltaY < 0) {
        sound.click();

        setSelectedArchive(
          (selectedArchive - 1 + archives.length) %
            archives.length
        );
      }

      setTimeout(() => {
        wheelLocked.current = false;
      }, 220);
    };

    window.addEventListener("wheel", handleWheel, {
      passive: true,
    });

    return () => {
      window.removeEventListener("wheel", handleWheel);
    };
  }, [
    selectedArchive,
    setSelectedArchive,
    sound,
  ]);

  useEffect(() => {
    const handleKeyDown = (
      event: KeyboardEvent
    ) => {
      switch (event.key) {
        case "ArrowRight":
          event.preventDefault();
          sound.click();

          setSelectedArchive(
            (selectedArchive + 1) % archives.length
          );
          break;

        case "ArrowLeft":
          event.preventDefault();
          sound.click();

          setSelectedArchive(
            (selectedArchive - 1 + archives.length) %
              archives.length
          );
          break;

        case "Enter":
          event.preventDefault();
          sound.insert();

          setTimeout(() => {
            setScene("drive");
          }, 120);
          break;
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown
    );

    return () => {
      window.removeEventListener(
        "keydown",
        handleKeyDown
      );
    };
  }, [
    selectedArchive,
    setSelectedArchive,
    setScene,
    sound,
  ]);

  function goPrevious() {
    sound.click();

    setSelectedArchive(
      (selectedArchive - 1 + archives.length) %
        archives.length
    );
  }

  function goNext() {
    sound.click();

    setSelectedArchive(
      (selectedArchive + 1) % archives.length
    );
  }

  function openDisc() {
    sound.insert();

    setTimeout(() => {
      setScene("drive");
    }, 120);
  }

  return (
    <main className="archive-screen">
      <section className="archive-shell">
        <div className="archive-topbar">
          <span>✦ ARCHIVE-SELECT.EXE</span>
          <span>SCROLL TO SWITCH DISC</span>
        </div>

        <div className="archive-main">
          <section className="archive-display-panel">
            <p className="archive-panel-kicker">
              DISC LIBRARY
            </p>

            <p className="archive-panel-title">
              Select a memory disc to continue.
            </p>

            <div className="archive-disc-stage">
              <Disc
                title={activeArchive.code}
                selected
                onClick={openDisc}
              />
            </div>

            <p className="archive-panel-hint archive-blink">
              CLICK DISC TO OPEN
            </p>
          </section>

          <aside className="archive-info-panel">
            <p className="archive-info-label">
              SELECTED MEMORY
            </p>

            <h2 className="archive-info-code">
              {activeArchive.code}
            </h2>

            <h3 className="archive-info-title">
              {activeArchive.title}
            </h3>

            <div className="archive-info-divider" />

            <div className="archive-info-meta">
              <div className="archive-info-row">
                <span>FORMAT</span>
                <strong>MEMORY DISC</strong>
              </div>

              <div className="archive-info-row">
                <span>STATUS</span>
                <strong className="archive-ready">
                  ● READY
                </strong>
              </div>

              <div className="archive-info-row">
                <span>INPUT</span>
                <strong>SCROLL / CLICK</strong>
              </div>
            </div>

            <div className="archive-info-actions">
              <button
                type="button"
                className="archive-action-button archive-action-button-light"
                onClick={goPrevious}
              >
                ← PREVIOUS
              </button>

              <button
                type="button"
                className="archive-action-button archive-action-button-primary"
                onClick={openDisc}
              >
                OPEN DISC
              </button>

              <button
                type="button"
                className="archive-action-button archive-action-button-light"
                onClick={goNext}
              >
                NEXT →
              </button>
            </div>
          </aside>
        </div>

        <footer className="archive-bottombar">
          <div>
            <span className="archive-status-dot" />
            <span>MEMORY LINK ESTABLISHED</span>
          </div>

          <div>
            <span>
              {String(selectedArchive + 1).padStart(
                2,
                "0"
              )}{" "}
              /{" "}
              {String(archives.length).padStart(
                2,
                "0"
              )}
            </span>

            <span>•</span>

            <span>
              SCROLL / ARROW KEYS / ENTER
            </span>
          </div>
        </footer>
      </section>
    </main>
  );
}