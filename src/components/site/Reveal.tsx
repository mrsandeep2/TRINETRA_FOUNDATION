import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

type RevealProps = {
  children: ReactNode;
  delay?: number;
  y?: number;
  className?: string;
};

export function Reveal({ children, delay = 0, y = 20, className }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      node.classList.add("reveal-visible");
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      node.classList.add("reveal-visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;
        node.style.transitionDelay = `${delay}s`;
        node.classList.add("reveal-visible");
        observer.disconnect();
      },
      { rootMargin: "80px 0px", threshold: 0.01 },
    );

    observer.observe(node);

    // Failsafe timer: Ensure content is ALWAYS made visible after mount even if observer is delayed
    const timer = setTimeout(() => {
      if (node && !node.classList.contains("reveal-visible")) {
        node.classList.add("reveal-visible");
      }
    }, 350 + delay * 1000);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [delay]);

  return (
    <div
      ref={ref}
      className={`reveal ${className ?? ""}`}
      style={{ "--reveal-y": `${y}px` } as CSSProperties}
    >
      {children}
    </div>
  );
}
