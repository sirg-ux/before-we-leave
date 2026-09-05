"use client";

import GraduationHero from "./GraduationHero";

import GraduationMetadataStrip from "./GraduationMetadataStrip";

import GraduationDateCard from "./GraduationDateCard";

import GraduationTimeCard from "./GraduationTimeCard";

import GraduationLocationCard from "./GraduationLocationCard";

import GraduationDresscodeCard from "./GraduationDresscodeCard";

import GraduationCountdownCard from "./GraduationCountdownCard";

import GraduationInvitationCard from "./GraduationInvitationCard";

export default function GraduationOpeningViewer() {
  return (
    <main className="opening-screen">
      <section className="game-shell">

        <div className="game-windowbar">
          <div className="game-windowbar-left">
            <span className="game-window-icon">◉</span>
            <span>GRADUATION-DAY.EXE</span>
          </div>

          <div className="game-windowbar-right">
            <span>ARC-002</span>
            <span>GRADUATION MODE</span>
          </div>
        </div>

        <div className="game-window-body">
          <GraduationHero />

          <GraduationMetadataStrip />

          <div className="archive-grid-two">
            <GraduationDateCard />
            <GraduationTimeCard />
          </div>

          <GraduationLocationCard />

          <GraduationDresscodeCard />

          <GraduationCountdownCard />

          <GraduationInvitationCard />
        </div>

        <footer className="game-footer">
          <div className="game-footer-left">
            <span className="game-footer-pulse" />
            <span>CEREMONY ARCHIVE READY</span>
          </div>

          <div className="game-footer-right">
            <span>FTU / 2026</span>
            <span>•</span>
            <span>TRACK 02 / 03</span>
          </div>
        </footer>

      </section>
    </main>
  );
}