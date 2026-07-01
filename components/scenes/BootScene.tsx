"use client";

import { useEffect } from "react";
import { useScene } from "@/components/providers/SceneProvider";

export default function BootScene() {
  const { setScene } = useScene();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScene("loading");
    }, 2200);

    return () => clearTimeout(timer);
  }, [setScene]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-white">
      <h1 className="text-3xl tracking-[0.35em]">
        MEMORY ARCHIVE
      </h1>
    </main>
  );
}