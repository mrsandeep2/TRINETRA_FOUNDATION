import { useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Heart,
  ArrowRight,
  Sparkles,
  Users,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ShieldCheck,
  MapPin,
  CheckCircle2,
} from "lucide-react";
import { cn } from "@/lib/utils";
import teamDirector from "@/assets/team-director.jpg";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  category: string;
  image: string;
  bio: string;
  socials: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
}

const teamMembers: TeamMember[] = [
  {
    id: "m1",
    name: "Sandeep Kumar",
    role: "Director & Founder",
    category: "Director",
    image: teamDirector,
    bio: "Guiding grassroots relief, Section 8 governance, and 12 welfare programmes across Northern Bihar.",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: "m2",
    name: "Priya Sharma",
    role: "Community & Food Relief Lead",
    category: "Field Operations",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80",
    bio: "Managing daily community kitchens and food ration deliveries to vulnerable households.",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: "m3",
    name: "Dr. Ananya Ray",
    role: "Healthcare & Diagnostics Lead",
    category: "Medical",
    image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80",
    bio: "Organising weekly rural medical camps, specialist diagnostic checkups, and free medicines.",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
  {
    id: "m4",
    name: "Rahul Verma",
    role: "Youth & STEM Education Mentor",
    category: "Education",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80",
    bio: "Leading STEM learning labs, computer literacy, and scholarship mentoring for village students.",
    socials: {
      facebook: "#",
      twitter: "#",
      linkedin: "#",
      instagram: "#",
    },
  },
];

export function OurTeamSection() {
  const [activeCardId, setActiveCardId] = useState<string>("m1");

  return (
    <section className="relative overflow-hidden bg-[#fdfbf7] dark:bg-[#070c18] min-h-[640px] lg:h-[100svh] lg:max-h-[960px] flex flex-col justify-between py-4 sm:py-5 lg:py-6 border-t border-border/50">
      {/* Background Ambient Flares */}
      <div className="pointer-events-none absolute top-1/4 -left-28 h-80 w-80 rounded-full bg-primary/10 blur-[130px]" />
      <div className="pointer-events-none absolute -bottom-10 right-10 h-72 w-72 rounded-full bg-amber-500/10 blur-[110px]" />

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 w-full flex-1 flex flex-col justify-between">
        {/* COMPACT TOP HEADER ROW */}
        <div className="flex flex-wrap items-center justify-between gap-3 shrink-0 mb-2 sm:mb-3">
          <div>
            {/* Top Red Heart Badge */}
            <div className="flex items-center gap-2 mb-1.5">
              <span className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-0.5 text-xs font-bold text-primary border border-primary/20">
                <Heart className="h-3 w-3 fill-[#ea580c] text-[#ea580c] animate-pulse" />
                Our Team
              </span>
              <span className="hidden sm:inline-flex items-center gap-1 text-[11px] font-semibold text-muted-foreground">
                <ShieldCheck className="h-3 w-3 text-emerald-500" />
                Grassroots Volunteers
              </span>
            </div>

            {/* Main Headline */}
            <h2 className="font-display text-2xl sm:text-3xl lg:text-[2.1rem] font-extrabold tracking-tight text-navy dark:text-white leading-tight">
              Dedicated Grassroots Leaders{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706]">
                Committed to Change
              </span>
            </h2>
          </div>

          {/* Right Action Button (Join With Us) */}
          <Link
            to="/volunteer"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-primary via-[#ea580c] to-[#d97706] px-5 py-2.5 text-xs font-bold tracking-wider text-white uppercase shadow-md shadow-primary/25 transition-all duration-300 hover:scale-105 active:scale-95 group"
          >
            <span className="flex h-4 w-4 items-center justify-center rounded-full bg-white/20 text-white group-hover:translate-x-0.5 transition-transform text-[11px]">
              »
            </span>
            <span>Join With us</span>
          </Link>
        </div>

        {/* 4 TEAM CARDS GRID - COMPACT ADAPTIVE SINGLE-SCREEN HEIGHT */}
        <div className="grid gap-3.5 sm:gap-4 sm:grid-cols-2 lg:grid-cols-4 flex-1 my-auto items-center">
          {teamMembers.map((member) => {
            const isActive = activeCardId === member.id;

            return (
              <div
                key={member.id}
                onMouseEnter={() => setActiveCardId(member.id)}
                onClick={() => setActiveCardId(member.id)}
                className={cn(
                  "group relative overflow-hidden rounded-[2rem] transition-all duration-300 cursor-pointer select-none flex flex-col justify-between max-h-[440px]",
                  isActive
                    ? "bg-[#ea580c] text-white shadow-[0_18px_45px_-12px_rgba(234,88,12,0.45)] -translate-y-1.5 scale-[1.02]"
                    : "bg-[#f1eee8] dark:bg-[#0d1527] text-navy dark:text-white hover:-translate-y-1 hover:shadow-lg border border-border/60",
                )}
              >
                {/* PHOTO CONTAINER */}
                <div className="relative aspect-[4/4.1] w-full overflow-hidden bg-navy/10">
                  <img
                    src={member.image}
                    alt={member.name}
                    loading="lazy"
                    decoding="async"
                    className="h-full w-full object-cover object-top transition-transform duration-700 group-hover:scale-105"
                  />
                  <div
                    className={cn(
                      "absolute inset-0 transition-opacity duration-300",
                      isActive
                        ? "bg-gradient-to-t from-[#ea580c] via-transparent to-transparent opacity-80"
                        : "bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-35",
                    )}
                  />

                  {/* FLOATING SOCIAL MEDIA ICONS OVERLAY ON ACTIVE/HOVER CARD */}
                  <div
                    className={cn(
                      "absolute bottom-3 inset-x-0 flex items-center justify-center gap-1.5 transition-all duration-300",
                      isActive
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0",
                    )}
                  >
                    <a
                      href={member.socials.facebook}
                      aria-label="Facebook"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white text-white hover:text-primary backdrop-blur-md transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Facebook className="h-3 w-3 fill-current" />
                    </a>
                    <a
                      href={member.socials.twitter}
                      aria-label="Twitter"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white text-white hover:text-primary backdrop-blur-md transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Twitter className="h-3 w-3 fill-current" />
                    </a>
                    <a
                      href={member.socials.linkedin}
                      aria-label="LinkedIn"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white text-white hover:text-primary backdrop-blur-md transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Linkedin className="h-3 w-3 fill-current" />
                    </a>
                    <a
                      href={member.socials.instagram}
                      aria-label="Instagram"
                      className="flex h-7 w-7 items-center justify-center rounded-full bg-white/20 hover:bg-white text-white hover:text-primary backdrop-blur-md transition-colors"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <Instagram className="h-3 w-3" />
                    </a>
                  </div>
                </div>

                {/* BOTTOM NAME & ROLE DETAILS (MATCHING REFERENCE ORANGE CARD) */}
                <div
                  className={cn(
                    "p-3.5 sm:p-4 text-center transition-colors duration-300",
                    isActive ? "bg-[#ea580c] text-white" : "bg-transparent",
                  )}
                >
                  <h3
                    className={cn(
                      "font-display text-base sm:text-lg font-bold tracking-tight line-clamp-1",
                      isActive ? "text-white" : "text-navy dark:text-white",
                    )}
                  >
                    {member.name}
                  </h3>
                  <p
                    className={cn(
                      "text-[11px] sm:text-xs font-medium mt-0.5 line-clamp-1",
                      isActive ? "text-white/90" : "text-muted-foreground",
                    )}
                  >
                    {member.role}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOTTOM SUPPORT BAR */}
        <div className="shrink-0 pt-2 pb-1 text-center">
          <p className="text-xs text-muted-foreground flex items-center justify-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>Over 120+ active field volunteers driving daily welfare in Forbesganj & Araria, Bihar.</span>
            <Link to="/volunteer" className="font-bold text-primary hover:underline ml-1">
              Join the Movement →
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}
