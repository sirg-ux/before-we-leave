"use client";

import { useEffect, useState } from "react";

const endingText = `Thank you for being part
of these unforgettable years.

Every conversation,
every lecture,
every deadline,
every little moment
became another memory.

I hope this archive
will become one more.

See you on Graduation Day. ♡`;

export default function EndingViewer() {
  const [display, setDisplay] = useState("");

  useEffect(() => {
    let index = 0;

    const timer = window.setInterval(() => {
      index += 1;
      setDisplay(endingText.slice(0, index));

      if (index >= endingText.length) {
        window.clearInterval(timer);
      }
    }, 18);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  return (
    <main className="ending-viewer">
      <section className="ending-shell">
        <div className="ending-windowbar">
          <div>
            <span className="ending-window-orb">◉</span>
            <span>MEMORY-END.EXE</span>
          </div>

          <span>TRACK 03 / 03</span>
        </div>

        <div className="ending-body">
          <header className="ending-header">
            <span>FINAL MEMORY ENTRY</span>

            <h1>THANK YOU</h1>

            <p>
              Graduation Archive / Before We Leave
            </p>
          </header>

          <section className="ending-message-panel">
            <div className="ending-message-bar">
              <span>ARCHIVE MESSAGE.LOG</span>

              <span className="ending-message-status">
                <i />
                PLAYING
              </span>
            </div>

            <pre>
              {display}
              <span className="ending-cursor">_</span>
            </pre>
          </section>

          <div className="ending-signoff">
            <span>✦</span>

            <p>
              Thank you for being one of the memories worth
              keeping.
            </p>
          </div>
        </div>

        <footer className="ending-footer">
          <div>
            <span className="ending-pulse" />
            <span>MEMORY ARCHIVE CLOSED</span>
          </div>

          <div>
            <span>FTU 2026</span>
            <span>•</span>
            <span>SEE YOU ON GRADUATION DAY</span>
          </div>
        </footer>
      </section>
    </main>
  );
}