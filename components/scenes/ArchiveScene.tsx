"use client";

import Disc from "@/components/disc/Disc";

import DiscShelf from "@/components/disc/DiscShelf";

export default function ArchiveScene() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center px-8">

      {/* Title */}
      <header className="text-center">
        <h1 className="text-5xl font-bold tracking-[0.3em] text-foreground">
          MEMORY ARCHIVE
        </h1>

        <p className="mt-4 text-accent-blue tracking-[0.25em] uppercase text-sm">
          Digital Memory Collection
        </p>
      </header>

      {/* Disc Shelf */}
      <DiscShelf />

      {/* Hint */}
      <footer className="mt-16 text-sm tracking-[0.2em] uppercase text-chrome-dark">
        Click a disc to continue
      </footer>

    </main>
  );
}