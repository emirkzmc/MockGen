import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Endpoints | MockGen',
  description: 'Manage and create API endpoints in MockGen.',
  alternates: { canonical: 'https://mockgen.com/endpoints' },
  openGraph: {
    title: 'Endpoints | MockGen',
    description: 'Manage and create API endpoints in MockGen.',
    url: 'https://mockgen.com/endpoints',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Endpoints | MockGen',
    description: 'Manage and create API endpoints in MockGen.',
  }
};

export default function EndpointsPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
