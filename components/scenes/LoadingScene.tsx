"use client";

import { useEffect } from "react";
import { useScene } from "@/components/providers/SceneProvider";

export default function LoadingScene() {
  const { setScene } = useScene();

  useEffect(() => {
    const timer = setTimeout(() => {
      setScene("archive");
    }, 2800);

    return () => clearTimeout(timer);
  }, [setScene]);

  return (
    <main className="min-h-screen flex items-center justify-center bg-black text-green-400">
      <h1 className="text-2xl tracking-[0.25em]">
        Loading Archive...
      </h1>
    </main>
  );
}