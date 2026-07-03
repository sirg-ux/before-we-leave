export type GalleryImage = {
  id: number;
  archiveId: number;

  src: string;
  download: string;

  title: string;
};

export const gallery: GalleryImage[] = [
  {
    id: 1,
    archiveId: 0,
    src: "/gallery/pre/01.jpg",
    download: "/gallery/pre/01.jpg",
    title: "Memory 01",
  },

  {
    id: 2,
    archiveId: 0,
    src: "/gallery/pre/02.jpg",
    download: "/gallery/pre/02.jpg",
    title: "Memory 02",
  },

  {
    id: 3,
    archiveId: 0,
    src: "/gallery/pre/03.jpg",
    download: "/gallery/pre/03.jpg",
    title: "Memory 03",
  },
];