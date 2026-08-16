import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Logs | MockGen',
  description: 'View your request logs in MockGen.',
  alternates: { canonical: 'https://mockgen.com/logs' },
  openGraph: {
    title: 'Logs | MockGen',
    description: 'View your request logs in MockGen.',
    url: 'https://mockgen.com/logs',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Logs | MockGen',
    description: 'View your request logs in MockGen.',
  }
};

export default function LogsPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
