import { useEffect, useState } from "react";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

export interface CounterProps {
  value: number;
  prefix?: string;
  suffix?: string;
  triggerKey?: string | number;
  duration?: number;
  className?: string;
}

export function Counter({
  value,
  prefix = "",
  suffix = "",
  triggerKey,
  duration = 900,
  className,
}: CounterProps) {
  const { ref, inView } = useInView<HTMLSpanElement>();
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setDisplay(value);
      return;
    }

    // Explicitly reset to 0 so every touch/click/hover immediately re-animates from 0!
    setDisplay(0);

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Quintic ease-out for smooth rolling numbers
      const eased = 1 - Math.pow(1 - progress, 4);
      setDisplay(Math.round(value * eased));
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setDisplay(value);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, value, triggerKey, duration]);

  return (
    <span ref={ref} className={className}>
      {prefix}
      {display.toLocaleString("en-IN")}
      {suffix}
    </span>
  );
}

export interface AnimatedProgressBarProps {
  percentage: number;
  triggerKey?: string | number;
  categoryGradient?: string;
  duration?: number;
  className?: string;
}

export function AnimatedProgressBar({
  percentage,
  triggerKey,
  categoryGradient,
  duration = 900,
  className,
}: AnimatedProgressBarProps) {
  const { ref, inView } = useInView<HTMLDivElement>();
  const [currentWidth, setCurrentWidth] = useState(0);

  useEffect(() => {
    if (!inView) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setCurrentWidth(percentage);
      return;
    }

    // Instantly reset to 0 so every hover/touch/click re-animates from 0%
    setCurrentWidth(0);

    let frame = 0;
    const start = performance.now();

    const tick = (now: number) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 4);
      setCurrentWidth(percentage * eased);
      if (progress < 1) {
        frame = requestAnimationFrame(tick);
      } else {
        setCurrentWidth(percentage);
      }
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, percentage, triggerKey, duration]);

  const displayPercent = Math.round(currentWidth);

  return (
    <div ref={ref} className={cn("relative pt-5 pb-0.5 w-full flex items-center", className)}>
      {/* Background Track */}
      <div className="absolute inset-x-0 bottom-1 h-2 rounded-full bg-slate-200/90 dark:bg-white/10 shadow-inner" />

      {/* Filled Gradient Bar */}
      <div
        className={cn(
          "relative bottom-1 h-2 rounded-full bg-gradient-to-r transition-none",
          categoryGradient || "from-primary via-[#ea580c] to-[#d97706]",
        )}
        style={{ width: `${Math.max(0, Math.min(100, currentWidth))}%` }}
      >
        {/* Shimmer Glare Stream */}
        <div className="absolute inset-0 rounded-full bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[holo-shimmer_2s_infinite] overflow-hidden" />

        {/* Floating Percentage Badge & Big Dot Indicator riding right at the end of progress */}
        <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 flex flex-col items-center z-20 pointer-events-none">
          {/* Floating Percentage Tooltip Badge riding on top of the dot */}
          <div
            className={cn(
              "absolute -top-6 flex flex-col items-center transition-transform",
              currentWidth < 18 && "translate-x-3",
              currentWidth > 82 && "-translate-x-3",
            )}
          >
            <span className="font-display font-extrabold text-[10.5px] leading-none text-primary bg-primary/10 dark:bg-white/10 px-2 py-0.5 rounded-full border border-primary/30 shadow-xs whitespace-nowrap backdrop-blur-md">
              {displayPercent}%
            </span>
          </div>

          {/* Glowing Ping Ring */}
          <div className="absolute h-5 w-5 rounded-full bg-primary/30 animate-ping opacity-60" />
          
          {/* Prominent Big Dot with White Border & Vibrant Saffron Core */}
          <div className="relative h-3.5 w-3.5 sm:h-4 sm:w-4 rounded-full border-2 sm:border-[2.5px] border-white dark:border-[#0d1527] bg-gradient-to-tr from-primary via-[#ea580c] to-amber-400 shadow-[0_2px_8px_rgba(234,88,12,0.65)] ring-2 ring-primary/30" />
        </div>
      </div>
    </div>
  );
}
