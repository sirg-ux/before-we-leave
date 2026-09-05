export type Track = {
  id: number;
  archiveId: number;
  title: string;
  subtitle: string;
  type:
    | "opening"
    | "graduation-opening"
    | "gallery"
    | "ending";
  duration?: string;
  photoCount?: number;
};

export const tracks: Track[] = [
  /* ===========================
     DISC 01 — PRE GRADUATION
  =========================== */

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

  /* ===========================
     DISC 02 — GRADUATION DAY
  =========================== */

  {
    id: 3,
    archiveId: 1,
    title: "OPENING",
    subtitle: "Graduation Day",
    type: "graduation-opening",
    duration: "02:15",
  },

  {
    id: 4,
    archiveId: 1,
    title: "MEMORY",
    subtitle: "Graduation",
    type: "gallery",
    photoCount: 0,
  },

  {
    id: 5,
    archiveId: 1,
    title: "ENDING",
    subtitle: "Congratulations",
    type: "ending",
    duration: "01:02",
  },
];