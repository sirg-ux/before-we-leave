"use client";

import { opening } from "@/content/opening";

export default function DateCard() {
  const date = new Date(opening.date);

  const day = String(
    date.getDate()
  ).padStart(2, "0");

  const month = date
    .toLocaleString("en", {
      month: "short",
    })
    .toUpperCase();

  const year = date.getFullYear();

  return (
    <section className="archive-module">

      <div className="module-header">

        DATE

      </div>

      <div className="date-display">

        <span className="date-day">
          {day}
        </span>

        <span className="date-month">
          {month}
        </span>

        <span className="date-year">
          {year}
        </span>

      </div>

    </section>
  );
}