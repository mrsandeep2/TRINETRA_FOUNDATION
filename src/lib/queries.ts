import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const campaignsQuery = queryOptions({
  queryKey: ["campaigns"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("campaigns")
      .select("*")
      .eq("is_published", true)
      .order("is_featured", { ascending: false })
      .order("created_at", { ascending: true });
    if (error) throw error;
    return data;
  },
});

export const storiesQuery = queryOptions({
  queryKey: ["stories"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("stories")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data;
  },
});

export const eventsQuery = queryOptions({
  queryKey: ["events"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("events")
      .select("*")
      .eq("is_published", true)
      .order("starts_at", { ascending: true });
    if (error) throw error;
    return data;
  },
});

export const metricsQuery = queryOptions({
  queryKey: ["impact_metrics"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("impact_metrics")
      .select("*")
      .eq("is_published", true)
      .order("sort_order", { ascending: true });
    if (error) throw error;
    return data;
  },
});

export const documentsQuery = queryOptions({
  queryKey: ["documents"],
  staleTime: 10 * 60 * 1000,
  gcTime: 60 * 60 * 1000,
  queryFn: async () => {
    const { data, error } = await supabase
      .from("documents")
      .select("*")
      .eq("is_published", true)
      .order("published_at", { ascending: false });
    if (error) throw error;
    return data;
  },
});

export function formatInr(amount: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}