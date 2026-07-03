"use client";

import { useEffect, useState } from "react";

import { useScene } from "@/components/providers/SceneProvider";
import { useSound } from "@/hooks/useSound";

const loadingSteps = [
  "MOUNTING VIRTUAL DISC...",
  "READING ARCHIVE METADATA...",
  "PREPARING MEMORY VIEWER...",
];

export default function LoadingScene() {
  const { setScene } = useScene();
  const sound = useSound();

  const [step, setStep] = useState(0);

  useEffect(() => {
    sound.insert();

    const t1 = window.setTimeout(() => setStep(1), 700);
    const t2 = window.setTimeout(() => setStep(2), 1500);
    const t3 = window.setTimeout(() => setScene("archive"), 2600);

    return () => {
      window.clearTimeout(t1);
      window.clearTimeout(t2);
      window.clearTimeout(t3);
    };
  }, [setScene]);

  const progress = step === 0 ? 33 : step === 1 ? 68 : 100;

  return (
    <main className="loading-scene">
      <section className="loading-console">
        <div className="loading-console-bar">
          <div className="loading-console-bar-left">
            <span className="loading-console-orb">◉</span>
            <span>MEMORY-DRIVE.EXE</span>
          </div>

          <span>ARC-001</span>
        </div>

        <div className="loading-console-body">
          <header className="loading-heading">
            <span>MEMORY DRIVE / ARCHIVE ACCESS</span>
            <h1>Loading Archive</h1>
            <p>Please wait while your memory disc is prepared.</p>
          </header>

          <div className="loading-progress-area">
            <div className="loading-progress-meta">
              <span>ARCHIVE LOAD</span>
              <span>{progress}%</span>
            </div>

            <div
              className="loading-progress-track"
              role="progressbar"
              aria-label="Loading archive"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
            >
              <span style={{ width: `${progress}%` }} />
            </div>
          </div>

          <div className="loading-status-list">
            {loadingSteps.map((text, index) => (
              <div
                className={
                  index <= step
                    ? "loading-status-line loading-status-line-active"
                    : "loading-status-line"
                }
                key={text}
              >
                <span className="loading-status-icon">
                  {index < step ? "✓" : index === step ? ">" : "·"}
                </span>

                <p>{text}</p>
              </div>
            ))}
          </div>
        </div>

        <footer className="loading-console-footer">
          <span>
            <i />
            SYSTEM LINK ACTIVE
          </span>

          <span>
            {step === 2 ? "READY_" : "PROCESSING_"}
          </span>
        </footer>
      </section>
    </main>
  );
}