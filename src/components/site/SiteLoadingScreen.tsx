import { useEffect, useState } from "react";
import { RefreshCw, AlertCircle, Home, Heart } from "lucide-react";
import { cn } from "@/lib/utils";

interface SiteLoadingScreenProps {
  /** Explicit error state trigger */
  hasError?: boolean;
  /** Retry callback function */
  onRetry?: () => void;
}

export function SiteLoadingScreen({
  hasError = false,
  onRetry,
}: SiteLoadingScreenProps) {
  const [isRetrying, setIsRetrying] = useState(false);

  const handleRetry = () => {
    setIsRetrying(true);
    if (onRetry) {
      onRetry();
    } else {
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#fdfbf7] via-[#f8f3ec] to-[#f4ece0] dark:from-[#070c18] dark:via-[#0c1424] dark:to-[#070b16] select-none">
      {/* Dynamic Ambient Background Glow Mesh */}
      <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-primary/15 blur-[130px] animate-[pulse_5s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-amber-500/15 blur-[120px] animate-[pulse_6s_ease-in-out_infinite]" />
      <div className="pointer-events-none absolute -bottom-24 left-1/3 h-80 w-80 rounded-full bg-emerald-500/10 blur-[110px]" />

      {/* Cyber Mesh Background Pattern */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(#ea580c_0.75px,transparent_0.75px)] [background-size:24px_24px] opacity-[0.06] dark:opacity-[0.1]" />

      {/* ========================================================================= */}
      {/* 1. SKELETON MODE (NO TEXT, FLOATING CARDS, SUBTLE SHIMMER & SOFT BLUR)   */}
      {/* ========================================================================= */}
      {!hasError ? (
        <div className="relative z-10 mx-auto flex h-full w-full max-w-7xl flex-col justify-between p-4 sm:p-6 lg:p-8 animate-in fade-in duration-500">
          {/* Top Floating Header Capsule Placeholder */}
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between rounded-full border border-white/80 dark:border-white/10 bg-white/70 dark:bg-white/5 px-4 py-2.5 shadow-[0_10px_30px_-10px_rgba(20,28,50,0.08)] backdrop-blur-2xl">
            {/* Logo Pebble Skeleton */}
            <div className="flex items-center gap-3">
              <div className="h-9 w-9 rounded-2xl bg-black/10 dark:bg-white/10 animate-pulse" />
              <div className="space-y-1.5 hidden sm:block">
                <div className="h-3.5 w-24 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
                <div className="h-2 w-16 rounded-full bg-primary/20 animate-pulse" />
              </div>
            </div>

            {/* Nav Pill Placeholders */}
            <div className="hidden md:flex items-center gap-2">
              <div className="h-6 w-14 rounded-full bg-black/8 dark:bg-white/10 animate-pulse" />
              <div className="h-6 w-16 rounded-full bg-black/8 dark:bg-white/10 animate-pulse" />
              <div className="h-6 w-16 rounded-full bg-black/8 dark:bg-white/10 animate-pulse" />
              <div className="h-6 w-20 rounded-full bg-black/8 dark:bg-white/10 animate-pulse" />
            </div>

            {/* Action CTA Placeholder */}
            <div className="flex items-center gap-2">
              <div className="h-8 w-24 rounded-full bg-gradient-to-r from-primary/30 to-amber-500/30 animate-pulse" />
            </div>
          </div>

          {/* Center Stage: Split Hero Skeleton Matrix */}
          <div className="my-auto grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-12 py-4">
            {/* Left Content Skeletons */}
            <div className="flex flex-col gap-4">
              {/* Mission Badge Pill */}
              <div className="flex items-center gap-2">
                <div className="h-6 w-32 rounded-full bg-primary/20 animate-pulse" />
                <div className="h-6 w-28 rounded-full bg-emerald-500/20 animate-pulse hidden sm:block" />
              </div>

              {/* Grand Headline Bars */}
              <div className="space-y-2.5 pt-1">
                <div className="h-9 sm:h-12 w-11/12 rounded-2xl bg-black/12 dark:bg-white/12 animate-pulse" />
                <div className="h-9 sm:h-12 w-3/4 rounded-2xl bg-gradient-to-r from-primary/30 via-amber-500/30 to-primary/20 animate-pulse" />
              </div>

              {/* Subtitle Lines */}
              <div className="space-y-2 pt-2 max-w-lg">
                <div className="h-3.5 w-full rounded-full bg-black/8 dark:bg-white/8 animate-pulse" />
                <div className="h-3.5 w-4/5 rounded-full bg-black/8 dark:bg-white/8 animate-pulse" />
              </div>

              {/* Support Console Card Placeholder */}
              <div className="mt-4 rounded-3xl border border-white/90 dark:border-white/10 bg-white/80 dark:bg-white/5 p-4 sm:p-5 shadow-[0_15px_40px_-15px_rgba(20,28,50,0.12)] backdrop-blur-2xl">
                <div className="flex items-center justify-between mb-3">
                  <div className="h-4 w-36 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
                  <div className="h-4 w-20 rounded-full bg-primary/20 animate-pulse" />
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                  <div className="h-14 rounded-2xl bg-black/6 dark:bg-white/6 animate-pulse" />
                  <div className="h-14 rounded-2xl bg-primary/20 animate-pulse" />
                  <div className="h-14 rounded-2xl bg-black/6 dark:bg-white/6 animate-pulse" />
                  <div className="h-14 rounded-2xl bg-black/6 dark:bg-white/6 animate-pulse" />
                </div>
                <div className="mt-4 flex gap-3">
                  <div className="h-10 flex-1 rounded-full bg-gradient-to-r from-primary/30 to-amber-500/30 animate-pulse" />
                  <div className="h-10 w-28 rounded-full bg-black/10 dark:bg-white/10 animate-pulse hidden sm:block" />
                </div>
              </div>
            </div>

            {/* Right Floating Hero Card Skeleton */}
            <div className="relative mx-auto w-full max-w-[22rem] sm:max-w-[26rem] lg:max-w-[32rem]">
              <div className="relative aspect-[4/3.2] overflow-hidden rounded-[2.5rem] border border-white/90 dark:border-white/15 bg-white/70 dark:bg-white/5 p-3 shadow-2xl backdrop-blur-3xl">
                {/* Media Shimmer Window */}
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] bg-black/10 dark:bg-white/10">
                  {/* Subtle Shimmer Ray */}
                  <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/30 dark:via-white/10 to-transparent" />
                  
                  {/* Floating Stat Pill on Card */}
                  <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-2xl bg-white/80 dark:bg-black/40 p-3 backdrop-blur-md">
                    <div className="space-y-1">
                      <div className="h-4 w-24 rounded-full bg-black/15 dark:bg-white/20 animate-pulse" />
                      <div className="h-2.5 w-16 rounded-full bg-primary/30 animate-pulse" />
                    </div>
                    <div className="h-7 w-7 rounded-xl bg-primary/25 animate-pulse" />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Running Strip Placeholder */}
          <div className="mx-auto flex w-full max-w-4xl items-center justify-center gap-3 overflow-hidden rounded-full border border-amber-500/20 bg-white/50 dark:bg-white/5 py-2.5 px-6 backdrop-blur-xl">
            <div className="h-3 w-3 rounded-full bg-primary/30 animate-pulse" />
            <div className="h-3 w-28 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500/40" />
            <div className="h-3 w-32 rounded-full bg-black/10 dark:bg-white/10 animate-pulse" />
            <div className="h-1.5 w-1.5 rounded-full bg-amber-500/40 hidden sm:block" />
            <div className="h-3 w-28 rounded-full bg-black/10 dark:bg-white/10 animate-pulse hidden sm:block" />
          </div>
        </div>
      ) : (
        /* ========================================================================= */
        /* 2. ERROR STATE (CLEAN MINIMAL, "Something went wrong" & PROMINENT RETRY) */
        /* ========================================================================= */
        <div className="relative z-10 m-auto flex w-full max-w-md flex-col items-center px-6 text-center animate-in fade-in zoom-in-95 duration-500">
          {/* Glowing Beacon Icon Container */}
          <div className="relative mb-6 flex h-20 w-20 items-center justify-center rounded-3xl border border-primary/30 bg-gradient-to-tr from-primary/15 via-amber-500/10 to-transparent shadow-[0_15px_35px_-10px_rgba(234,88,12,0.35)] backdrop-blur-2xl">
            <div className="absolute -inset-1 rounded-3xl bg-primary/20 blur-md animate-pulse" />
            <AlertCircle className="relative h-10 w-10 text-primary animate-bounce" />
          </div>

          {/* Clean Modern Headline */}
          <h2 className="font-display text-2xl sm:text-3xl font-extrabold tracking-tight text-navy dark:text-white">
            Something went wrong
          </h2>

          <p className="mt-2.5 text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xs">
            We couldn’t connect to the server or load the content. Please check your connection and try again.
          </p>

          {/* Action Buttons */}
          <div className="mt-7 flex w-full flex-col sm:flex-row items-center justify-center gap-3">
            {/* Prominent Saffron-Amber Retry Button */}
            <button
              type="button"
              onClick={handleRetry}
              disabled={isRetrying}
              className={cn(
                "group relative flex w-full sm:w-auto items-center justify-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] px-7 py-3.5 text-xs font-bold tracking-[0.14em] text-white uppercase shadow-[0_12px_28px_-6px_rgba(234,88,12,0.5)] transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer select-none",
                isRetrying && "opacity-80 cursor-wait",
              )}
            >
              <RefreshCw className={cn("h-4 w-4 transition-transform group-hover:rotate-180 duration-500", isRetrying && "animate-spin")} />
              <span>{isRetrying ? "Retrying..." : "Retry"}</span>
            </button>

            {/* Subtle Home Navigation Link */}
            <a
              href="/"
              className="flex w-full sm:w-auto items-center justify-center gap-2 rounded-full border border-border/80 bg-white/70 dark:bg-white/5 px-6 py-3.5 text-xs font-bold tracking-[0.12em] text-navy dark:text-white uppercase transition-all duration-200 hover:bg-navy hover:text-white hover:border-navy"
            >
              <Home className="h-3.5 w-3.5" />
              <span>Go Home</span>
            </a>
          </div>

          {/* Bottom Trust Watermark */}
          <div className="mt-8 flex items-center gap-1.5 text-[11px] font-semibold text-muted-foreground/80">
            <Heart className="h-3 w-3 fill-primary text-primary" />
            <span>Trinetra Foundation · Section 8 NGO</span>
          </div>
        </div>
      )}
    </div>
  );
}

/** Smooth Initial/Refresh Page Loader that guarantees 1.2s of modern skeleton experience before fading out */
export function PageInitialLoader({ minDisplayMs = 1200 }: { minDisplayMs?: number }) {
  const [show, setShow] = useState(true);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFading(true);
      const removeTimer = setTimeout(() => {
        setShow(false);
      }, 700);
      return () => clearTimeout(removeTimer);
    }, minDisplayMs);

    return () => clearTimeout(timer);
  }, [minDisplayMs]);

  if (!show) return null;

  return (
    <div
      className={cn(
        "fixed inset-0 z-[999] transition-opacity duration-700 ease-out pointer-events-auto",
        fading && "opacity-0 pointer-events-none",
      )}
    >
      <SiteLoadingScreen hasError={false} />
    </div>
  );
}
