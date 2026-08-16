import { queryOptions } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export type AdminTable =
  | "campaigns"
  | "stories"
  | "events"
  | "impact_metrics"
  | "documents"
  | "volunteer_applications"
  | "contact_messages"
  | "partner_inquiries"
  | "donations";

export function adminListQuery(table: AdminTable, orderBy = "created_at", ascending = false) {
  return queryOptions({
    queryKey: ["admin", table],
    queryFn: async () => {
      const { data, error } = await supabase
        .from(table)
        .select("*")
        .order(orderBy, { ascending })
        .limit(500);
      if (error) throw error;
      return (data ?? []) as Record<string, unknown>[];
    },
    staleTime: 30_000,
  });
}

export const adminStatsQuery = queryOptions({
  queryKey: ["admin", "stats"],
  staleTime: 30_000,
  queryFn: async () => {
    const tables: AdminTable[] = [
      "events",
      "documents",
      "volunteer_applications",
      "contact_messages",
      "partner_inquiries",
      "donations",
    ];
    const results = await Promise.all(
      tables.map(async (t) => {
        const { count, error } = await supabase.from(t).select("id", { count: "exact", head: true });
        if (error) throw error;
        return [t, count ?? 0] as const;
      }),
    );
    return Object.fromEntries(results) as Record<AdminTable, number>;
  },
});