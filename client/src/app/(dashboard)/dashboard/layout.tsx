import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Dashboard | MockGen',
  description: 'Overview of your MockGen endpoints and recent requests.',
  alternates: { canonical: 'https://mockgen.com.tr/dashboard' },
  openGraph: {
    title: 'Dashboard | MockGen',
    description: 'Overview of your MockGen endpoints and recent requests.',
    url: 'https://mockgen.com.tr/dashboard',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Dashboard | MockGen',
    description: 'Overview of your MockGen endpoints and recent requests.',
  }
};

export default function DashboardPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
