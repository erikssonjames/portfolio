"use client";

import React, { createContext, useContext, useMemo, useState } from "react";
import { DEFAULT_GOL_SETTINGS } from "./game-of-life-settings";

type GolSettings = typeof DEFAULT_GOL_SETTINGS;

type GolApi = {
  settings: GolSettings;
  setSettings: React.Dispatch<React.SetStateAction<GolSettings>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  restartToken: number;     // increment to signal restart
  randomizeToken: number;   // increment to signal randomize
  requestRestart: () => void;
  requestRandomize: () => void;
  toggleBrush: () => void
};

const GolContext = createContext<GolApi | null>(null);

export function GolProvider({ children }: { children: React.ReactNode }) {
  const [settings, setSettings] = useState(DEFAULT_GOL_SETTINGS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [restartToken, setRestartToken] = useState(0);
  const [randomizeToken, setRandomizeToken] = useState(0);

  const value = useMemo<GolApi>(() => ({
    settings,
    setSettings,
    isPlaying,
    setIsPlaying,
    restartToken,
    randomizeToken,
    requestRestart: () => setRestartToken((t) => t + 1),
    requestRandomize: () => setRandomizeToken((t) => t + 1),
    toggleBrush: () => setSettings(prev => ({...prev, disableBrush: !prev.disableBrush}))
  }), [settings, isPlaying, restartToken, randomizeToken]);

  return <GolContext.Provider value={value}>{children}</GolContext.Provider>;
}

export function useGol() {
  const ctx = useContext(GolContext);
  if (!ctx) throw new Error("useGol must be used inside <GolProvider>");
  return ctx;
}