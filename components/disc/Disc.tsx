"use client";

import { useSound } from "@/hooks/useSound";

type DiscProps = {
  title?: string;
  selected?: boolean;
  onClick?: () => void;
};

export default function Disc({
  title = "ARC-001",
  selected = false,
  onClick,
}: DiscProps) {
  const sound = useSound();

  return (
    <div className="memory-disc-wrap">
      <button
        type="button"
        aria-label={`Open ${title}`}
        onClick={() => {
          sound.click();
          onClick?.();
        }}
        className={`memory-disc-button ${
          selected ? "memory-disc-button-active" : ""
        }`}
      >
        <div className="memory-disc">
          <div className="memory-disc-outline" />
          <div className="memory-disc-inner-ring" />

          <div className="memory-disc-hub">
            <div className="memory-disc-hub-inner" />
          </div>
        </div>
      </button>
    </div>
  );
}