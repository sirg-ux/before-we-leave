export const graduation = {
  /* ======================================================
     BASIC
  ====================================================== */

  title: "Graduation Day",

  quote:
    "Today we don't say goodbye to university. We celebrate everything it has given us.",

  invitation:
    "After four unforgettable years, it's finally time to wear the gown, toss our caps into the air, and celebrate the end of one chapter together. Thank you for being part of this journey. I hope we'll create one final memory before we begin the next adventure.",

  host: "gris",

  /* ======================================================
     EVENT
  ====================================================== */

  date: "20 September 2026",

  time: "11:00",

  countdown: "2026-09-20T11:00:00+07:00",

  /* ======================================================
     LOCATION
  ====================================================== */

  location: {
    name: "National Convention Center",

    address:
      "57 Phạm Hùng, Mễ Trì, Nam Từ Liêm, Hà Nội",

    map:
      "https://maps.google.com/?q=National+Convention+Center+Ha+Noi",
  },

  /* ======================================================
     DRESS CODE
  ====================================================== */

  dresscode: [
    {
      name: "Graduation Gown",
      color: "#0F172A",
    },
    {
      name: "White",
      color: "#FFFFFF",
    },
    {
      name: "Black",
      color: "#111111",
    },
    {
      name: "Red",
      color: "#D81B78",
    },
  ],
} as const;