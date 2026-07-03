"use client";

import { useEffect, useState } from "react";

import { opening } from "@/content/opening";

type Countdown = {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
};

function getCountdown(): Countdown {
  const target = new Date(opening.countdown).getTime();
  const distance = Math.max(target - Date.now(), 0);

  return {
    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
    hours: Math.floor((distance / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((distance / (1000 * 60)) % 60),
    seconds: Math.floor((distance / 1000) % 60),
  };
}

function formatNumber(value: number) {
  return String(value).padStart(2, "0");
}

export default function CountdownCard() {
  const [countdown, setCountdown] = useState<Countdown>(getCountdown);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setCountdown(getCountdown());
    }, 1000);

    return () => window.clearInterval(timer);
  }, []);

  const units = [
    { label: "DAYS", value: countdown.days },
    { label: "HOURS", value: countdown.hours },
    { label: "MINUTES", value: countdown.minutes },
    { label: "SECONDS", value: countdown.seconds },
  ];

  return (
    <section className="countdown-card">
      <header className="countdown-card-header">
        <span className="countdown-kicker">MEMORY TIMER</span>
        <h2>Graduation Countdown</h2>
      </header>

      <div className="countdown-card-body">
        <div className="countdown-units">
          {units.map((unit) => (
            <div className="countdown-unit" key={unit.label}>
              <strong>{formatNumber(unit.value)}</strong>
              <span>{unit.label}</span>
            </div>
          ))}
        </div>

        <div className="countdown-loader">
          <div className="countdown-loader-label">
            <span>ARCHIVE LOADING</span>
            <span>90%</span>
          </div>

          <div
            className="countdown-progress"
            aria-label="Archive loading progress"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={90}
          >
            <span />
          </div>

          <p>Every second brings us one step closer to meeting again.</p>
        </div>
      </div>
    </section>
  );
}