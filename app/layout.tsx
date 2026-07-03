import type { Metadata } from "next";
import {
  Geist,
  Geist_Mono,
  Press_Start_2P,
  VT323,
} from "next/font/google";

import "./globals.css";

import ArchiveBackground from "@/components/background/ArchiveBackground";
import AudioBootstrap from "@/components/audio/AudioBootstrap";
import { SceneProvider } from "@/components/providers/SceneProvider";
import { TransitionProvider } from "@/components/providers/TransitionProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const pressStart = Press_Start_2P({
  variable: "--font-press-start",
  subsets: ["latin"],
  weight: "400",
});

const vt323 = VT323({
  variable: "--font-vt323",
  subsets: ["latin"],
  weight: "400",
});

export const metadata: Metadata = {
  title: "Before We Leave | Memory Archive",
  description: "Graduation multimedia invitation archive.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={[
        geistSans.variable,
        geistMono.variable,
        pressStart.variable,
        vt323.variable,
        "antialiased",
      ].join(" ")}
    >
      <body>
        <SceneProvider>
          <TransitionProvider>
            <AudioBootstrap />

            <ArchiveBackground />

            <div
              className="archive-crt pointer-events-none fixed inset-0 z-[2]"
              aria-hidden="true"
            />

            <div
              className="archive-noise pointer-events-none fixed inset-0 z-[3]"
              aria-hidden="true"
            />

            <main className="relative z-10 min-h-screen w-full">
              {children}
            </main>
          </TransitionProvider>
        </SceneProvider>
      </body>
    </html>
  );
}