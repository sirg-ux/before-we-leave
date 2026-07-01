"use client";

import Disc from "./Disc";

export default function DiscShelf() {
  return (
    <section className="mt-24 w-full max-w-5xl">
      <div className="flex justify-center gap-14">
        <Disc title="ARC-001" />
        <Disc title="ARC-002" />
        <Disc title="ARC-003" />
      </div>

      {/* Shelf */}
      <div
        className="
          mt-8
          h-px
          w-full

          bg-gradient-to-r
          from-transparent
          via-chrome-dark
          to-transparent

          opacity-40
        "
      />
    </section>
  );
}