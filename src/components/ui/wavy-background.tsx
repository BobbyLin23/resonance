"use client";

import type { ReactNode } from "react";
import { useEffect, useMemo, useRef } from "react";
import { createNoise3D } from "simplex-noise";
import { cn } from "@/lib/utils";

const DEFAULT_COLORS = ["#38bdf8", "#818cf8", "#c084fc", "#e879f9", "#22d3ee"];

export const WavyBackground = ({
  children,
  className,
  containerClassName,
  colors,
  waveWidth,
  backgroundFill,
  blur = 10,
  speed = "fast",
  waveOpacity = 0.5,
  waveYOffset = 0,
  ...props
}: {
  children?: ReactNode;
  className?: string;
  containerClassName?: string;
  colors?: string[];
  waveWidth?: number;
  backgroundFill?: string;
  blur?: number;
  speed?: "slow" | "fast";
  waveOpacity?: number;
  waveYOffset?: number;
  [key: string]: unknown;
}) => {
  const noise = useMemo(() => createNoise3D(), []);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const frameRef = useRef(0);

  const waveColors = colors ?? DEFAULT_COLORS;

  const propsRef = useRef({
    backgroundFill,
    blur,
    speed,
    waveOpacity,
    waveWidth,
    waveYOffset,
    waveColors,
  });
  propsRef.current = {
    backgroundFill,
    blur,
    speed,
    waveOpacity,
    waveWidth,
    waveYOffset,
    waveColors,
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let nt = 0;

    const isSafariCanvas =
      typeof navigator !== "undefined" &&
      navigator.userAgent.includes("Safari") &&
      !navigator.userAgent.includes("Chrome");

    const resize = () => {
      const { blur: b } = propsRef.current;
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
      if (isSafariCanvas) {
        ctx.filter = "none";
        canvas.style.filter = `blur(${b}px)`;
      } else {
        canvas.style.filter = "";
        ctx.filter = `blur(${b}px)`;
      }
    };

    const getSpeed = () => {
      const s = propsRef.current.speed;
      switch (s) {
        case "slow":
          return 0.001;
        case "fast":
          return 0.002;
        default:
          return 0.001;
      }
    };

    const tick = () => {
      const {
        backgroundFill: fill,
        waveOpacity: opacity,
        waveColors: wc,
        waveWidth: ww,
        waveYOffset: yOff,
      } = propsRef.current;

      ctx.fillStyle = fill || "black";
      ctx.globalAlpha = opacity ?? 0.5;
      ctx.fillRect(0, 0, w, h);

      nt += getSpeed();
      for (let i = 0; i < 5; i++) {
        ctx.beginPath();
        ctx.lineWidth = ww || 50;
        ctx.strokeStyle = wc[i % wc.length] ?? "#38bdf8";
        for (let x = 0; x < w; x += 5) {
          const y = noise(x / 800, 0.3 * i, nt) * 100;
          ctx.lineTo(x, y + yOff);
        }
        ctx.stroke();
        ctx.closePath();
      }

      frameRef.current = requestAnimationFrame(tick);
    };

    resize();
    window.addEventListener("resize", resize);
    frameRef.current = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(frameRef.current);
    };
  }, [noise]);

  return (
    <div
      className={cn(
        "h-screen flex flex-col items-center justify-center",
        containerClassName,
      )}
    >
      <canvas className="absolute inset-0 z-0" ref={canvasRef} id="canvas" />
      <div className={cn("relative z-10", className)} {...props}>
        {children}
      </div>
    </div>
  );
};
