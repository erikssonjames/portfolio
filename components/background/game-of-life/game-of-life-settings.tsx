"use client"

import * as React from "react"
import {
  Brush,
  Gauge,
  Grid3X3,
  Palette,
  Play,
  RefreshCw,
  Sparkles,
  SunMedium,
  Wand2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { ButtonGroup } from "@/components/ui/button-group"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"

export type GolSettings = {
  backgroundOpacity: number
  cellSize: number
  tickMs: number
  randomFill: number
  pauseWhilePainting: boolean
  brushMaxRadius: number
  brushGrowthMs: number
  brushDensity: number
  showVignette: boolean
  glowStrength: number
  theme: "classic" | "neon" | "mono"
  disableBrush: boolean
}

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
  disableBrush: false,
}

type GameOfLifeSettingsPanelProps = {
  value: GolSettings
  onChange: (next: GolSettings) => void
  onRestart?: () => void
  onRandomize?: () => void
}

type PresetButtonGroupProps<T extends string | number> = {
  icon: React.ComponentType<{ className?: string }>
  label: string
  value: T
  options: Array<{ label: string; value: T }>
  onChange: (next: T) => void
}

type SectionHeaderProps = {
  icon: React.ComponentType<{ className?: string }>
  title: string
}

function SectionHeader({ icon: Icon, title }: SectionHeaderProps) {
  return (
    <div className="flex items-center gap-2 text-sm font-medium text-zinc-100">
      <div className="rounded-xl border border-white/10 bg-white/5 p-2">
        <Icon className="h-4 w-4 text-yellow-200" />
      </div>
      <span>{title}</span>
    </div>
  )
}

function PresetButtonGroup<T extends string | number>({
  icon: Icon,
  label,
  value,
  options,
  onChange,
}: PresetButtonGroupProps<T>) {
  return (
    <div className="grid gap-2">
      <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
        <Icon className="h-3.5 w-3.5 text-zinc-500" />
        <span>{label}</span>
      </div>

      <ButtonGroup className="flex-wrap">
        {options.map((option) => {
          const active = option.value === value

          return (
            <Button
              key={String(option.value)}
              size="sm"
              variant={active ? "secondary" : "outline"}
              className={
                active
                  ? "bg-white text-black hover:bg-white/90"
                  : "border-white/10 bg-white/5 text-white hover:bg-white/10"
              }
              onClick={() => onChange(option.value)}
            >
              {option.label}
            </Button>
          )
        })}
      </ButtonGroup>
    </div>
  )
}

export function GameOfLifeSettingsPanel({
  value,
  onChange,
  onRestart,
  onRandomize,
}: GameOfLifeSettingsPanelProps) {
  const set = React.useCallback(
    (patch: Partial<GolSettings>) => onChange({ ...value, ...patch }),
    [onChange, value]
  )

  return (
    <Card className="w-[26rem] max-w-[92vw] border-white/10 bg-black/85 text-white shadow-xl backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-yellow-200" />
          <span>Life Controls</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="space-y-3 rounded-2xl border border-white/8 bg-white/3 p-4">
          <SectionHeader icon={Play} title="Simulation" />

          <PresetButtonGroup
            icon={Palette}
            label="Theme"
            value={value.theme}
            onChange={(theme) => set({ theme })}
            options={[
              { label: "Classic", value: "classic" },
              { label: "Neon", value: "neon" },
              { label: "Mono", value: "mono" },
            ]}
          />

          <PresetButtonGroup
            icon={Grid3X3}
            label="Grid"
            value={value.cellSize}
            onChange={(cellSize) => set({ cellSize })}
            options={[
              { label: "Tight", value: 18 },
              { label: "Balanced", value: 30 },
              { label: "Chunky", value: 42 },
            ]}
          />

          <PresetButtonGroup
            icon={Gauge}
            label="Speed"
            value={value.tickMs}
            onChange={(tickMs) => set({ tickMs })}
            options={[
              { label: "Slow", value: 420 },
              { label: "Medium", value: 300 },
              { label: "Fast", value: 180 },
            ]}
          />

          <PresetButtonGroup
            icon={Wand2}
            label="Fill"
            value={value.randomFill}
            onChange={(randomFill) => set({ randomFill })}
            options={[
              { label: "Sparse", value: 0.32 },
              { label: "Balanced", value: 0.5 },
              { label: "Dense", value: 0.68 },
            ]}
          />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/8 bg-white/3 p-4">
          <SectionHeader icon={Brush} title="Brush" />

          <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-3 py-2.5">
            <div className="flex items-center gap-2 text-sm text-zinc-200">
              <PauseWhilePaintIcon />
              <span>Pause while painting</span>
            </div>
            <Switch
              checked={value.pauseWhilePainting}
              onCheckedChange={(checked) => set({ pauseWhilePainting: checked })}
            />
          </div>

          <PresetButtonGroup
            icon={Brush}
            label="Size"
            value={value.brushMaxRadius}
            onChange={(brushMaxRadius) => set({ brushMaxRadius })}
            options={[
              { label: "Small", value: 6 },
              { label: "Medium", value: 10 },
              { label: "Large", value: 16 },
            ]}
          />

          <PresetButtonGroup
            icon={Gauge}
            label="Growth"
            value={value.brushGrowthMs}
            onChange={(brushGrowthMs) => set({ brushGrowthMs })}
            options={[
              { label: "Quick", value: 140 },
              { label: "Balanced", value: 250 },
              { label: "Slow", value: 420 },
            ]}
          />

          <PresetButtonGroup
            icon={Wand2}
            label="Density"
            value={value.brushDensity}
            onChange={(brushDensity) => set({ brushDensity })}
            options={[
              { label: "Light", value: 0.32 },
              { label: "Balanced", value: 0.55 },
              { label: "Heavy", value: 0.8 },
            ]}
          />
        </div>

        <div className="space-y-3 rounded-2xl border border-white/8 bg-white/3 p-4">
          <SectionHeader icon={SunMedium} title="Visuals" />

          <div className="grid gap-3">
            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm text-zinc-200">
                <div className="flex items-center gap-2">
                  <SunMedium className="h-4 w-4 text-zinc-500" />
                  <Label className="text-white">Background</Label>
                </div>
                <span className="text-xs text-zinc-400">{value.backgroundOpacity}%</span>
              </div>
              <Slider
                value={[value.backgroundOpacity]}
                onValueChange={(arr) => set({ backgroundOpacity: arr?.[0] ?? value.backgroundOpacity })}
                min={0}
                max={100}
                step={5}
              />
            </div>

            <div className="grid gap-2">
              <div className="flex items-center justify-between text-sm text-zinc-200">
                <div className="flex items-center gap-2">
                  <Sparkles className="h-4 w-4 text-zinc-500" />
                  <Label className="text-white">Glow</Label>
                </div>
                <span className="text-xs text-zinc-400">{value.glowStrength}px</span>
              </div>
              <Slider
                value={[value.glowStrength]}
                onValueChange={(arr) => set({ glowStrength: arr?.[0] ?? value.glowStrength })}
                min={0}
                max={30}
                step={1}
              />
            </div>

            <div className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-3 py-2.5">
              <div className="flex items-center gap-2 text-sm text-zinc-200">
                <Palette className="h-4 w-4 text-zinc-500" />
                <span>Vignette</span>
              </div>
              <Switch checked={value.showVignette} onCheckedChange={(checked) => set({ showVignette: checked })} />
            </div>
          </div>
        </div>

        <Separator className="bg-white/10" />

        <div className="flex gap-2">
          <Button
            variant="secondary"
            className="flex-1 border border-white/10 bg-white/10 text-white hover:bg-white/15"
            onClick={() => onRandomize?.()}
          >
            <Wand2 className="mr-2 h-4 w-4" />
            Randomize
          </Button>
          <Button className="flex-1 bg-white text-black hover:bg-white/90" onClick={() => onRestart?.()}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Restart
          </Button>
        </div>

        <Button
          variant="ghost"
          className="w-full text-white/80 hover:bg-white/10 hover:text-white"
          onClick={() => onChange(DEFAULT_GOL_SETTINGS)}
        >
          Reset
        </Button>
      </CardContent>
    </Card>
  )
}

function PauseWhilePaintIcon() {
  return <div className="h-4 w-4 rounded-sm border border-zinc-600/70 bg-zinc-800/80" aria-hidden="true" />
}
