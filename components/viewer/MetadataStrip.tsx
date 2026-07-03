"use client";

import { archives } from "@/content/archive";
import { tracks } from "@/content/tracks";
import { useScene } from "@/components/providers/SceneProvider";

export default function MetadataStrip() {
  const { selectedArchive } = useScene();

  const archive = archives[selectedArchive];

  const archiveTracks = tracks.filter(
    (track) => track.archiveId === selectedArchive
  );

  return (
    <section className="archive-system">

      <div className="system-header">
        SYSTEM INFORMATION
      </div>

      <div className="system-grid">

        <Item
          label="DISC ID"
          value={archive.code}
        />

        <Item
          label="TRACK"
          value={`01 / ${String(
            archiveTracks.length
          ).padStart(2, "0")}`}
        />

        <Item
          label="FORMAT"
          value="MEMORY DISC"
        />

        <Item
          label="STATUS"
          value="READY"
          ready
        />

        <Item
          label="VERSION"
          value="2004.2026"
        />

        <Item
          label="CHECKSUM"
          value="8AF2-90D1"
        />

      </div>

    </section>
  );
}

type ItemProps = {
  label: string;
  value: string;
  ready?: boolean;
};

function Item({
  label,
  value,
  ready = false,
}: ItemProps) {
  return (
    <>

      <div className="system-label">

        {label}

      </div>

      <div className="system-value">

        {ready && (
          <span className="system-led" />
        )}

        {value}

      </div>

    </>
  );
}