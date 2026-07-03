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
  const rightText =
    track.type === "gallery"
      ? `${track.photoCount ?? 0} PHOTOS`
      : track.duration ?? "--:--";

  return (
    <button
      onClick={onClick}
      className={`
        group

        flex
        items-center
        justify-between

        w-full

        rounded-[20px]

        border

        px-6
        py-5

        text-left

        transition-all
        duration-300

        ${
          active
            ? `
              border-accent-blue
              bg-accent-blue
              text-white
              shadow-xl
            `
            : `
              border-transparent
              hover:border-accent-blue/30
              hover:bg-white/50
            `
        }
      `}
    >
      {/* Left */}

      <div className="flex items-center gap-6">
        <span
          className={`
            w-10

            text-lg

            font-semibold

            tracking-[0.25em]

            ${
              active
                ? "text-white"
                : "text-accent-blue"
            }
          `}
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div>
          <h3
            className="
              text-lg

              font-semibold

              tracking-[0.15em]
            "
          >
            {track.title}
          </h3>

          <p
            className={`
              mt-1

              text-xs

              uppercase

              tracking-[0.25em]

              ${
                active
                  ? "text-white/80"
                  : "text-chrome-dark"
              }
            `}
          >
            {track.subtitle}
          </p>
        </div>
      </div>

      {/* Right */}

      <div
        className={`
          flex
          items-center
          gap-5
        `}
      >
        <span
          className={`
            text-xs

            uppercase

            tracking-[0.3em]

            ${
              active
                ? "text-white"
                : "text-chrome-dark"
            }
          `}
        >
          {rightText}
        </span>

        <span
          className={`
            text-lg

            transition-all

            ${
              active
                ? "translate-x-0"
                : "translate-x-2 opacity-0 group-hover:translate-x-0 group-hover:opacity-100"
            }
          `}
        >
          ▶
        </span>
      </div>
    </button>
  );
}