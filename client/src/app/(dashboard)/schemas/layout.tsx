import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Schemas | MockGen',
  description: 'Manage your data schemas in MockGen.',
  alternates: { canonical: 'https://mockgen.com/schemas' },
  openGraph: {
    title: 'Schemas | MockGen',
    description: 'Manage your data schemas in MockGen.',
    url: 'https://mockgen.com/schemas',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Schemas | MockGen',
    description: 'Manage your data schemas in MockGen.',
  }
};

export default function SchemasPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
