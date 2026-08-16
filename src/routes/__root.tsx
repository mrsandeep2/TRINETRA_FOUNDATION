import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import type { ReactNode } from "react";

import appCss from "../styles.css?url";
import { SiteHeader } from "../components/site/SiteHeader";
import { SiteFooter } from "../components/site/SiteFooter";
import { ScrollProgress } from "../components/site/ScrollProgress";
import { Toaster } from "../components/ui/sonner";
import { SiteLoadingScreen, PageInitialLoader } from "../components/site/SiteLoadingScreen";

function RootPendingComponent() {
  return <SiteLoadingScreen />;
}

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-bold text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold text-foreground">Page not found</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <div className="mt-6">
          <Link
            to="/"
            className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
          >
            Go home
          </Link>
        </div>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  return (
    <SiteLoadingScreen
      hasError={true}
      onRetry={() => {
        router.invalidate();
        reset();
      }}
    />
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Trinetra Foundation — Serving Humanity, Empowering Communities" },
      {
        name: "description",
        content:
          "Trinetra Foundation is a registered Section 8 non-profit in Forbesganj, Araria, Bihar working across education, food security, health care, livelihoods, environmental afforestation and animal welfare.",
      },
      {
        name: "keywords",
        content:
          "Trinetra Foundation, NGO Bihar, NGO Forbesganj, 80G Tax Exemption NGO, Donate for Education, Food Relief Bihar, Animal Welfare Gaushala, Health Camps Araria",
      },
      { name: "author", content: "Trinetra Foundation" },
      { name: "theme-color", content: "#ea580c" },
      { name: "robots", content: "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" },
      { property: "og:type", content: "non_profit" },
      { property: "og:site_name", content: "Trinetra Foundation" },
      { property: "og:locale", content: "en_IN" },
      { property: "og:title", content: "Trinetra Foundation — Serving Humanity, Empowering Communities" },
      {
        property: "og:description",
        content:
          "Trinetra Foundation is a Section 8 non-profit organisation registered in Forbesganj, Bihar working across 12 welfare sectors with verified ground audits.",
      },
      { property: "og:url", content: "https://trinetrafoundation.org/" },
      { property: "og:image", content: "https://trinetrafoundation.org/trinetra-logo.png" },
      { property: "og:image:alt", content: "Trinetra Foundation Official Emblem" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:site", content: "@TrinetraNGO" },
      { name: "twitter:title", content: "Trinetra Foundation — Serving Humanity, Empowering Communities" },
      {
        name: "twitter:description",
        content: "Registered Section 8 NGO in Bihar empowering lives through education, healthcare, nutrition & environmental action.",
      },
      { name: "twitter:image", content: "https://trinetrafoundation.org/trinetra-logo.png" },
    ],
    links: [
      { rel: "canonical", href: "https://trinetrafoundation.org/" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "dns-prefetch", href: "https://fonts.googleapis.com" },
      { rel: "dns-prefetch", href: "https://fonts.gstatic.com" },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: appCss,
      },
      { rel: "icon", href: "/favicon.png", type: "image/png" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,600;9..144,700&family=Manrope:wght@400;600;700&display=swap",
      },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "NGO",
              "@id": "https://trinetrafoundation.org/#organization",
              name: "Trinetra Foundation",
              alternateName: ["Trinetra NGO", "Trinetra Foundation Bihar"],
              url: "https://trinetrafoundation.org",
              logo: "https://trinetrafoundation.org/trinetra-logo.png",
              image: "https://trinetrafoundation.org/trinetra-logo.png",
              description:
                "Trinetra Foundation is a Section 8 non-profit company registered under the Companies Act, 2013 in Forbesganj, Araria, Bihar, dedicated to human, animal, and environmental welfare.",
              taxID: "U88900BR2026NPL084393",
              nonprofitStatus: "Nonprofit501c3",
              foundingDate: "2026",
              founder: [
                {
                  "@type": "Person",
                  name: "Er. Abhishek Kumar Singh",
                  jobTitle: "Founder & Director",
                },
                {
                  "@type": "Person",
                  name: "Er. Abhinash Sahu",
                  jobTitle: "Co-Founder & Trustee",
                },
              ],
              address: {
                "@type": "PostalAddress",
                streetAddress: "TV Centre, Block Road, Forbesganj",
                addressLocality: "Forbesganj",
                addressRegion: "Bihar",
                postalCode: "854318",
                addressCountry: "IN",
              },
              contactPoint: {
                "@type": "ContactPoint",
                telephone: "+91-7562891937",
                contactType: "Customer Support",
                areaServed: "IN",
                availableLanguage: ["en", "hi"],
                email: "trinetrafoundationofficially@gmail.com",
              },
              sameAs: [
                "https://facebook.com/trinetrafoundation",
                "https://instagram.com/trinetrafoundation",
                "https://twitter.com/trinetra_org",
                "https://linkedin.com/company/trinetrafoundation",
              ],
            },
            {
              "@type": "WebSite",
              "@id": "https://trinetrafoundation.org/#website",
              url: "https://trinetrafoundation.org",
              name: "Trinetra Foundation",
              publisher: {
                "@id": "https://trinetrafoundation.org/#organization",
              },
              inLanguage: "en-IN",
            },
          ],
        }),
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  pendingComponent: RootPendingComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className="w-full max-w-full overflow-x-clip">
      <head>
        <HeadContent />
      </head>
      <body className="w-full max-w-full overflow-x-clip">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  return (
    <QueryClientProvider client={queryClient}>
      <PageInitialLoader minDisplayMs={1300} />
      <ScrollProgress />
      <div className="flex min-h-screen flex-col w-full max-w-full overflow-x-clip">
        <SiteHeader />
        <main className="flex-1 w-full max-w-full overflow-x-clip">
          {/* Required: nested routes render here. Removing <Outlet /> breaks all child routes. */}
          <Outlet />
        </main>
        <SiteFooter />
      </div>
      <Toaster />
    </QueryClientProvider>
  );
}
