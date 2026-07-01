"use client";

export default function DiscOuterRing() {
  return (
    <>
      {/* Chrome Rim */}
      <div
        className="
          absolute
          inset-1

          rounded-full

          border
          border-white/70

          shadow-[inset_0_1px_2px_rgba(255,255,255,0.8)]

          pointer-events-none
        "
      />

      {/* Inner Rim */}
      <div
        className="
          absolute
          inset-2

          rounded-full

          border
          border-black/10

          pointer-events-none
        "
      />
    </>
  );
}