import { createFileRoute } from "@tanstack/react-router";
import { RecordManager } from "@/components/admin/RecordManager";

export const Route = createFileRoute("/admin/volunteers")({ component: () => (
  <RecordManager
    table="volunteer_applications"
    title="Volunteer applications"
    description="Applications submitted from the volunteer page. Update status as you follow up."
    fields={[{ name: "status", label: "Status", placeholder: "new / contacted / onboarded" }]}
    listColumns={[
      { name: "full_name", label: "Name" },
      { name: "phone", label: "Phone" },
      { name: "city", label: "City" },
      { name: "interests", label: "Interests" },
      { name: "status", label: "Status" },
      { name: "created_at", label: "Received" },
    ]}
  />
) });