import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Settings | MockGen',
  description: 'Manage your account and app settings in MockGen.',
  alternates: { canonical: 'https://mockgen.com/settings' },
  openGraph: {
    title: 'Settings | MockGen',
    description: 'Manage your account and app settings in MockGen.',
    url: 'https://mockgen.com/settings',
    siteName: 'MockGen',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Settings | MockGen',
    description: 'Manage your account and app settings in MockGen.',
  }
};

export default function SettingsPageLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
