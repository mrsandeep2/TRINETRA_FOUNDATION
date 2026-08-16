import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Loader2, ShieldCheck } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/hooks/useAuth";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [
      { title: "Team Sign In — Trinetra Foundation" },
      {
        name: "description",
        content: "Secure sign-in for Trinetra Foundation staff to manage programmes and submissions.",
      },
      { property: "og:title", content: "Team Sign In — Trinetra Foundation" },
      { property: "og:description", content: "Staff access to the Trinetra Foundation dashboard." },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const { session } = useAuth();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (session) void navigate({ to: "/admin" });
  }, [session, navigate]);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const email = String(data.get("email") ?? "").trim();
    const password = String(data.get("password") ?? "");
    setBusy(true);
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        toast.success("Account created. Sign in to continue.");
        setMode("signin");
        return;
      }
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      // First team member to sign in becomes admin; ignored once an admin exists.
      await supabase.rpc("claim_admin");
      toast.success("Welcome back.");
      void navigate({ to: "/admin" });
    } catch (err) {
      toast.error(err instanceof Error ? err.message : "Authentication failed");
    } finally {
      setBusy(false);
    }
  }

  return (
    <div className="flex min-h-[100svh] items-center justify-center bg-gradient-to-br from-cream via-accent/50 to-primary/10 px-6 py-28">
      <div className="w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-[0_40px_90px_-50px_oklch(0.26_0.05_260/0.55)]">
        <span className="inline-flex items-center gap-2 rounded-full bg-primary/12 px-4 py-2 text-[11px] font-semibold tracking-[0.24em] text-primary uppercase">
          <ShieldCheck className="h-4 w-4" /> Staff area
        </span>
        <h1 className="mt-5 font-display text-3xl text-navy">
          {mode === "signin" ? "Sign in" : "Create team account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Only Trinetra Foundation team members can manage site content.
        </p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Email
            </span>
            <input
              name="email"
              type="email"
              required
              autoComplete="email"
              className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold tracking-[0.14em] text-muted-foreground uppercase">
              Password
            </span>
            <input
              name="password"
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              className="mt-2 w-full rounded-xl border border-input bg-background px-3 py-2.5 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/25"
            />
          </label>
          <button
            type="submit"
            disabled={busy}
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-xs font-semibold tracking-[0.18em] text-primary-foreground uppercase transition-transform hover:scale-[1.02] active:scale-95 disabled:opacity-60"
          >
            {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
            {mode === "signin" ? "Sign in" : "Create account"}
          </button>
        </form>

        <button
          type="button"
          onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
          className="mt-5 text-sm text-primary hover:underline"
        >
          {mode === "signin" ? "Need a team account?" : "Already have an account? Sign in"}
        </button>
      </div>
    </div>
  );
}