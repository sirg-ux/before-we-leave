"use client";

import DiscReflection from "./DiscReflection";
import DiscHighlight from "./DiscHighlight";
import DiscHolographic from "./DiscHolographic";
import DiscOuterRing from "./DiscOuterRing";
import DiscDataRing from "./DiscDataRing";
import DiscHub from "./DiscHub";
import DiscLabel from "./DiscLabel";

type DiscProps = {
  title?: string;
};

export default function Disc({
  title = "ARC-001",
}: DiscProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div
        className="
          disc-base

          relative
          w-40
          h-40

          rounded-full
          overflow-hidden

          border
          border-chrome-dark

          shadow-xl

          transition-all
          duration-300

          hover:-translate-y-2
          hover:scale-105
        "
      >
        {/* Chrome Outer Ring */}
        <DiscOuterRing />

        {/* Data Ring */}
        <DiscDataRing />

        {/* Reflection */}
        <DiscReflection />

        {/* Holographic */}
        <DiscHolographic />

        {/* Highlight */}
        <DiscHighlight />

        {/* Printed Label */}
        <DiscLabel />

        {/* Hub + Hole */}
        <DiscHub />
      </div>

      {/* Archive ID */}
      <p className="text-xs tracking-[0.3em] uppercase text-chrome-dark">
        {title}
      </p>
    </div>
  );
}