import type { Metadata } from "next";
import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import { site } from "@/lib/site";
import { Analytics } from "@/components/analytics";
import { UtmCapture } from "@/components/utm-capture";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  variable: "--font-cormorant",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  style: ["normal", "italic"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Goa Luxury Investor Showcase | Think Reality x Luxofy Properties",
    template: "%s | Goa Luxury Investor Showcase",
  },
  description:
    "An invite-only investor showcase in Delhi NCR on 9 August 2026. Discover premium villa and apartment investments in Goa with curated projects, market research and one-on-one advisory from Think Reality and Luxofy Properties.",
  keywords: [
    "Goa property investment",
    "luxury villas Goa",
    "Goa real estate event",
    "Think Reality",
    "Luxofy Properties",
    "investor showcase Delhi NCR",
  ],
  openGraph: {
    type: "website",
    url: site.url,
    siteName: site.name,
    title: "Goa Luxury Investor Showcase | 9 August 2026, Delhi NCR",
    description:
      "Discover premium investment opportunities in Goa. Curated projects, market research and private consultations. Invite only, limited seats.",
    locale: "en_IN",
  },
  twitter: {
    card: "summary_large_image",
    title: "Goa Luxury Investor Showcase | 9 August 2026, Delhi NCR",
    description:
      "Discover premium investment opportunities in Goa. Invite only, limited seats.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dmSans.variable} h-full antialiased overflow-x-hidden`}
    >
      <body className="flex min-h-full flex-col overflow-x-hidden">
        {children}
        <UtmCapture />
        <Analytics />
      </body>
    </html>
  );
}
