"use client";

export default function DiscHub() {
  return (
    <>
      <div
        className="
          absolute
          left-1/2
          top-1/2

          w-11
          h-11

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-white/20

          border
          border-white/40
        "
      />

      <div
        className="
          absolute
          left-1/2
          top-1/2

          w-7
          h-7

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-background

          border
          border-chrome-dark
        "
      />

      {/* tiny center pin */}
      <div
        className="
          absolute
          left-1/2
          top-1/2

          w-1.5
          h-1.5

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          bg-chrome-dark
        "
      />
    </>
  );
}