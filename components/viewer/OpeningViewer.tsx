"use client";

import OpeningHero from "./OpeningHero";
import MetadataStrip from "./MetadataStrip";
import DateCard from "./DateCard";
import TimeCard from "./TimeCard";
import LocationCard from "./LocationCard";
import DresscodeCard from "./DresscodeCard";
import CountdownCard from "./CountdownCard";
import InvitationCard from "./InvitationCard";

export default function OpeningViewer() {
  return (
    <main className="opening-screen">
      <section className="game-shell">
        <div className="game-windowbar">
          <div className="game-windowbar-left">
            <span className="game-window-icon">◉</span>
            <span>BEFORE-WE-LEAVE.EXE</span>
          </div>

          <div className="game-windowbar-right">
            <span>ARC-001</span>
            <span>MEMORY MODE</span>
          </div>
        </div>

        <div className="game-window-body">
          <OpeningHero />

          <MetadataStrip />

          <div className="archive-grid-two">
            <DateCard />
            <TimeCard />
          </div>

          <LocationCard />

          <DresscodeCard />

          <CountdownCard />

          <InvitationCard />
        </div>

        <footer className="game-footer">
          <div className="game-footer-left">
            <span className="game-footer-pulse" />
            <span>MEMORY ARCHIVE READY</span>
          </div>

          <div className="game-footer-right">
            <span>FTU / 2026</span>
            <span>•</span>
            <span>TRACK 01 / 03</span>
          </div>
        </footer>
      </section>
    </main>
  );
}