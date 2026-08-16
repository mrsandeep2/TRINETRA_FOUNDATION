import { createFileRoute } from "@tanstack/react-router";
import { RecordManager } from "@/components/admin/RecordManager";

export const Route = createFileRoute("/admin/partners")({ component: () => (
  <RecordManager
    table="partner_inquiries"
    title="Partner inquiries"
    description="CSR, institutional and community partnership enquiries."
    fields={[{ name: "status", label: "Status", placeholder: "new / in discussion / signed" }]}
    listColumns={[
      { name: "organisation", label: "Organisation" },
      { name: "contact_person", label: "Contact" },
      { name: "email", label: "Email" },
      { name: "partnership_type", label: "Type" },
      { name: "status", label: "Status" },
      { name: "created_at", label: "Received" },
    ]}
  />
) });