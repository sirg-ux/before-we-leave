"use client";

export default function ArchiveBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">

      {/* Base */}

      <div
        className="
          absolute
          inset-0

          bg-background
        "
      />

      {/* Blue glow */}

      <div
        className="
          absolute

          left-[12%]
          top-[18%]

          h-[540px]
          w-[540px]

          rounded-full

          bg-accent-blue/10

          blur-[140px]

          animate-[floatOne_18s_ease-in-out_infinite]
        "
      />

      {/* Pink glow */}

      <div
        className="
          absolute

          right-[10%]
          bottom-[8%]

          h-[460px]
          w-[460px]

          rounded-full

          bg-accent-pink/8

          blur-[120px]

          animate-[floatTwo_22s_ease-in-out_infinite]
        "
      />

      {/* White light */}

      <div
        className="
          absolute

          left-1/2
          top-1/2

          h-[700px]
          w-[700px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/20

          blur-[180px]
        "
      />

      {/* Noise */}

      <div className="archive-noise absolute inset-0 opacity-[0.04]" />

    </div>
  );
}