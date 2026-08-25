import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Providers from "./providers";

const poppins = Poppins({
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://mockgen.com.tr"),
  title: {
    default: "MockGen | Free Dynamic Mock API & JSON Generator",
    template: "%s | MockGen",
  },
  description: "Build dynamic mock API endpoints in seconds. Define your data models and get realistic mock REST APIs without writing any backend code. A better alternative to json-server.",
  keywords: [
    "mock api", 
    "fake json", 
    "rest api generator", 
    "mock server", 
    "json server alternative", 
    "frontend mocking", 
    "mockgen", 
    "api prototyping"
  ],
  authors: [{ name: "MockGen" }],
  creator: "MockGen",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://mockgen.com.tr",
    title: "MockGen | Free Dynamic Mock API Generator",
    description: "Build dynamic mock API endpoints in seconds. Define your data models and get realistic mock REST APIs without writing any backend code.",
    siteName: "MockGen",
  },
  twitter: {
    card: "summary_large_image",
    title: "MockGen | Free Dynamic Mock API Generator",
    description: "Build dynamic mock API endpoints in seconds without any backend code.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      suppressHydrationWarning
      lang="en"
      className={`${poppins.variable} ${poppins.className} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
