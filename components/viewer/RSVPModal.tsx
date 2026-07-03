"use client";

import { FormEvent, useEffect, useState } from "react";

import { useSound } from "@/hooks/useSound";

type RSVPModalProps = {
  onClose: () => void;
};

export default function RSVPModal({ onClose }: RSVPModalProps) {
  const sound = useSound();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");

  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        sound.eject();
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose, sound]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim() || !email.trim()) {
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      sound.insert();

      const response = await fetch("/api/rsvp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          email: email.trim(),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit RSVP");
      }

      setStatus("success");
      sound.click();
    } catch {
      setStatus("error");
    }
  }

  return (
    <div
      className="rsvp-modal-backdrop"
      role="presentation"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) {
          sound.eject();
          onClose();
        }
      }}
    >
      <section
        className="rsvp-modal"
        role="dialog"
        aria-modal="true"
        aria-labelledby="rsvp-modal-title"
      >
        <header className="rsvp-modal-bar">
          <div className="rsvp-modal-bar-left">
            <span className="rsvp-modal-orb">◉</span>
            <span>RSVP-CONSOLE.EXE</span>
          </div>

          <button
            type="button"
            className="rsvp-modal-close"
            onClick={() => {
              sound.eject();
              onClose();
            }}
            aria-label="Close RSVP form"
          >
            ×
          </button>
        </header>

        {status === "success" ? (
          <div className="rsvp-success">
            <div className="rsvp-success-icon">✓</div>

            <p className="rsvp-success-kicker">
              RESPONSE SAVED
            </p>

            <h2 id="rsvp-modal-title">
              You&apos;re On The List
            </h2>

            <p className="rsvp-success-copy">
              Your memory slot has been saved. See you at
              Foreign Trade University.
            </p>

            <div className="rsvp-success-terminal">
              <span>› RSVP_RECORD_CREATED</span>
              <span>› STATUS: CONFIRMED</span>
              <span>› ARCHIVE_LINK: READY</span>
            </div>

            <button
              type="button"
              className="rsvp-success-close"
              onClick={() => {
                sound.eject();
                onClose();
              }}
            >
              CLOSE CONSOLE
            </button>
          </div>
        ) : (
          <form
            className="rsvp-modal-body"
            onSubmit={handleSubmit}
          >
            <div className="rsvp-modal-heading">
              <p>MEMORY ARCHIVE / RSVP</p>

              <h2 id="rsvp-modal-title">
                Confirm Your
                <br />
                Attendance
              </h2>

              <span>
                Reserve your place in the graduation archive.
              </span>
            </div>

            <div className="rsvp-console-status">
              <div>
                <span>EVENT</span>
                <strong>FTU GRADUATION 2026</strong>
              </div>

              <div>
                <span>CHANNEL</span>
                <strong>RSVP LINK OPEN</strong>
              </div>

              <div>
                <span>STATUS</span>
                <strong className="rsvp-status-ready">
                  <i />
                  READY
                </strong>
              </div>
            </div>

            <div className="rsvp-fields">
              <label>
                <span>YOUR NAME</span>
                <input
                  value={name}
                  onChange={(event) => {
                    setName(event.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter name..."
                  autoComplete="name"
                />
              </label>

              <label>
                <span>EMAIL ADDRESS</span>
                <input
                  type="email"
                  value={email}
                  onChange={(event) => {
                    setEmail(event.target.value);
                    if (status === "error") setStatus("idle");
                  }}
                  placeholder="Enter email..."
                  autoComplete="email"
                />
              </label>
            </div>

            {status === "error" && (
              <p className="rsvp-error">
                Please enter a valid name and email address.
              </p>
            )}

            <footer className="rsvp-modal-actions">
              <button
                type="button"
                className="rsvp-modal-cancel"
                onClick={() => {
                  sound.eject();
                  onClose();
                }}
              >
                CANCEL
              </button>

              <button
                type="submit"
                className="rsvp-modal-submit"
                disabled={status === "loading"}
              >
                {status === "loading"
                  ? "SAVING..."
                  : "CONFIRM RSVP"}
              </button>
            </footer>
          </form>
        )}
      </section>
    </div>
  );
}