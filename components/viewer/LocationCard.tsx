"use client";

import { opening } from "@/content/opening";

export default function LocationCard() {
  return (
    <section className="archive-location">
      <div className="module-header">
        DESTINATION
      </div>

      <div className="location-body">
        <div className="location-copy">
          <div className="location-chip">
            LOCATION
          </div>

          <h2 className="location-title">
            {opening.location.name}
          </h2>

          <p className="location-address">
            {opening.location.address}
          </p>

          <p className="location-note">
            Graduation meetup point. Click the mini map to open directions.
          </p>
        </div>

        <div className="location-map-shell">
          <a
            href={opening.location.map}
            target="_blank"
            rel="noreferrer"
            className="location-map-link"
            aria-label="Open map"
          >
            <div className="location-map-canvas">
              <div className="location-map-grid" />

              <div className="location-road road-horizontal" />
              <div className="location-road road-vertical" />
              <div className="location-road road-diagonal" />

              <div className="location-road-name road-name-main">
                CHUA LANG
              </div>

              <div className="location-road-name road-name-side">
                DONG DA
              </div>

              <div className="location-area-label">
                HA NOI
              </div>

              <div className="location-marker">
                <span className="location-marker-ping" />
                <span className="location-marker-dot" />
              </div>

              <div className="location-marker-label">
                FTU
              </div>
            </div>

            <div className="location-map-meta">
              <span>MINI MAP</span>
              <span>LIVE</span>
            </div>

            <div className="location-map-button">
              OPEN GOOGLE MAPS →
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}