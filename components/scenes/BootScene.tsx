"use client";

import { useEffect, useState } from "react";

import { useScene } from "@/components/providers/SceneProvider";
import { useSound } from "@/hooks/useSound";

const bootLines = [
  "INITIALIZING MEMORY SYSTEM...",
  "MEMORY DISC DETECTED",
  "ARCHIVE READY",
];

export default function BootScene() {
  const { setScene } = useScene();
  const sound = useSound();

  const [step, setStep] = useState(0);

  useEffect(() => {
    sound.boot();
  }, []);

  useEffect(() => {
    const firstStep = window.setTimeout(() => {
      setStep(1);
    }, 700);

    const secondStep = window.setTimeout(() => {
      setStep(2);
    }, 1500);

    const continueToLoading = window.setTimeout(() => {
      setScene("loading");
    }, 2500);

    return () => {
      window.clearTimeout(firstStep);
      window.clearTimeout(secondStep);
      window.clearTimeout(continueToLoading);
    };
  }, [setScene]);

  const progress = step === 0 ? 33 : step === 1 ? 68 : 100;

  return (
    <main className="boot-scene">
      <section className="boot-console">
        <div className="boot-console-bar">
          <div className="boot-console-bar-left">
            <span className="boot-console-orb">◉</span>
            <span>MEMORY-BOOT.EXE</span>
          </div>

          <span>ARC-001</span>
        </div>

        <div className="boot-console-body">
          <div className="boot-brand">
            <span className="boot-kicker">MEMORY ARCHIVE SYSTEM</span>

            <h1>BEFORE WE LEAVE</h1>

            <p>GRADUATION MEMORY DISC / FTU 2026</p>
          </div>

          <div className="boot-terminal">
            {bootLines.slice(0, step + 1).map((line, index) => (
              <p
                className={
                  index === step
                    ? "boot-terminal-line boot-terminal-line-active"
                    : "boot-terminal-line"
                }
                key={line}
              >
                <span>&gt;</span>
                {line}
              </p>
            ))}

            {step === 2 && (
              <p className="boot-terminal-line boot-terminal-ready">
                <span>✦</span>
                READY TO REMEMBER
              </p>
            )}
          </div>

          <div className="boot-progress-area">
            <div className="boot-progress-meta">
              <span>LOADING ARCHIVE</span>
              <span>{progress}%</span>
            </div>

            <div
              className="boot-progress-track"
              aria-label="Boot progress"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              role="progressbar"
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>

        <footer className="boot-console-footer">
          <span>
            <i />
            SYSTEM LINK ACTIVE
          </span>

          <span>PLEASE WAIT...</span>
        </footer>
      </section>
    </main>
  );
}