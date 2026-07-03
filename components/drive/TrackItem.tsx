"use client";

import type { Track } from "@/content/tracks";

type TrackItemProps = {
  track: Track;
  index: number;
  active: boolean;
  onClick: () => void;
};

export default function TrackItem({
  track,
  index,
  active,
  onClick,
}: TrackItemProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`drive-track-item ${
        active ? "drive-track-item-active" : ""
      }`}
    >
      <div className="drive-track-item-main">
        <span className="drive-track-number">
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="drive-track-copy">
          <h3>{track.title}</h3>
          <p>{track.subtitle}</p>
        </div>
      </div>

      <div className="drive-track-state">
        {active && <span className="drive-track-playing">▶</span>}
      </div>
    </button>
  );
}