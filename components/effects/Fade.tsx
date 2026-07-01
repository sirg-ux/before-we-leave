"use client";

import { ReactNode } from "react";

type FadeProps = {
  children: ReactNode;
};

export default function Fade({ children }: FadeProps) {
  return (
    <div
      className="
        animate-in
        fade-in
        duration-700
      "
    >
      {children}
    </div>
  );
}