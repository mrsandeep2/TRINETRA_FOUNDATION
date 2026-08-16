import { Heart, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";

export interface MarqueeItem {
  text: string;
  emoji: string;
  badge?: string;
  color?: string;
}

const defaultMarqueeItems: MarqueeItem[] = [
  { text: "Love & Humanitarian Care", emoji: "❤️", badge: "Core", color: "from-rose-500/15 to-pink-500/10 text-rose-600 dark:text-rose-400 border-rose-500/20" },
  { text: "Food & Nutrition", emoji: "🍲", badge: "Relief", color: "from-orange-500/15 to-amber-500/10 text-orange-600 dark:text-orange-400 border-orange-500/20" },
  { text: "Education & Literacy", emoji: "🎓", badge: "Future", color: "from-blue-500/15 to-indigo-500/10 text-blue-600 dark:text-blue-400 border-blue-500/20" },
  { text: "Healthcare & Diagnostics", emoji: "🩺", badge: "Health", color: "from-emerald-500/15 to-teal-500/10 text-emerald-600 dark:text-emerald-400 border-emerald-500/20" },
  { text: "Helping Hand & Inclusion", emoji: "🤝", badge: "Grassroots", color: "from-amber-500/15 to-yellow-500/10 text-amber-600 dark:text-amber-400 border-amber-500/20" },
  { text: "Gaushala & Animal Welfare", emoji: "🐮", badge: "Compassion", color: "from-amber-600/15 to-orange-500/10 text-amber-700 dark:text-amber-400 border-amber-600/20" },
  { text: "Afforestation & Clean Water", emoji: "🌲", badge: "Ecology", color: "from-green-500/15 to-emerald-500/10 text-green-600 dark:text-green-400 border-green-500/20" },
  { text: "Livelihood & Skill Training", emoji: "💼", badge: "Dignity", color: "from-purple-500/15 to-violet-500/10 text-purple-600 dark:text-purple-400 border-purple-500/20" },
  { text: "Emergency Disaster Relief", emoji: "🚨", badge: "Action", color: "from-red-500/15 to-rose-500/10 text-red-600 dark:text-red-400 border-red-500/20" },
  { text: "Human Rights & Justice", emoji: "⚖️", badge: "Ethics", color: "from-indigo-500/15 to-cyan-500/10 text-indigo-600 dark:text-indigo-400 border-indigo-500/20" },
];

/** Decorated 2035 Continuous Running Ticker Band with Emojis & Glowing Badges */
export function Marquee({ items }: { items?: (string | MarqueeItem)[] }) {
  const parsedItems: MarqueeItem[] = items && items.length > 0
    ? items.map((it) => {
        if (typeof it === "string") {
          const match = defaultMarqueeItems.find((d) => d.text.toLowerCase().includes(it.toLowerCase()) || it.toLowerCase().includes(d.text.toLowerCase()));
          return match || { text: it, emoji: "✨", color: "from-primary/15 to-amber-500/10 text-primary border-primary/20" };
        }
        return it;
      })
    : defaultMarqueeItems;

  const row = [...parsedItems, ...parsedItems];

  return (
    <div className="relative overflow-hidden border-y border-amber-500/20 bg-gradient-to-r from-[#fdfbf7] via-[#f7f2e8] to-[#fdfbf7] dark:from-[#070c18] dark:via-[#0c1427] dark:to-[#070c18] py-3.5 shadow-xs">
      {/* Dynamic Background Flare */}
      <div className="pointer-events-none absolute -top-8 left-1/3 h-32 w-64 bg-primary/10 blur-[60px]" />
      <div className="pointer-events-none absolute -bottom-8 right-1/3 h-32 w-64 bg-amber-500/10 blur-[60px]" />

      <div className="marquee-mask">
        <div className="marquee-track flex w-max items-center gap-4 sm:gap-6 whitespace-nowrap px-4 select-none">
          {row.map((item, i) => (
            <div
              key={`${item.text}-${i}`}
              className="flex items-center gap-4 sm:gap-6"
            >
              {/* Decorated Cause Pill */}
              <div
                className={cn(
                  "inline-flex items-center gap-2 rounded-full border bg-gradient-to-r px-4 py-1.5 shadow-xs backdrop-blur-md transition-transform duration-200 hover:scale-105",
                  item.color || "from-primary/15 to-amber-500/10 text-navy dark:text-white border-border/80",
                )}
              >
                <span className="text-base sm:text-lg animate-[pulse_3s_ease-in-out_infinite]">{item.emoji}</span>
                <span className="font-display text-xs sm:text-sm font-bold tracking-tight text-navy dark:text-white">
                  {item.text}
                </span>
                {item.badge && (
                  <span className="rounded-full bg-white/60 dark:bg-white/10 px-1.5 py-0.2 text-[9px] font-mono font-bold uppercase tracking-wider opacity-80">
                    {item.badge}
                  </span>
                )}
              </div>

              {/* Sparkling Separator */}
              <div className="flex items-center gap-1.5 text-primary/60">
                <Sparkles className="h-3 w-3 text-amber-500 animate-spin [animation-duration:8s]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
