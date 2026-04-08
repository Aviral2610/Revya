import "./globals.css";
import { Providers } from "./providers";

import { brand } from "@/lib/site-data";
import { SITE_DESCRIPTION, SITE_ORIGIN, SITE_TITLE, SOCIAL_IMAGE_ALT, absoluteUrl } from "@/lib/seo";

export const metadata = {
  metadataBase: SITE_ORIGIN,
  applicationName: brand.name,
  title: SITE_TITLE,
  description: SITE_DESCRIPTION,
  keywords: [
    "Revya",
    "online weight loss program",
    "clinician guided weight loss",
    "GLP-1 telehealth",
    "medical weight loss online",
    "weight loss assessment"
  ],
  category: "healthcare",
  alternates: {
    canonical: "/"
  },
  icons: {
    apple: "/apple-icon",
    icon: "/apple-icon"
  },
  robots: {
    index: true,
    follow: true
  },
  openGraph: {
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    url: "/",
    siteName: brand.name,
    type: "website",
    images: [
      {
        url: absoluteUrl("/opengraph-image"),
        width: 1200,
        height: 630,
        alt: SOCIAL_IMAGE_ALT
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: SITE_TITLE,
    description: SITE_DESCRIPTION,
    images: [absoluteUrl("/twitter-image")]
  }
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#17201a"
};

export default function RootLayout({ children }) {
  return (
    <html lang="en-US">
      <head>
        <meta charSet="utf-8" />
      </head>
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
