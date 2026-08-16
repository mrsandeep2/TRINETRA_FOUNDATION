import { createFileRoute } from "@tanstack/react-router";
import { RecordManager } from "@/components/admin/RecordManager";

export const Route = createFileRoute("/admin/messages")({ component: () => (
  <RecordManager
    table="contact_messages"
    title="Messages"
    description="Enquiries from the contact page."
    fields={[{ name: "status", label: "Status", placeholder: "new / replied / closed" }]}
    listColumns={[
      { name: "full_name", label: "Name" },
      { name: "email", label: "Email" },
      { name: "subject", label: "Subject" },
      { name: "message", label: "Message" },
      { name: "status", label: "Status" },
      { name: "created_at", label: "Received" },
    ]}
  />
) });