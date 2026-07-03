"use client";

import Disc from "./Disc";
import type { Archive } from "@/content/archive";

type DiscShelfProps = {
  discs: Archive[];
  selectedDisc: number | null;
  onSelectDisc: (index: number) => void;
};

export default function DiscShelf({
  discs,
  selectedDisc,
  onSelectDisc,
}: DiscShelfProps) {
  const active = selectedDisc ?? 0;

  // Đưa archive đang chọn lên đầu stack
  const orderedDiscs = [...discs].sort((a, b) => {
    const offsetA = (a.id - active + discs.length) % discs.length;
    const offsetB = (b.id - active + discs.length) % discs.length;

    return offsetA - offsetB;
  });

  const positions = [
    {
      x: 0,
      y: 0,

      scale: 1,
      rotate: 0,

      opacity: 1,

      brightness: 1,
      saturate: 1,

      shadow: "none",

      zIndex: 30,
    },

    {
      x: 22,
      y: 2,

      scale: 0.965,
      rotate: 1,

      opacity: 0.82,

      brightness: 0.82,
      saturate: 0.78,

      shadow: "inset 0 0 80px rgba(0,0,0,.16)",

      zIndex: 20,
    },

    {
      x: 44,
      y: 4,

      scale: 0.93,
      rotate: 2,

      opacity: 0.65,

      brightness: 0.65,
      saturate: 0.6,

      shadow: "inset 0 0 120px rgba(0,0,0,.24)",

      zIndex: 10,
    },
  ];

  return (
    <section
      className="
        mt-10
        flex
        justify-center
        w-full
      "
    >
      <div
        className="
          relative
          w-[620px]
          h-[420px]
        "
      >
        {orderedDiscs.map((disc, stackIndex) => {
          const pos = positions[Math.min(stackIndex, positions.length - 1)];

          return (
            <div
              key={disc.id}
              className="
                absolute
                left-1/2
                top-1/2

                transition-all
                duration-500
                ease-[cubic-bezier(.22,.61,.36,1)]
              "
              style={{
                transform: `
                  translate(-50%, -50%)
                  translateX(${pos.x}px)
                  translateY(${pos.y}px)
                  rotate(${pos.rotate}deg)
                  scale(${pos.scale})
                `,

                zIndex: pos.zIndex,

                opacity: pos.opacity,

                filter: `
                  brightness(${pos.brightness})
                  saturate(${pos.saturate})
                `,
              }}
            >
              <div
                style={{
                  boxShadow: pos.shadow,
                  borderRadius: "9999px",
                }}
              >
                <Disc
                  title={disc.code}
                  selected={stackIndex === 0}
                  onClick={() => onSelectDisc(disc.id)}
                />
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}