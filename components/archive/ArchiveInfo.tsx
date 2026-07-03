"use client";

import type { Archive } from "@/content/archive";
import { tracks } from "@/content/tracks";

type ArchiveInfoProps = {
  archive: Archive;
};

export default function ArchiveInfo({
  archive,
}: ArchiveInfoProps) {
  const archiveTracks = tracks.filter(
    (track) => track.archiveId === archive.id
  );

  return (
    <section
      key={archive.id}
      className="
        archive-fade

        mt-8

        w-full
        max-w-md

        flex
        flex-col
        items-center

        text-center
      "
    >
      {/* Top Divider */}

      <div
        className="
          mb-6

          h-px
          w-full

          bg-gradient-to-r
          from-transparent
          via-chrome-dark
          to-transparent

          opacity-40
        "
      />

      {/* Archive Code */}

      <p
        className="
          text-xs

          uppercase

          tracking-[0.45em]

          text-accent-blue
        "
      >
        {archive.code}
      </p>

      {/* Title */}

      <h2
        className="
          mt-3

          text-2xl

          font-semibold

          tracking-[0.08em]

          text-foreground
        "
      >
        {archive.title}
      </h2>

      {/* Subtitle */}

      <p
        className="
          mt-2

          text-sm

          uppercase

          tracking-[0.18em]

          text-chrome-dark
        "
      >
        {archive.subtitle}
      </p>

      {/* Track Count */}

      <p
        className="
          mt-5

          text-xs

          uppercase

          tracking-[0.35em]

          text-accent-blue
        "
      >
        {archiveTracks.length} Tracks
      </p>

      {/* Bottom Divider */}

      <div
        className="
          mt-6

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