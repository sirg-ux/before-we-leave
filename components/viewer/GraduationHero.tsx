"use client";

import { graduation } from "@/content/graduation";

export default function GraduationHero() {
  return (
    <section className="archive-hero">
      <div className="hero-main">
        <div className="hero-copy">

          <div className="hero-topline">
            <span className="hero-chip">MEMORY DISC / 02</span>
            <span className="hero-version">GRAD-FTU-2026</span>
          </div>

          <h2 className="hero-title">
            {graduation.title}
          </h2>

          <p className="hero-subtitle">
            Graduation Ceremony Archive
          </p>

          <p className="hero-description">
            {graduation.invitation}
          </p>

          <div className="hero-quote">
            <span className="quote-spark">✦</span>

            <blockquote>
              “{graduation.quote}”
            </blockquote>
          </div>

        </div>

        <aside className="hero-side">

          <div className="hero-panel">
            <span className="panel-label">SERIAL</span>
            <span className="panel-value">
              GRAD-FTU-2026
            </span>
          </div>

          <div className="hero-panel">
            <span className="panel-label">FORMAT</span>
            <span className="panel-value">
              CEREMONY DISC
            </span>
          </div>

          <div className="hero-panel">
            <span className="panel-label">STATUS</span>

            <span className="panel-value panel-ready">
              <span className="panel-led" />
              READY
            </span>
          </div>

          <div className="hero-terminal">

            <div className="terminal-topline">
              <span>CEREMONY BOOT</span>
              <span>100%</span>
            </div>

            <p>&gt; loading_graduation_day</p>
            <p>&gt; preparing_gowns</p>
            <p>&gt; checking_guest_list</p>
            <p className="terminal-ok">
              &gt; ready_for_commencement
            </p>

          </div>

        </aside>
      </div>
    </section>
  );
}