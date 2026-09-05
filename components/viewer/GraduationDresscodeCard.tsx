"use client";

import { graduation } from "@/content/graduation";

export default function GraduationDresscodeCard() {
  return (
    <section className="archive-dress">
      <div className="module-header">
        DRESS CODE
      </div>

      <div className="dress-layout">

        <div className="palette-grid">
          {graduation.dresscode.map((item) => (
            <Palette
              key={item.name}
              name={item.name}
              color={item.color}
            />
          ))}
        </div>

        <div className="dress-info">

          <h3>Graduation Outfit</h3>

          <p>
            Wear your graduation gown with clothing that
            complements the official ceremony colours.
          </p>

          <ul className="dress-note">
            <li>• Graduation gown required</li>
            <li>• White shirt or blouse recommended</li>
            <li>• Dark trousers / skirt preferred</li>
            <li>• Comfortable shoes for walking & photos</li>
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