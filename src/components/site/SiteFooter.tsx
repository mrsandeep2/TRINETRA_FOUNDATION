import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { org } from "@/lib/site";

const quickLinks = [
  { to: "/about", label: "About" },
  { to: "/work", label: "Our Work" },
  { to: "/donate", label: "Donate" },
  { to: "/volunteer", label: "Volunteer" },
  { to: "/transparency", label: "Transparency" },
  { to: "/contact", label: "Contact" },
];

const programLinks = [
  { to: "/work/education-and-literacy", label: "Education" },
  { to: "/work/healthcare", label: "Healthcare" },
  { to: "/work/livelihood", label: "Livelihood" },
  { to: "/work/environment", label: "Environment" },
  { to: "/work/animal-welfare", label: "Animal Welfare" },
  { to: "/work/human-rights", label: "Human Rights" },
];

const policyLinks = [
  { to: "/policies/privacy", label: "Privacy Policy" },
  { to: "/policies/terms", label: "Terms" },
  { to: "/policies/donation", label: "Donation Policy" },
  { to: "/policies/volunteer", label: "Volunteer Policy" },
];

export function SiteFooter() {
  return (
    <footer className="bg-navy text-primary-foreground">
      <div className="mx-auto max-w-7xl px-6 py-16 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_1fr_1fr_1.2fr]">
          <div>
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 rounded-2xl bg-white p-1 shadow-sm overflow-hidden flex items-center justify-center">
                <img src="/trinetra-logo.png" alt="Trinetra Foundation" className="h-full w-full object-contain" />
              </div>
              <div className="font-display text-lg tracking-[0.14em]">
                TRINETRA
                <span className="block text-[10px] tracking-[0.35em] text-gold font-semibold">FOUNDATION</span>
              </div>
            </div>
            <p className="mt-6 max-w-xs font-display text-xl leading-snug text-gold">
              Serving Humanity.
              <br />
              Empowering Communities.
            </p>
            <p className="mt-4 text-xs text-primary-foreground/60">CIN: {org.cin}</p>
          </div>

          <FooterColumn title="Quick Links" links={quickLinks} />
          <FooterColumn title="Programs" links={programLinks} />

          <div>
            <h3 className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">Contact</h3>
            <ul className="mt-5 space-y-4 text-sm text-primary-foreground/80">
              <li className="flex gap-3">
                <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`mailto:${org.email}`} className="break-all hover:text-gold">
                  {org.email}
                </a>
              </li>
              <li className="flex gap-3">
                <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <a href={`tel:${org.phone}`} className="hover:text-gold">
                  {org.phone}
                </a>
              </li>
              <li className="flex gap-3">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                <span>
                  Registered Office
                  <br />
                  {org.address}
                  <br />
                  {org.state}
                </span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-14 flex flex-col gap-4 border-t border-primary-foreground/15 pt-6 text-xs text-primary-foreground/60 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} TRINETRA FOUNDATION. All Rights Reserved.</p>
          <div className="flex flex-wrap gap-x-5 gap-y-2">
            {policyLinks.map((link) => (
              <Link key={link.to} to={link.to} className="hover:text-gold">
                {link.label}
              </Link>
            ))}
            <Link to="/auth" rel="nofollow" className="hover:text-gold">
              Team Login
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({ title, links }: { title: string; links: { to: string; label: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-semibold tracking-[0.28em] text-gold uppercase">{title}</h3>
      <ul className="mt-5 space-y-3 text-sm text-primary-foreground/80">
        {links.map((link) => (
          <li key={link.to}>
            <Link to={link.to} className="hover:text-gold">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}