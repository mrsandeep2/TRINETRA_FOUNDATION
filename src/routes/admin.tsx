import { createFileRoute, Link, Outlet, useNavigate } from "@tanstack/react-router";
import { useEffect } from "react";
import {
  BarChart3,
  CalendarDays,
  FileText,
  HandCoins,
  Handshake,
  LayoutDashboard,
  Loader2,
  LogOut,
  Mail,
  Users,
} from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Admin Dashboard — Trinetra Foundation" },
      { name: "description", content: "Internal dashboard for Trinetra Foundation staff." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

const nav = [
  { to: "/admin", label: "Overview", icon: LayoutDashboard, exact: true },
  { to: "/admin/events", label: "Events", icon: CalendarDays },
  { to: "/admin/metrics", label: "Impact metrics", icon: BarChart3 },
  { to: "/admin/documents", label: "Documents", icon: FileText },
  { to: "/admin/volunteers", label: "Volunteers", icon: Users },
  { to: "/admin/messages", label: "Messages", icon: Mail },
  { to: "/admin/partners", label: "Partners", icon: Handshake },
  { to: "/admin/donations", label: "Donations", icon: HandCoins },
] as const;

function AdminLayout() {
  const { session, isAdmin, loading } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!loading && !session) void navigate({ to: "/auth" });
  }, [loading, session, navigate]);

  if (loading || !session) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-background">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex min-h-[100svh] items-center justify-center bg-background px-6 pt-24">
        <div className="max-w-md rounded-3xl border border-border bg-card p-8 text-center">
          <h1 className="font-display text-2xl text-navy">Access pending</h1>
          <p className="mt-3 text-sm text-muted-foreground">
            Your account is signed in but does not have admin access yet. An existing admin must
            grant your role.
          </p>
          <button
            type="button"
            onClick={async () => {
              await supabase.auth.signOut();
              void navigate({ to: "/auth" });
            }}
            className="mt-6 rounded-full bg-primary px-6 py-2.5 text-xs font-semibold tracking-[0.16em] text-primary-foreground uppercase"
          >
            Sign out
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[100svh] bg-secondary/8 pt-24 pb-16">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 lg:flex-row lg:px-8">
        <aside className="lg:w-60 lg:shrink-0">
          <nav className="flex gap-2 overflow-x-auto rounded-2xl border border-border bg-card p-2 lg:sticky lg:top-24 lg:flex-col lg:overflow-visible">
            {nav.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeOptions={{ exact: "exact" in item ? item.exact : false }}
                className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm whitespace-nowrap text-navy transition-colors hover:bg-accent"
                activeProps={{ className: "bg-primary/12 text-primary font-semibold" }}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={async () => {
                await supabase.auth.signOut();
                void navigate({ to: "/auth" });
              }}
              className="flex items-center gap-2 rounded-xl px-3 py-2.5 text-sm whitespace-nowrap text-destructive transition-colors hover:bg-destructive/10"
            >
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </nav>
        </aside>
        <div className="min-w-0 flex-1">
          <Outlet />
        </div>
      </div>
    </div>
  );
}