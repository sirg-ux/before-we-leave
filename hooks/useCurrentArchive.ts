"use client";

import { useMemo } from "react";

import { archives } from "@/content/archive";
import { tracks } from "@/content/tracks";

import { useScene } from "@/components/providers/SceneProvider";

export function useCurrentArchive() {
  const {
    selectedArchive,
    selectedTrack,
  } = useScene();

  const archive = archives[selectedArchive];

  const archiveTracks = useMemo(
    () =>
      tracks.filter(
        (track) => track.archiveId === selectedArchive
      ),
    [selectedArchive]
  );

  const currentTrack =
    archiveTracks[selectedTrack] ?? null;

  return {
    archive,
    archiveTracks,
    currentTrack,
  };
}