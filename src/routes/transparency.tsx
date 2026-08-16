import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import {
  FileText,
  Search,
  ShieldCheck,
  Building,
  CheckCircle2,
  Mail,
  Download,
  ExternalLink,
  Sparkles,
  X,
  Phone,
} from "lucide-react";
import { PageHero } from "@/components/site/PageHero";
import { Reveal } from "@/components/site/Reveal";
import { documentsQuery } from "@/lib/queries";
import { org, images } from "@/lib/site";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/transparency")({
  head: () => ({
    meta: [
      { title: "Transparency & Legal Disclosures — Trinetra Foundation | Section 8 NGO Bihar" },
      {
        name: "description",
        content:
          "Public disclosures, Section 8 registration certificate, CIN U88900BR2026NPL084393, 80G tax exemption, 12A approvals, and financial audits for Trinetra Foundation.",
      },
      { property: "og:title", content: "Transparency & Legal Governance — Trinetra Foundation" },
      {
        property: "og:description",
        content: "Verified registration certificate, Section 8 compliance, 80G certificate, and audited filings.",
      },
      { property: "og:url", content: "https://trinetrafoundation.in/transparency" },
      { property: "og:image", content: "https://trinetrafoundation.in/trinetra-logo.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Legal Disclosures & Audits — Trinetra Foundation" },
      { name: "twitter:description", content: "100% public accountability with verified government registrations." },
    ],
    links: [{ rel: "canonical", href: "https://trinetrafoundation.in/transparency" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "AboutPage",
          name: "Trinetra Foundation Transparency & Legal Disclosures",
          url: "https://trinetrafoundation.in/transparency",
          mainEntity: {
            "@id": "https://trinetrafoundation.in/#organization",
          },
        }),
      },
    ],
  }),
  component: TransparencyPage,
});

const defaultDocs = [
  {
    id: "doc-1",
    title: "Certificate of Incorporation (CIN U88900BR2026NPL084393)",
    category: "Registration",
    description:
      "Official certificate issued by the Ministry of Corporate Affairs, Registrar of Companies, Central Registration Centre under Section 8 of the Companies Act, 2013.",
    published_at: "2026-01-15",
    type: "Certificate",
  },
  {
    id: "doc-2",
    title: "Memorandum & Articles of Association (MoA & AoA)",
    category: "Governance",
    description:
      "The foundational charter stating the 12 charitable non-profit objects, non-distribution of profit, and public governance rules of Trinetra Foundation.",
    published_at: "2026-01-20",
    type: "Charter",
  },
  {
    id: "doc-3",
    title: "Section 80G & 12A Tax Exemption Compliance Statement",
    category: "Tax Exemption",
    description:
      "Tax exemption and deduction compliance documentation under the Income Tax Act, 1961 for Indian donors and corporate CSR grants.",
    published_at: "2026-02-01",
    type: "Compliance",
  },
  {
    id: "doc-4",
    title: "Annual Governance & Programme Charter 2026",
    category: "Disclosures",
    description:
      "Published targets, verified ground distribution protocols, and accounting standard operating procedures for volunteer camps.",
    published_at: "2026-02-15",
    type: "Annual Report",
  },
];

const categories = ["All", "Registration", "Governance", "Tax Exemption", "Disclosures"];

function TransparencyPage() {
  const { data: dbDocs } = useQuery(documentsQuery);
  const [selectedCat, setSelectedCat] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [requestDoc, setRequestDoc] = useState<any | null>(null);
  const [reqEmail, setReqEmail] = useState("");
  const [reqName, setReqName] = useState("");

  const rawDocs = dbDocs && dbDocs.length > 0 ? dbDocs : defaultDocs;

  const filteredDocs = rawDocs.filter((doc: any) => {
    const matchesCat =
      selectedCat === "All" ||
      doc.category?.toLowerCase() === selectedCat.toLowerCase();

    const matchesSearch =
      searchQuery === "" ||
      doc.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.description?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doc.category?.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCat && matchesSearch;
  });

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reqEmail || !reqName) {
      toast.error("Please enter your name and email address.");
      return;
    }
    toast.success(`Request for "${requestDoc.title}" submitted. A certified copy will be sent to ${reqEmail}.`);
    setRequestDoc(null);
    setReqName("");
    setReqEmail("");
  };

  return (
    <>
      <PageHero
        eyebrow="Open Accountability"
        title="Ask us anything. We answer with documents."
        intro={`Trinetra Foundation is a Section 8 not-for-profit company, CIN ${org.cin}, with its registered office at ${org.address}, ${org.state}.`}
        image={images.hands}
      />

      <section className="relative z-10 -mt-16 pb-28">
        <div className="mx-auto max-w-5xl px-4 sm:px-6 lg:px-8">
          {/* Statutory Credentials Banner */}
          <div className="surface-lift mb-10 grid gap-6 bg-navy text-primary-foreground p-8 sm:p-10 shadow-2xl sm:grid-cols-3">
            <div className="border-b sm:border-b-0 sm:border-r border-white/15 pb-4 sm:pb-0 sm:pr-6">
              <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">
                Entity Legal Form
              </span>
              <h3 className="mt-1 font-display text-lg font-bold">Section 8 Not-For-Profit</h3>
              <p className="mt-1 text-xs text-white/75">Registered under Companies Act, 2013</p>
            </div>
            <div className="border-b sm:border-b-0 sm:border-r border-white/15 pb-4 sm:pb-0 sm:pr-6">
              <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">
                Corporate ID (CIN)
              </span>
              <h3 className="mt-1 font-mono text-base font-bold text-white">{org.cin}</h3>
              <p className="mt-1 text-xs text-white/75">Govt. of India MCA Registered</p>
            </div>
            <div>
              <span className="text-[10px] font-bold text-amber-400 tracking-widest uppercase">
                Registered Office
              </span>
              <h3 className="mt-1 text-xs font-semibold text-white leading-relaxed">{org.address}</h3>
              <p className="mt-1 text-xs text-white/75">{org.state}</p>
            </div>
          </div>

          {/* Search & Category Filter Dock */}
          <div className="surface-lift mb-8 bg-white/90 dark:bg-[#0c1424]/90 p-5 sm:p-6 shadow-xl backdrop-blur-2xl border border-white/70">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="relative w-full sm:w-72">
                <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <input
                  type="text"
                  placeholder="Search legal documents..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-full border border-border bg-background/80 pl-10 pr-4 py-2 text-xs sm:text-sm text-navy focus:outline-none focus:ring-2 focus:ring-primary/40"
                />
              </div>

              <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 scrollbar-none">
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCat(cat)}
                    className={cn(
                      "rounded-full px-3.5 py-1.5 text-xs font-semibold transition-all duration-200 shrink-0 cursor-pointer select-none",
                      selectedCat === cat
                        ? "bg-primary text-white shadow-md"
                        : "bg-accent/60 text-navy hover:bg-accent border border-border/50",
                    )}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Documents Container */}
          <div className="surface-lift bg-card p-6 sm:p-12 shadow-xl">
            <div className="flex items-center justify-between border-b border-border/70 pb-4 mb-6">
              <div>
                <h2 className="font-display text-2xl font-bold text-navy">Statutory Documents</h2>
                <p className="text-xs text-muted-foreground mt-0.5">
                  Verified filings, certificates and public disclosure records
                </p>
              </div>
              <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-bold text-emerald-600 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4" /> 100% Public Record
              </span>
            </div>

            <div className="divide-y divide-border/60">
              {filteredDocs.map((doc: any, i: number) => (
                <Reveal key={doc.id} delay={0.04 * i}>
                  <div className="flex flex-col gap-4 py-6 sm:flex-row sm:items-center sm:justify-between">
                    <div className="flex min-w-0 gap-4">
                      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary mt-0.5">
                        <FileText className="h-5 w-5" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex flex-wrap items-center gap-2">
                          <h3 className="font-display text-lg font-bold text-navy">{doc.title}</h3>
                          <span className="rounded-full bg-accent px-2.5 py-0.5 text-[10px] font-bold text-navy uppercase tracking-wider">
                            {doc.category}
                          </span>
                        </div>
                        <p className="mt-1 text-sm text-muted-foreground leading-relaxed">
                          {doc.description}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={() => setRequestDoc(doc)}
                      className="shrink-0 inline-flex items-center justify-center gap-1.5 rounded-full border border-primary/30 bg-primary/5 hover:bg-primary hover:text-white px-4 py-2 text-xs font-bold text-primary uppercase transition-colors cursor-pointer"
                    >
                      <Download className="h-3.5 w-3.5" /> Request Copy
                    </button>
                  </div>
                </Reveal>
              ))}
            </div>

            <div className="mt-10 rounded-2xl bg-secondary/15 p-5 border border-border/60 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
              <div>
                <p className="font-semibold text-navy">Direct Document Verification Office:</p>
                <p className="text-muted-foreground mt-0.5">
                  Official certified copies can also be requested at {org.email} or via phone at {org.phone}.
                </p>
              </div>
              <a
                href={`mailto:${org.email}?subject=Document%20Verification%20Request`}
                className="shrink-0 inline-flex items-center gap-1.5 rounded-full bg-navy px-5 py-2.5 font-bold text-white uppercase hover:scale-105 transition-transform"
              >
                <Mail className="h-3.5 w-3.5" /> Email Verification Desk
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* REQUEST DOCUMENT MODAL */}
      {requestDoc ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-navy/60 backdrop-blur-md animate-in fade-in duration-200">
          <div className="relative w-full max-w-md rounded-3xl border border-white/60 bg-white p-6 sm:p-8 shadow-2xl animate-in zoom-in-95 duration-200">
            <button
              type="button"
              onClick={() => setRequestDoc(null)}
              className="absolute top-5 right-5 h-8 w-8 flex items-center justify-center rounded-full bg-accent text-navy hover:bg-primary/20"
            >
              <X className="h-4 w-4" />
            </button>

            <div className="flex items-center gap-2 text-xs font-bold text-primary uppercase">
              <FileText className="h-4 w-4" /> Document Request
            </div>
            <h3 className="mt-2 font-display text-lg font-bold text-navy">
              {requestDoc.title}
            </h3>
            <p className="mt-1 text-xs text-muted-foreground">
              We will email a verified PDF copy directly to your inbox within 24 hours.
            </p>

            <form onSubmit={handleRequestSubmit} className="mt-5 space-y-3">
              <div>
                <label className="block text-xs font-bold text-navy">Your Name *</label>
                <input
                  type="text"
                  required
                  value={reqName}
                  onChange={(e) => setReqName(e.target.value)}
                  placeholder="Full name or organisation"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-navy focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-navy">Email Address *</label>
                <input
                  type="email"
                  required
                  value={reqEmail}
                  onChange={(e) => setReqEmail(e.target.value)}
                  placeholder="name@company.com"
                  className="mt-1 w-full rounded-xl border border-border bg-background px-3.5 py-2 text-sm text-navy focus:ring-2 focus:ring-primary/40 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="mt-4 w-full rounded-full bg-primary py-3 text-xs font-bold tracking-wider text-white uppercase shadow-md hover:scale-[1.02] transition-transform"
              >
                Send Verified Copy
              </button>
            </form>
          </div>
        </div>
      ) : null}
    </>
  );
}