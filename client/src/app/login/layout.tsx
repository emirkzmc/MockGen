import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Login | MockGen',
  description: 'Login to your MockGen account to manage your mock APIs.',
  alternates: { canonical: 'https://mockgen.com.tr/login' },
  openGraph: {
    title: 'Login | MockGen',
    description: 'Login to your MockGen account to manage your mock APIs.',
    url: 'https://mockgen.com.tr/login',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Login | MockGen',
    description: 'Login to your MockGen account to manage your mock APIs.',
  }
};

export default function LoginLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
