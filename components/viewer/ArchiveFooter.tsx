"use client";

import { useScene } from "@/components/providers/SceneProvider";

export default function ArchiveFooter() {
  const { setScene } = useScene();

  return (
    <footer
      className="
        flex
        justify-between
        items-center

        pt-6

        text-xs
        uppercase
        tracking-[0.35em]

        text-chrome-dark
      "
    >
      <button
        onClick={() => setScene("archive")}
        className="hover:text-accent-blue transition-colors"
      >
        ← Archive
      </button>

      <span>Press Enter to continue</span>
    </footer>
  );
}