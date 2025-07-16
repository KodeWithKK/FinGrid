"use client";

import { useEffect, useState } from "react";
import { animate, motion, useMotionValue } from "motion/react";

import { cn } from "@/lib/utils";

interface ProgressBarProps {
  percentage: number;
}

export function ProgressBar({ percentage }: ProgressBarProps) {
  const [bgColor, setBgColor] = useState("bg-green-500");

  const width = useMotionValue("0%");
  const pct = Math.min(100, Math.max(0, percentage));

  useEffect(() => {
    const anim = animate(width, `${pct}%`, {
      duration: 1,
      ease: "easeOut",
      onUpdate(latest) {
        const num = parseFloat(latest);
        if (num >= 90) setBgColor("bg-red-500");
        else if (num >= 70) setBgColor("bg-amber-500");
        else setBgColor("bg-green-500");
      },
    });

    return () => anim.stop();
  }, [pct, width]);

  return (
    <div className="bg-foreground/10 mt-4 h-2 w-full overflow-hidden rounded-full">
      <motion.div
        style={{ width }}
        className={cn(
          "h-full rounded-full transition-colors duration-300",
          bgColor,
        )}
      />
    </div>
  );
}
