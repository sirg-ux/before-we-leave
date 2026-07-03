"use client";

import { useEffect, useSyncExternalStore } from "react";

import { audioEngine } from "@/lib/audio";

export default function AudioBootstrap() {
  const muted = useSyncExternalStore(
    audioEngine.subscribe,
    audioEngine.getMuted,
    () => true,
  );

  useEffect(() => {
    function startAudio() {
      void audioEngine.unlock();
      void audioEngine.startMusic();

      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
    }

    window.addEventListener("pointerdown", startAudio, {
      once: true,
      passive: true,
    });

    window.addEventListener("keydown", startAudio, {
      once: true,
    });

    return () => {
      window.removeEventListener("pointerdown", startAudio);
      window.removeEventListener("keydown", startAudio);
    };
  }, []);

  function handleToggle() {
    void audioEngine.unlock();

    const nextMuted = audioEngine.toggleMuted();

    if (!nextMuted) {
      void audioEngine.startMusic();
      audioEngine.playSfx("click");
    }
  }

  return (
    <button
      type="button"
      className="audio-toggle"
      onClick={handleToggle}
      aria-label={muted ? "Turn sound on" : "Turn sound off"}
      aria-pressed={!muted}
    >
      <span className={`audio-toggle-dot ${muted ? "" : "is-on"}`} />
      <span>{muted ? "SOUND OFF" : "SOUND ON"}</span>
    </button>
  );
}