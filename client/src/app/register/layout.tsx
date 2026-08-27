import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Register | MockGen',
  description: 'Create a MockGen account.',
  alternates: { canonical: 'https://mockgen.com.tr/register' },
  openGraph: {
    title: 'Register | MockGen',
    description: 'Create a new MockGen account to start building your mock APIs.',
    url: 'https://mockgen.com.tr/register',
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
