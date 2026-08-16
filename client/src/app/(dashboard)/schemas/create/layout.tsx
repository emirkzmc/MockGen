import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Create Schema | MockGen',
  description: 'Define your data models and schemas in MockGen.',
  alternates: { canonical: 'https://mockgen.com/schemas/create' },
  openGraph: {
    title: 'Create Schema | MockGen',
    description: 'Define your data models and schemas in MockGen.',
    url: 'https://mockgen.com/schemas/create',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Create Schema | MockGen',
    description: 'Define your data models and schemas in MockGen.',
  }
};

export default function SchemaCreatePageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
