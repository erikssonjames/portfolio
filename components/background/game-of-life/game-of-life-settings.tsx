"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export type GolSettings = {
  backgroundOpacity: number;

  cellSize: number; // px
  tickMs: number; // ms per step
  randomFill: number; // 0..1 used on restart/randomize

  // Interaction / visuals (optional but useful)
  pauseWhilePainting: boolean;
  brushMaxRadius: number; // in cells
  brushGrowthMs: number; // ms per +1 radius while holding
  brushDensity: number; // 0..1 (base density for painting)

  showVignette: boolean;
  glowStrength: number; // 0..30-ish
  theme: "classic" | "neon" | "mono";

  disableBrush: boolean;
};

export const DEFAULT_GOL_SETTINGS: GolSettings = {
  backgroundOpacity: 25,

  cellSize: 30,
  tickMs: 300,
  randomFill: 0.5,

  pauseWhilePainting: false,
  brushMaxRadius: 10,
  brushGrowthMs: 250,
  brushDensity: 0.55,

  showVignette: true,
  glowStrength: 10,
  theme: "classic",

  disableBrush: false
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

type GameOfLifeSettingsPanelProps = {
  value: GolSettings;
  onChange: (next: GolSettings) => void;

  // Optional convenience callbacks (hook these into your parent)
  onRestart?: () => void;
  onRandomize?: () => void;
};

export function GameOfLifeSettingsPanel({
  value,
  onChange,
  onRestart,
  onRandomize,
}: GameOfLifeSettingsPanelProps) {
  const set = React.useCallback(
    (patch: Partial<GolSettings>) => onChange({ ...value, ...patch }),
    [onChange, value]
  );

  // Slider returns number[]
  const setSlider =
    (key: keyof GolSettings, { min, max, step }: { min: number; max: number; step?: number }) =>
    (arr: number[]) => {
      const v = arr?.[0] ?? min;
      const next = clamp(step ? Math.round(v / step) * step : v, min, max);
      set({ [key]: next } as Partial<GolSettings>);
    };

  return (
    <Card className="w-90 max-w-[92vw] border-white/10 bg-black/80 text-white backdrop-blur shadow-xl">
      <CardHeader className="pb-3">
        <CardTitle className="text-base">Game of Life Settings</CardTitle>
        <CardDescription className="text-white/70">
          Tweak simulation + interaction. Changes apply immediately.
        </CardDescription>
      </CardHeader>

      <CardContent className="space-y-5">
        {/* Core simulation */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Cell size</Label>
              <div className="text-xs text-white/60">{value.cellSize}px</div>
            </div>
            <div className="w-48">
              <Slider
                value={[value.cellSize]}
                onValueChange={setSlider("cellSize", { min: 8, max: 60, step: 1 })}
                min={8}
                max={60}
                step={1}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Speed</Label>
              <div className="text-xs text-white/60">
                {value.tickMs}ms / tick{" "}
                <span className="text-white/40">
                  (≈ {Math.round((1000 / value.tickMs) * 10) / 10} tps)
                </span>
              </div>
            </div>
            <div className="w-48">
              <Slider
                value={[value.tickMs]}
                onValueChange={setSlider("tickMs", { min: 30, max: 600, step: 10 })}
                min={30}
                max={600}
                step={10}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Random fill</Label>
              <div className="text-xs text-white/60">{Math.round(value.randomFill * 100)}%</div>
            </div>
            <div className="w-48">
              <Slider
                value={[Math.round(value.randomFill * 100)]}
                onValueChange={(arr) => set({ randomFill: clamp((arr?.[0] ?? 50) / 100, 0.05, 0.95) })}
                min={5}
                max={95}
                step={1}
              />
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Interaction */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Pause while painting</Label>
              <div className="text-xs text-white/60">Stops simulation when pointer is held down.</div>
            </div>
            <Switch
              checked={value.pauseWhilePainting}
              onCheckedChange={(checked) => set({ pauseWhilePainting: checked })}
            />
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Brush max radius</Label>
              <div className="text-xs text-white/60">{value.brushMaxRadius} cells</div>
            </div>
            <div className="w-48">
              <Slider
                value={[value.brushMaxRadius]}
                onValueChange={setSlider("brushMaxRadius", { min: 2, max: 24, step: 1 })}
                min={2}
                max={24}
                step={1}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Brush growth</Label>
              <div className="text-xs text-white/60">{value.brushGrowthMs}ms per +1 radius</div>
            </div>
            <div className="w-48">
              <Slider
                value={[value.brushGrowthMs]}
                onValueChange={setSlider("brushGrowthMs", { min: 80, max: 600, step: 10 })}
                min={80}
                max={600}
                step={10}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Brush density</Label>
              <div className="text-xs text-white/60">{Math.round(value.brushDensity * 100)}%</div>
            </div>
            <div className="w-48">
              <Slider
                value={[Math.round(value.brushDensity * 100)]}
                onValueChange={(arr) =>
                  set({ brushDensity: clamp((arr?.[0] ?? 55) / 100, 0.1, 0.95) })
                }
                min={10}
                max={95}
                step={1}
              />
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Visuals */}
        <div className="space-y-4">
          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Theme</Label>
              <div className="text-xs text-white/60">Affects colors (if you wire it up).</div>
            </div>
            <Select value={value.theme} onValueChange={(v) => set({ theme: v as GolSettings["theme"] })}>
              <SelectTrigger className="w-40 bg-white/5 border-white/10 text-white">
                <SelectValue placeholder="Select theme" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="classic">Classic</SelectItem>
                <SelectItem value="neon">Neon</SelectItem>
                <SelectItem value="mono">Mono</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Background Opacity</Label>
              <div className="text-xs text-white/60">{value.backgroundOpacity}% opacity</div>
            </div>
            <div className="w-48">
              <Slider
                value={[value.backgroundOpacity]}
                onValueChange={setSlider("backgroundOpacity", { min: 0, max: 100, step: 5 })}
                min={0}
                max={100}
                step={5}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Glow strength</Label>
              <div className="text-xs text-white/60">{value.glowStrength}px shadowBlur</div>
            </div>
            <div className="w-48">
              <Slider
                value={[value.glowStrength]}
                onValueChange={setSlider("glowStrength", { min: 0, max: 30, step: 1 })}
                min={0}
                max={30}
                step={1}
              />
            </div>
          </div>

          <div className="flex items-center justify-between gap-3">
            <div className="space-y-1">
              <Label className="text-white">Vignette</Label>
              <div className="text-xs text-white/60">Darkens edges for depth.</div>
            </div>
            <Switch checked={value.showVignette} onCheckedChange={(c) => set({ showVignette: c })} />
          </div>
        </div>

        <Separator className="bg-white/10" />

        {/* Actions */}
        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 bg-white/10 text-white hover:bg-white/15 border border-white/10"
            onClick={() => onRandomize?.()}
          >
            Randomize
          </Button>
          <Button
            className="flex-1 bg-white text-black hover:bg-white/90"
            onClick={() => onRestart?.()}
          >
            Restart
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full text-white/80 hover:text-white hover:bg-white/10"
          onClick={() => onChange(DEFAULT_GOL_SETTINGS)}
        >
          Reset to defaults
        </Button>
      </CardContent>
    </Card>
  );
}