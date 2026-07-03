"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { Scene } from "@/types/scene";

import { archives } from "@/content/archive";
import { tracks } from "@/content/tracks";

type SceneContextType = {
  /* Scene */
  scene: Scene;
  setScene: (scene: Scene) => void;

  /* Archive */
  selectedArchive: number;
  setSelectedArchive: (id: number) => void;
  nextArchive: () => void;
  previousArchive: () => void;

  /* Track */
  selectedTrack: number;
  setSelectedTrack: (id: number) => void;
  nextTrack: () => void;
  previousTrack: () => void;
};

const SceneContext = createContext<SceneContextType | null>(null);

export function SceneProvider({
  children,
}: {
  children: ReactNode;
}) {
  /* ---------------- Scene ---------------- */

  const [scene, setScene] = useState<Scene>("boot");

  /* ---------------- Archive ---------------- */

  const [selectedArchive, setSelectedArchive] = useState(0);

  /* ---------------- Track ---------------- */

  const [selectedTrack, setSelectedTrack] = useState(0);

  /**
   * Tất cả track thuộc archive hiện tại
   */
  const archiveTracks = useMemo(
    () =>
      tracks.filter(
        (track) => track.archiveId === selectedArchive
      ),
    [selectedArchive]
  );

  /**
   * Khi đổi archive -> quay về track đầu tiên
   */
  const changeArchive = (index: number) => {
    setSelectedArchive(index);
    setSelectedTrack(0);
  };

  const nextArchive = () => {
    changeArchive(
      (selectedArchive + 1) % archives.length
    );
  };

  const previousArchive = () => {
    changeArchive(
      (selectedArchive - 1 + archives.length) %
        archives.length
    );
  };

  const nextTrack = () => {
    setSelectedTrack(
      (prev) => (prev + 1) % archiveTracks.length
    );
  };

  const previousTrack = () => {
    setSelectedTrack(
      (prev) =>
        (prev - 1 + archiveTracks.length) %
        archiveTracks.length
    );
  };

  return (
    <SceneContext.Provider
      value={{
        scene,
        setScene,

        selectedArchive,
        setSelectedArchive: changeArchive,
        nextArchive,
        previousArchive,

        selectedTrack,
        setSelectedTrack,
        nextTrack,
        previousTrack,
      }}
    >
      {children}
    </SceneContext.Provider>
  );
}

export function useScene() {
  const context = useContext(SceneContext);

  if (!context) {
    throw new Error(
      "useScene must be used inside SceneProvider"
    );
  }

  return context;
}