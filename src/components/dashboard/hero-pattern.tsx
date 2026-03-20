"use client";

import { useTheme } from "next-themes";
import { useEffect, useMemo, useState } from "react";

import { WavyBackground } from "@/components/ui/wavy-background";

const LIGHT_WAVE_COLORS = ["#2DD4BF", "#22D3EE", "#38BDF8", "#818CF8"];
/** Higher-contrast strokes on dark `--background`. */
const DARK_WAVE_COLORS = ["#2DD4BF", "#38BDF8", "#818CF8", "#C4B5FD"];

function readCssBackground(): string {
  if (typeof document === "undefined") return "";
  const raw = getComputedStyle(document.documentElement)
    .getPropertyValue("--background")
    .trim();
  return raw || "";
}

export const HeroPattern = () => {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // `resolvedTheme` bumps recomputation when `.dark` toggles on `<html>`.
  // biome-ignore lint/correctness/useExhaustiveDependencies: must track theme for computed `--background`
  const backgroundFill = useMemo(() => {
    if (!mounted) return "";
    return readCssBackground() || "hsl(0 0% 100%)";
  }, [mounted, resolvedTheme]);

  const isDark = resolvedTheme === "dark";

  if (!mounted || !backgroundFill) {
    return (
      <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block" />
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 hidden overflow-hidden lg:block">
      <WavyBackground
        blur={3}
        backgroundFill={backgroundFill}
        className="hidden"
        colors={isDark ? DARK_WAVE_COLORS : LIGHT_WAVE_COLORS}
        containerClassName="h-full"
        speed="slow"
        waveOpacity={isDark ? 0.22 : 0.1}
        waveWidth={60}
        waveYOffset={250}
      />
    </div>
  );
};
