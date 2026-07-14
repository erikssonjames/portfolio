"use client";

import { GameOfLifeSettingsPanel } from "./game-of-life-settings";
import { GameOfLifeInfoButton } from "./game-of-life-info-button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuPortal, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Cog, Pause, Play, RotateCw } from "lucide-react";
import { useGol } from "./gol-context";

export function GameOfLifeControlsOverlay() {
  const {
    settings,
    setSettings,
    isPlaying,
    setIsPlaying,
    requestRestart,
    requestRandomize
  } = useGol();

  return (
    <div className="flex items-center gap-2 rounded-none border border-white/10 bg-black/40 p-2 shadow-xl backdrop-blur">
      <ButtonGroup>
        <ButtonGroup>
          <Button size="sm" onClick={() => setIsPlaying((p) => !p)} variant="outline">
            {isPlaying ? <Pause /> : <Play />}
          </Button>

          <Button size="sm" onClick={requestRestart} variant="outline">
            <RotateCw />
          </Button>
        </ButtonGroup>

        <ButtonGroup>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="icon-sm">
                <Cog className="size-4" />
              </Button>
            </DropdownMenuTrigger>

            {/* Portal prevents clipping + stacking issues */}
            <DropdownMenuPortal>
              <DropdownMenuContent
                className="z-50 w-fit p-0 border-white/10 bg-transparent shadow-none"
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
        </ButtonGroup>

        <GameOfLifeInfoButton />
      </ButtonGroup>
    </div>
  );
}
