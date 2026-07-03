"use client";

import { audioEngine } from "@/lib/audio";

export function useSound() {
  return {
    boot: () => audioEngine.playSfx("boot"),
    click: () => audioEngine.playSfx("click"),
    insert: () => audioEngine.playSfx("insert"),
    eject: () => audioEngine.playSfx("eject"),
    hover: () => audioEngine.playSfx("hover"),
  };
}