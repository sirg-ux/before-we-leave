"use client";

import type { Track } from "@/content/tracks";

import TrackItem from "./TrackItem";

type TrackListProps = {
  tracks: Track[];
  selectedTrack: number;
  onSelectTrack: (index: number) => void;
};

export default function TrackList({
  tracks,
  selectedTrack,
  onSelectTrack,
}: TrackListProps) {
  return (
    <div className="space-y-3">
      {tracks.map((track, index) => (
        <TrackItem
          key={track.id}
          track={track}
          index={index}
          active={selectedTrack === index}
          onClick={() => onSelectTrack(index)}
        />
      ))}
    </div>
  );
}