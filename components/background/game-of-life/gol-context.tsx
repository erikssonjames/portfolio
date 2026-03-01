"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
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
  toggleBrush: () => void,
  localDeaths: number,
  localRebirths: number,
  updateLocalDeaths: (deaths: number) => void,
  updateLocalRebirths: (rebirths: number) => void
};

const GolContext = createContext<GolApi | null>(null);

export function GolProvider({ children }: { children: React.ReactNode }) {
  const [localDeaths, setLocalDeaths] = useState(0);
  const [localRebirths, setLocalRebirths] = useState(0);

  const localDeathsRef = useRef(0);
  const localRebirthsRef = useRef(0);

  useEffect(() => { localDeathsRef.current = localDeaths; }, [localDeaths]);
  useEffect(() => { localRebirthsRef.current = localRebirths; }, [localRebirths]);

  const sentLocalDeaths = useRef(0);     // totals already sent
  const sentLocalRebirths = useRef(0);   // totals already sent

  const [settings, setSettings] = useState(DEFAULT_GOL_SETTINGS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [restartToken, setRestartToken] = useState(0);
  const [randomizeToken, setRandomizeToken] = useState(0);

  const updateLocalDeaths = useCallback((deaths: number) => setLocalDeaths(prev => prev + deaths), [])
  const updateLocalRebirths = useCallback((rebirths: number) => setLocalRebirths(prev => prev + rebirths), [])

  useEffect(() => {
    async function uploadLocalData() {
      const deathsTotal = localDeathsRef.current;
      const rebirthsTotal = localRebirthsRef.current;

      const deathsDelta = deathsTotal - sentLocalDeaths.current;
      const rebirthsDelta = rebirthsTotal - sentLocalRebirths.current;

      if (deathsDelta === 0 && rebirthsDelta === 0) return;

      try {
        const res = await fetch("/api/statistics", {
          method: "PUT",
          body: JSON.stringify({ deaths: deathsDelta, rebirths: rebirthsDelta }),
        });

        if (res.ok) {
          // mark totals as sent (NOT the deltas)
          sentLocalDeaths.current = deathsTotal;
          sentLocalRebirths.current = rebirthsTotal;
        }
      } catch (e) {
        console.error(e);
      }
    }

    const id = setInterval(uploadLocalData, 5000);
    return () => clearInterval(id);
  }, []);

  const value = useMemo<GolApi>(() => ({
    settings,
    setSettings,
    isPlaying,
    setIsPlaying,
    restartToken,
    randomizeToken,
    requestRestart: () => setRestartToken((t) => t + 1),
    requestRandomize: () => setRandomizeToken((t) => t + 1),
    toggleBrush: () => setSettings(prev => ({...prev, disableBrush: !prev.disableBrush})),
    localDeaths,
    localRebirths,
    updateLocalDeaths,
    updateLocalRebirths
  }), [
    settings,
    isPlaying,
    restartToken,
    randomizeToken,
    localDeaths,
    localRebirths,
    updateLocalDeaths,
    updateLocalRebirths
  ]);

  return <GolContext.Provider value={value}>{children}</GolContext.Provider>;
}

export function useGol() {
  const ctx = useContext(GolContext);
  if (!ctx) throw new Error("useGol must be used inside <GolProvider>");
  return ctx;
}