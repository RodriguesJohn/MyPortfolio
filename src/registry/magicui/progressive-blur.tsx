"use client";

import { cn } from "@/lib/utils";

interface ProgressiveBlurProps {
  position?: "top" | "bottom";
  height?: string;
  className?: string;
}

export function ProgressiveBlur({
  position = "bottom",
  height = "40%",
  className,
}: ProgressiveBlurProps) {
  const gradientDirection = position === "top" ? "to bottom" : "to top";
  
  return (
    <div
      className={cn(
        "pointer-events-none absolute left-0 right-0 z-10",
        position === "top" ? "top-0" : "bottom-0",
        position === "top" 
          ? "bg-gradient-to-b from-transparent via-background/80 to-background/95"
          : "bg-gradient-to-t from-transparent via-background/80 to-background/95",
        "backdrop-blur-sm",
        className
      )}
      style={{
        height,
      }}
    />
  );
}
