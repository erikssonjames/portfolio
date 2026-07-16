"use client";

import { useGol } from "./gol-context";
import type { GolPatternId } from "./lib/gol";
import { GameOfLifeSettingsPanel } from "./game-of-life-settings";
import { GameOfLifeInfoButton } from "./game-of-life-info-button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import {
  Atom,
  CircleDot,
  Cog,
  Expand,
  Minimize2,
  Pause,
  Play,
  Radio,
  RotateCw,
  Sparkles,
  Target,
  Waves,
  Zap,
} from "lucide-react";

const PATTERN_OPTIONS: Array<{
  id: GolPatternId;
  label: string;
  detail: string;
  icon: typeof Atom;
  accent: string;
}> = [
  { id: "glider", label: "Glider", detail: "a tiny moving ship", icon: Target, accent: "cyan" },
  { id: "lwss", label: "Lightweight ship", detail: "a faster spaceship", icon: Zap, accent: "violet" },
  { id: "gosper-gun", label: "Gosper gun", detail: "launches ships forever", icon: Radio, accent: "amber" },
  { id: "pulsar", label: "Pulsar", detail: "a hypnotic oscillator", icon: Waves, accent: "fuchsia" },
  { id: "acorn", label: "Acorn", detail: "a slow-burn explosion", icon: Sparkles, accent: "emerald" },
];

export function GameOfLifeControlsOverlay() {
  const {
    settings,
    setSettings,
    isPlaying,
    setIsPlaying,
    requestRestart,
    requestRandomize,
    requestPattern,
    isImmersive,
    toggleImmersive,
  } = useGol();

  return (
    <div className={`gol-control-dock ${isImmersive ? "is-focus" : "is-regular"}`}>
      {isImmersive && (
        <div className="gol-dock-brand" aria-hidden="true">
          <Atom className="size-4" />
          <span>FIELD / 01</span>
        </div>
      )}

      <div className="gol-dock-actions">
        <Button
          size="icon-sm"
          onClick={() => setIsPlaying((playing) => !playing)}
          variant="outline"
          className="gol-action-button"
          aria-label={isPlaying ? "Pause simulation" : "Play simulation"}
          title={isPlaying ? "Pause simulation" : "Play simulation"}
        >
          {isPlaying ? <Pause /> : <Play />}
        </Button>

        <Button
          size="icon-sm"
          onClick={requestRestart}
          variant="outline"
          className="gol-action-button"
          aria-label="Restart simulation"
          title="Restart simulation"
        >
          <RotateCw />
        </Button>

        {isImmersive ? (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button className="gol-pattern-button" size="sm" aria-label="Open pattern launcher">
                <Sparkles />
                <span>Patterns</span>
              </Button>
            </DropdownMenuTrigger>

            <DropdownMenuPortal>
              <DropdownMenuContent
                side="top"
                align="start"
                sideOffset={12}
                className="gol-pattern-menu is-focus-menu z-50 w-72 border-0 p-2"
              >
                <DropdownMenuLabel className="px-3 pb-2 pt-2 text-[10px] uppercase tracking-[0.24em] text-white/45">
                  Deploy a living pattern
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="bg-white/10" />
                {PATTERN_OPTIONS.map(({ id, label, detail, icon: Icon, accent }) => (
                  <DropdownMenuItem
                    key={id}
                    onSelect={() => requestPattern(id)}
                    className={`gol-pattern-item gol-pattern-item-${accent}`}
                  >
                    <span className="gol-pattern-icon"><Icon /></span>
                    <span className="min-w-0">
                      <span className="block text-sm font-medium text-white">{label}</span>
                      <span className="block truncate text-[11px] text-white/45">{detail}</span>
                    </span>
                    <CircleDot className="gol-pattern-dot" />
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        ) : (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                size="icon-sm"
                variant="outline"
                className="gol-action-button"
                aria-label="Open simulation settings"
                title="Simulation settings"
              >
                <Cog />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuPortal>
              <DropdownMenuContent
                className="gol-settings-menu is-regular-menu z-50 w-fit border-0 bg-transparent p-0 shadow-none"
                alignOffset={-100}
                sideOffset={15}
              >
                <GameOfLifeSettingsPanel
                  value={settings}
                  onChange={setSettings}
                  onRandomize={requestRandomize}
                  onRestart={requestRestart}
                />
              </DropdownMenuContent>
            </DropdownMenuPortal>
          </DropdownMenu>
        )}

        <Button
          size="icon-sm"
          onClick={toggleImmersive}
          variant="outline"
          className="gol-action-button"
          aria-label={isImmersive ? "Exit Game of Life focus mode" : "Enter Game of Life focus mode"}
          title={isImmersive ? "Exit focus mode (F or Escape)" : "Focus mode (F)"}
        >
          {isImmersive ? <Minimize2 /> : <Expand />}
        </Button>

        {!isImmersive && <GameOfLifeInfoButton />}
      </div>

      <div className="gol-dock-hint">
        <kbd>{isImmersive ? "ESC" : "F"}</kbd> {isImmersive ? "exit" : "focus mode"}
      </div>
    </div>
  );
}
