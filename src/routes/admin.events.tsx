import { createFileRoute } from "@tanstack/react-router";
import { RecordManager } from "@/components/admin/RecordManager";

export const Route = createFileRoute("/admin/events")({ component: () => (
  <RecordManager
    table="events"
    title="Events"
    description="Camps, drives and community programmes."
    orderBy="starts_at"
    ascending
    fields={[
      { name: "title", label: "Title", required: true },
      { name: "slug", label: "Slug", required: true },
      { name: "description", label: "Description", type: "textarea" },
      { name: "location", label: "Location" },
      { name: "image_url", label: "Image URL" },
      { name: "starts_at", label: "Starts at", type: "datetime", required: true },
      { name: "ends_at", label: "Ends at", type: "datetime" },
      { name: "is_published", label: "Published", type: "bool" },
    ]}
    listColumns={[
      { name: "title", label: "Title" },
      { name: "location", label: "Location" },
      { name: "starts_at", label: "Starts" },
      { name: "is_published", label: "Live" },
    ]}
  />
) });