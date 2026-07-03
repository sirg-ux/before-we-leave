import { tracks } from "@/content/tracks";

export function getTracksByArchive(archiveId: number) {
  return tracks.filter(
    (track) => track.archiveId === archiveId
  );
}