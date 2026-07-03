export type Track = {
  id: number;
  archiveId: number;

  title: string;
  subtitle: string;

  type: "opening" | "gallery" | "ending";

  duration?: string;
  photoCount?: number;
};

export const tracks: Track[] = [
  {
    id: 0,
    archiveId: 0,

    title: "OPENING",
    subtitle: "Invitation",

    type: "opening",

    duration: "02:15",
  },

  {
    id: 1,
    archiveId: 0,

    title: "MEMORY",
    subtitle: "Pre Graduation",

    type: "gallery",

    photoCount: 18,
  },

  {
    id: 2,
    archiveId: 0,

    title: "ENDING",
    subtitle: "Thank You",

    type: "ending",

    duration: "01:02",
  },
];