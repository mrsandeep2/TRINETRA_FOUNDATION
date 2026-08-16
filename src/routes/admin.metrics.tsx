import { createFileRoute } from "@tanstack/react-router";
import { RecordManager } from "@/components/admin/RecordManager";

export const Route = createFileRoute("/admin/metrics")({ component: () => (
  <RecordManager
    table="impact_metrics"
    title="Impact metrics"
    description="Numbers shown on the home and impact pages."
    orderBy="sort_order"
    ascending
    fields={[
      { name: "label", label: "Label", required: true },
      { name: "value", label: "Value", type: "number" },
      { name: "unit", label: "Unit" },
      { name: "icon", label: "Icon key" },
      { name: "sort_order", label: "Sort order", type: "number" },
      { name: "is_published", label: "Published", type: "bool" },
    ]}
    listColumns={[
      { name: "label", label: "Label" },
      { name: "value", label: "Value" },
      { name: "unit", label: "Unit" },
      { name: "is_published", label: "Live" },
    ]}
  />
) });