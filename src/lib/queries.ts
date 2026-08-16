import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const campaignsQuery = queryOptions({
  queryKey: ["campaigns"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    try {
      const { data, error } = await supabase
        .from("campaigns")
        .select("*")
        .eq("is_published", true)
        .order("is_featured", { ascending: false })
        .order("created_at", { ascending: true });
      if (error) {
        console.warn("Could not load campaigns:", error);
        return [];
      }
      return data ?? [];
    } catch (err) {
      console.warn("Campaigns query exception:", err);
      return [];
    }
  },
});

export const storiesQuery = queryOptions({
  queryKey: ["stories"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    try {
      const { data, error } = await supabase
        .from("stories")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) {
        console.warn("Could not load stories:", error);
        return [];
      }
      return data ?? [];
    } catch (err) {
      console.warn("Stories query exception:", err);
      return [];
    }
  },
});

export const eventsQuery = queryOptions({
  queryKey: ["events"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    try {
      const { data, error } = await supabase
        .from("events")
        .select("*")
        .eq("is_published", true)
        .order("starts_at", { ascending: true });
      if (error) {
        console.warn("Could not load events:", error);
        return [];
      }
      return data ?? [];
    } catch (err) {
      console.warn("Events query exception:", err);
      return [];
    }
  },
});

export const metricsQuery = queryOptions({
  queryKey: ["impact_metrics"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    try {
      const { data, error } = await supabase
        .from("impact_metrics")
        .select("*")
        .eq("is_published", true)
        .order("sort_order", { ascending: true });
      if (error) {
        console.warn("Could not load impact_metrics:", error);
        return [];
      }
      return data ?? [];
    } catch (err) {
      console.warn("Impact metrics query exception:", err);
      return [];
    }
  },
});

export const documentsQuery = queryOptions({
  queryKey: ["documents"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    try {
      const { data, error } = await supabase
        .from("documents")
        .select("*")
        .eq("is_published", true)
        .order("published_at", { ascending: false });
      if (error) {
        console.warn("Could not load documents:", error);
        return [];
      }
      return data ?? [];
    } catch (err) {
      console.warn("Documents query exception:", err);
      return [];
    }
  },
});

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}