"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { parseStatisticValue } from "@/lib/large-number";
import { DEFAULT_GOL_SETTINGS } from "./game-of-life-settings";
import type { GolPatternId } from "./lib/gol";

type GolSettings = typeof DEFAULT_GOL_SETTINGS;

type GolApi = {
  settings: GolSettings;
  setSettings: React.Dispatch<React.SetStateAction<GolSettings>>;
  isPlaying: boolean;
  setIsPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  restartToken: number;     // increment to signal restart
  randomizeToken: number;   // increment to signal randomize
  clearToken: number;
  requestRestart: () => void;
  requestRandomize: () => void;
  requestClear: () => void;
  patternId: GolPatternId;
  patternToken: number;
  requestPattern: (patternId: GolPatternId) => void;
  isImmersive: boolean;
  setIsImmersive: React.Dispatch<React.SetStateAction<boolean>>;
  toggleImmersive: () => void;
  localDeaths: bigint,
  localRebirths: bigint,
  updateLocalDeaths: (deaths: number) => void,
  updateLocalRebirths: (rebirths: number) => void
};

const GolContext = createContext<GolApi | null>(null);

export function GolProvider({ children }: { children: React.ReactNode }) {
  const [localDeaths, setLocalDeaths] = useState(BigInt(0));
  const [localRebirths, setLocalRebirths] = useState(BigInt(0));

  const localDeathsRef = useRef(BigInt(0));
  const localRebirthsRef = useRef(BigInt(0));

  useEffect(() => { localDeathsRef.current = localDeaths; }, [localDeaths]);
  useEffect(() => { localRebirthsRef.current = localRebirths; }, [localRebirths]);

  const sentLocalDeaths = useRef(BigInt(0));     // totals already sent
  const sentLocalRebirths = useRef(BigInt(0));   // totals already sent

  const [settings, setSettings] = useState(DEFAULT_GOL_SETTINGS);
  const [isPlaying, setIsPlaying] = useState(true);
  const [restartToken, setRestartToken] = useState(0);
  const [randomizeToken, setRandomizeToken] = useState(0);
  const [clearToken, setClearToken] = useState(0);
  const [patternId, setPatternId] = useState<GolPatternId>("glider");
  const [patternToken, setPatternToken] = useState(0);
  const [isImmersive, setIsImmersive] = useState(false);

  const updateLocalDeaths = useCallback((deaths: number) => {
    setLocalDeaths(prev => prev + parseStatisticValue(deaths));
  }, [])
  const updateLocalRebirths = useCallback((rebirths: number) => {
    setLocalRebirths(prev => prev + parseStatisticValue(rebirths));
  }, [])

  const requestRestart = useCallback(() => setRestartToken((token) => token + 1), []);
  const requestRandomize = useCallback(() => setRandomizeToken((token) => token + 1), []);
  const requestClear = useCallback(() => setClearToken((token) => token + 1), []);
  const requestPattern = useCallback((nextPattern: GolPatternId) => {
    setPatternId(nextPattern);
    setPatternToken((token) => token + 1);
    setIsPlaying(true);
  }, []);
  const toggleImmersive = useCallback(() => setIsImmersive((value) => !value), []);

  useEffect(() => {
    async function uploadLocalData() {
      const deathsTotal = localDeathsRef.current;
      const rebirthsTotal = localRebirthsRef.current;

      const deathsDelta = deathsTotal - sentLocalDeaths.current;
      const rebirthsDelta = rebirthsTotal - sentLocalRebirths.current;

      if (deathsDelta === BigInt(0) && rebirthsDelta === BigInt(0)) return;

      try {
        const res = await fetch("/api/statistics", {
          method: "PUT",
          body: JSON.stringify({ deaths: deathsDelta.toString(), rebirths: rebirthsDelta.toString() }),
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
    clearToken,
    requestRestart,
    requestRandomize,
    requestClear,
    patternId,
    patternToken,
    requestPattern,
    isImmersive,
    setIsImmersive,
    toggleImmersive,
    localDeaths,
    localRebirths,
    updateLocalDeaths,
    updateLocalRebirths
  }), [
    settings,
    isPlaying,
    restartToken,
    randomizeToken,
    clearToken,
    requestRestart,
    requestRandomize,
    requestClear,
    patternId,
    patternToken,
    requestPattern,
    isImmersive,
    toggleImmersive,
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
