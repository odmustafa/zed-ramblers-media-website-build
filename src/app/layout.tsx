import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Suspense } from "react";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs'
import { ConvexClientProvider } from "@/components/ConvexClientProvider";
import { ThemeProvider } from "@/components/ThemeProvider";
import { BackgroundOverlay } from "@/components/BackgroundOverlay";
import { MetadataJsonLd } from "@/components/MetadataJsonLd";
import { WebVitals } from "@/components/WebVitals";
import { GoogleAnalytics } from "@/components/GoogleAnalytics";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Ramblers Media - Professional Video Production | Dallas, TX",
  description: "Premier Dallas-based video production company specializing in corporate communications, government contracts, and professional filming services. Award-winning team with 15+ years experience.",
  keywords: "video production, corporate video, government contracts, Dallas, professional filming, media production, video services, commercial production, event videography",
  authors: [{ name: "Ramblers Media Team" }],
  creator: "Ramblers Media",
  publisher: "Ramblers Media",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ramblersmedia.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: "Ramblers Media - Professional Video Production | Dallas, TX",
    description: "Premier Dallas-based video production company specializing in corporate communications, government contracts, and professional filming services. Award-winning team with 15+ years experience.",
    url: process.env.NEXT_PUBLIC_SITE_URL || 'https://ramblersmedia.com',
    siteName: "Ramblers Media",
    images: [
      {
        url: "/ramblers-media-logo.svg",
        width: 1200,
        height: 630,
        alt: "Ramblers Media - Professional Video Production",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Ramblers Media - Professional Video Production | Dallas, TX",
    description: "Premier Dallas-based video production company specializing in corporate communications, government contracts, and professional filming services.",
    images: ["/ramblers-media-logo.svg"],
    creator: "@ramblersmedia",
  },
  robots: {
    index: true,
    follow: true,
    nocache: true,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const clerkPublishableKey = process.env.CLERK_PUBLISHABLE_KEY;

  const content = (
    <ConvexClientProvider>
      <ThemeProvider defaultTheme="system" storageKey="ramblers-theme">
        <html lang="en">
          <head>
            <link rel="icon" type="image/svg+xml" href="/rmb-icon.svg" />
            <MetadataJsonLd />
          </head>
          <body className={inter.className}>
            <BackgroundOverlay />
            {children}
            <WebVitals />
            <Suspense fallback={null}>
              <GoogleAnalytics measurementId="GA_MEASUREMENT_ID" />
            </Suspense>
          </body>
        </html>
      </ThemeProvider>
    </ConvexClientProvider>
  );

  if (clerkPublishableKey) {
    return (
      <ClerkProvider publishableKey={clerkPublishableKey}>
        {content}
      </ClerkProvider>
    );
  }

  return content;
}