"use client";

import { opening } from "@/content/opening";

export default function OpeningHero() {
  return (
    <section className="archive-hero">
      <div className="hero-main">
        <div className="hero-copy">
          <div className="hero-topline">
            <span className="hero-chip">MEMORY DISC / 01</span>
            <span className="hero-version">BWL-FTU-2026</span>
          </div>

          <h2 className="hero-title">{opening.title}</h2>

          <p className="hero-subtitle">
            Graduation Multimedia Archive
          </p>

          <p className="hero-description">
            {opening.invitation}
          </p>

          <div className="hero-quote">
            <span className="quote-spark">✦</span>

            <blockquote>
              “{opening.quote}”
            </blockquote>
          </div>
        </div>

        <aside className="hero-side">
          <div className="hero-panel">
            <span className="panel-label">SERIAL</span>
            <span className="panel-value">BWL-FTU-2026</span>
          </div>

          <div className="hero-panel">
            <span className="panel-label">FORMAT</span>
            <span className="panel-value">MEMORY DISC</span>
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
              <span>ARCHIVE BOOT</span>
              <span>100%</span>
            </div>

            <p>&gt; loading_memory_disc</p>
            <p>&gt; syncing_graduation_data</p>
            <p>&gt; locating_favorite_people</p>
            <p className="terminal-ok">&gt; ready_to_remember</p>
          </div>
        </aside>
      </div>
    </section>
  );
}