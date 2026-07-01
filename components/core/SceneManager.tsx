"use client";

import { useScene } from "@/components/providers/SceneProvider";

import BootScene from "@/components/scenes/BootScene";
import LoadingScene from "@/components/scenes/LoadingScene";
import ArchiveScene from "@/components/scenes/ArchiveScene";
import DriveScene from "@/components/scenes/DriveScene";
import TrackScene from "@/components/scenes/TrackScene";
import ViewerScene from "@/components/scenes/ViewerScene";

export default function SceneManager() {
  const { scene } = useScene();

  switch (scene) {
    case "boot":
      return <BootScene />;

    case "loading":
      return <LoadingScene />;

    case "archive":
      return <ArchiveScene />;

    case "drive":
      return <DriveScene />;

    case "track":
      return <TrackScene />;

    case "viewer":
      return <ViewerScene />;

    default:
      return null;
  }
}