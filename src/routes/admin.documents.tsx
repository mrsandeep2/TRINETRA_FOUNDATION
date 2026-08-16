import { createFileRoute } from "@tanstack/react-router";
import { RecordManager } from "@/components/admin/RecordManager";

export const Route = createFileRoute("/admin/documents")({ component: () => (
  <RecordManager
    table="documents"
    title="Documents"
    description="Registration, governance and transparency documents."
    fields={[
      { name: "title", label: "Title", required: true },
      { name: "category", label: "Category" },
      { name: "description", label: "Description", type: "textarea" },
      { name: "file_url", label: "File URL" },
      { name: "published_at", label: "Published on", type: "date" },
      { name: "is_published", label: "Published", type: "bool" },
    ]}
    listColumns={[
      { name: "title", label: "Title" },
      { name: "category", label: "Category" },
      { name: "published_at", label: "Date" },
      { name: "is_published", label: "Live" },
    ]}
  />
) });