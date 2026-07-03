"use client";

import { opening } from "@/content/opening";

export default function DresscodeCard() {
  return (
    <section className="archive-dress">

      <div className="module-header">
        COLOR PALETTE
      </div>

      <div className="dress-layout">

        <div className="palette-grid">

          {opening.dresscode.map((item) => (
            <Palette
              key={item.name}
              name={item.name}
              color={item.color}
            />
          ))}

        </div>

        <div className="dress-info">

          <h3>
            Preferred Attire
          </h3>

          <p>
            Please choose an outfit inspired by
            the palette shown here.
          </p>

          <ul className="dress-note">

            <li>• Formal / Semi-formal</li>

            <li>• Soft neutral colours preferred</li>

            <li>• Avoid large graphic prints</li>

          </ul>

        </div>

      </div>

    </section>
  );
}

type PaletteProps = {
  name: string;
  color: string;
};

function Palette({
  name,
  color,
}: PaletteProps) {
  return (
    <div className="palette-item">

      <div
        className="palette-color"
        style={{
          backgroundColor: color,
        }}
      />

      <div className="palette-text">

        <span className="palette-name">
          {name}
        </span>

        <span className="palette-code">
          {color}
        </span>

      </div>

    </div>
  );
}