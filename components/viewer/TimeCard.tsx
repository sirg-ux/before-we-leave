"use client";

import { opening } from "@/content/opening";

export default function TimeCard() {
  return (
    <section className="archive-module">
      <div className="module-header">TIME</div>

      <div className="time-display">
        <p className="time-clock">{opening.time}</p>

        <span className="time-zone">GMT +07:00 · HANOI</span>
      </div>
    </section>
  );
}