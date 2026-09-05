"use client";

import { useState } from "react";

import RSVPModal from "./RSVPModal";

import { useSound } from "@/hooks/useSound";

export default function GraduationInvitationCard() {
  const [isOpen, setIsOpen] = useState(false);

  const sound = useSound();

  function openModal() {
    sound.insert();
    setIsOpen(true);
  }

  function closeModal() {
    sound.eject();
    setIsOpen(false);
  }

  return (
    <>
      <section className="archive-rsvp">
        <div className="rsvp-body">

          <div className="rsvp-copy">

            <span className="rsvp-chip">
              RSVP / GRADUATION CEREMONY
            </span>

            <h2 className="rsvp-title">
              See You on Graduation Day
            </h2>

            <p className="rsvp-text">
              Please let me know if you will be joining the
              ceremony and celebrating this special day together.
            </p>

            <p className="rsvp-note">
              RESPONSE CHANNEL OPEN UNTIL CEREMONY DAY
            </p>

          </div>

          <div className="rsvp-actions">

            <button
              type="button"
              className="rsvp-button"
              onClick={openModal}
            >
              OPEN RSVP
            </button>

            <div className="rsvp-status">
              STATUS: WAITING FOR YOUR RESPONSE
            </div>

          </div>

        </div>
      </section>

      {isOpen && (
        <RSVPModal onClose={closeModal} />
      )}
    </>
  );
}