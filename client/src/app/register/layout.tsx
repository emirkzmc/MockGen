import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | MockGen',
  description: 'Create a MockGen account.',
  alternates: { canonical: 'https://mockgen.com/register' },
  openGraph: {
    title: 'Register | MockGen',
    description: 'Create a MockGen account.',
    url: 'https://mockgen.com/register',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Register | MockGen',
    description: 'Create a MockGen account.',
  }
};

export default function RegisterLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
