"use client";

export default function DiscDataRing() {
  return (
    <>
      <div
        className="
          absolute

          left-1/2
          top-1/2

          w-[118px]
          h-[118px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-white/25
        "
      />

      <div
        className="
          absolute

          left-1/2
          top-1/2

          w-[108px]
          h-[108px]

          -translate-x-1/2
          -translate-y-1/2

          rounded-full

          border
          border-black/10
        "
      />
    </>
  );
}