"use client"

import * as React from "react"
import {
  Palette,
  Play,
  RefreshCw,
  Sparkles,
  SunMedium,
  Wand2,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"

export type GolSettings = {
  backgroundOpacity: number
  cellSize: number
  tickMs: number
  randomFill: number
  showVignette: boolean
  glowStrength: number
  theme: "classic" | "neon" | "mono"
}

export const DEFAULT_GOL_SETTINGS: GolSettings = {
  backgroundOpacity: 85,
  cellSize: 10,
  tickMs: 180,
  randomFill: 0.5,
  showVignette: true,
  glowStrength: 10,
  theme: "classic",
}

type GameOfLifeSettingsPanelProps = {
  value: GolSettings
  onChange: (next: GolSettings) => void
  onRestart?: () => void
  onRandomize?: () => void
}

type SectionCardProps = {
  icon: React.ComponentType<{ className?: string }>
  title: string
  children: React.ReactNode
  trailing?: React.ReactNode
}

type MiniFieldProps = {
  label: string
  children: React.ReactNode
}

type SegmentedOption<T extends string | number> = {
  label: string
  value: T
}

type SegmentedControlProps<T extends string | number> = {
  value: T
  options: SegmentedOption<T>[]
  onChange: (next: T) => void
}

function SectionCard({ icon: Icon, title, children, trailing }: SectionCardProps) {
  return (
    <div className="space-y-3 rounded-2xl border border-white/8 bg-white/3 p-4">
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm font-medium text-zinc-100">
          <div className="rounded-xl border border-white/10 bg-white/5 p-2">
            <Icon className="h-4 w-4 text-yellow-200" />
          </div>
          <span>{title}</span>
        </div>

        {trailing}
      </div>

      {children}
    </div>
  )
}

function MiniField({ label, children }: MiniFieldProps) {
  return (
    <div className="rounded-xl p-2.5">
      <div className="mb-2 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-400">
        {label}
      </div>
      {children}
    </div>
  )
}

function SegmentedControl<T extends string | number>({
  value,
  options,
  onChange,
}: SegmentedControlProps<T>) {
  return (
    <ToggleGroup
      type="single"
      value={String(value)}
      onValueChange={(next) => {
        if (!next) return
        const found = options.find((option) => String(option.value) === next)
        if (found) onChange(found.value)
      }}
      className="w-full justify-start gap-1"
    >
      {options.map((option) => (
        <ToggleGroupItem
          key={String(option.value)}
          value={String(option.value)}
          aria-label={option.label}
          className="h-8 min-w-0 flex-1 rounded-lg border border-white/10 bg-white/5 px-2 text-xs text-zinc-200 hover:bg-white/10 data-[state=on]:bg-white data-[state=on]:text-black"
        >
          {option.label}
        </ToggleGroupItem>
      ))}
    </ToggleGroup>
  )
}

function SliderField({
  icon: Icon,
  label,
  valueLabel,
  children,
  trailing,
}: {
  icon: React.ComponentType<{ className?: string }>
  label: string
  valueLabel: string
  children: React.ReactNode
  trailing?: React.ReactNode
}) {
  return (
    <div className="rounded-xl border border-white/8 bg-black/20 p-3">
      <div className="mb-2 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-sm text-zinc-200">
          <Icon className="h-4 w-4 text-zinc-500" />
          <Label className="text-white">{label}</Label>
        </div>

        <div className="flex items-center gap-3">
          {trailing}
          <span className="text-xs text-zinc-400">{valueLabel}</span>
        </div>
      </div>

      {children}
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
    <Card className="w-104 max-w-[92vw] border-white/10 bg-black/85 text-white shadow-xl backdrop-blur">
      <CardHeader className="pb-3">
        <CardTitle className="flex items-center gap-2 text-base">
          <Sparkles className="h-4 w-4 text-yellow-200" />
          <span>Life Controls</span>
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        <SectionCard icon={Play} title="Simulation">
          <div className="grid grid-cols-2 gap-2">
            <MiniField label="Theme">
              <SegmentedControl
                value={value.theme}
                onChange={(theme) => set({ theme })}
                options={[
                  { label: "Classic", value: "classic" },
                  { label: "Neon", value: "neon" },
                  { label: "Mono", value: "mono" },
                ]}
              />
            </MiniField>

            <MiniField label="Speed">
              <SegmentedControl
                value={value.tickMs}
                onChange={(tickMs) => set({ tickMs })}
                options={[
                  { label: "Slow", value: 360 },
                  { label: "Med", value: 180 },
                  { label: "Fast", value: 90 },
                ]}
              />
            </MiniField>

            <MiniField label="Grid">
              <SegmentedControl
                value={value.cellSize}
                onChange={(cellSize) => set({ cellSize })}
                options={[
                  { label: "8", value: 8 },
                  { label: "10", value: 10 },
                  { label: "14", value: 14 },
                ]}
              />
            </MiniField>

            <MiniField label="Fill">
              <SegmentedControl
                value={value.randomFill}
                onChange={(randomFill) => set({ randomFill })}
                options={[
                  { label: "Low", value: 0.32 },
                  { label: "Mid", value: 0.5 },
                  { label: "High", value: 0.68 },
                ]}
              />
            </MiniField>
          </div>
        </SectionCard>

        <SectionCard
          icon={SunMedium}
          title="Visuals"
          trailing={
            <div className="flex items-center gap-2 text-sm text-zinc-300">
              <Palette className="h-4 w-4 text-zinc-500" />
              <span className="text-xs text-zinc-400">Vignette</span>
              <Switch
                checked={value.showVignette}
                onCheckedChange={(showVignette) => set({ showVignette })}
              />
            </div>
          }
        >
          <div className="grid gap-2">
            <SliderField
              icon={SunMedium}
              label="Background"
              valueLabel={`${value.backgroundOpacity}%`}
            >
              <Slider
                value={[value.backgroundOpacity]}
                onValueChange={(arr) =>
                  set({ backgroundOpacity: arr?.[0] ?? value.backgroundOpacity })
                }
                min={0}
                max={100}
                step={5}
              />
            </SliderField>

            <SliderField
              icon={Sparkles}
              label="Glow"
              valueLabel={`${value.glowStrength}px`}
            >
              <Slider
                value={[value.glowStrength]}
                onValueChange={(arr) => set({ glowStrength: arr?.[0] ?? value.glowStrength })}
                min={0}
                max={30}
                step={1}
              />
            </SliderField>
          </div>
        </SectionCard>

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

          <Button
            className="flex-1 bg-white text-black hover:bg-white/90"
            onClick={() => onRestart?.()}
          >
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
