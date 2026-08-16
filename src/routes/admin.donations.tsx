import { createFileRoute } from "@tanstack/react-router";
import { RecordManager } from "@/components/admin/RecordManager";

export const Route = createFileRoute("/admin/donations")({ component: () => (
  <RecordManager
    table="donations"
    title="Donation intents"
    description="Pledges submitted from the donate page. Mark them received once funds are confirmed."
    fields={[
      { name: "status", label: "Status", placeholder: "pending / received / cancelled" },
      { name: "payment_reference", label: "Payment reference" },
    ]}
    listColumns={[
      { name: "donor_name", label: "Donor" },
      { name: "amount", label: "Amount" },
      { name: "frequency", label: "Frequency" },
      { name: "status", label: "Status" },
      { name: "payment_reference", label: "Reference" },
      { name: "created_at", label: "Received" },
    ]}
  />
) });