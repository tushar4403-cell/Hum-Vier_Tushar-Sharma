import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
});

export const metadata: Metadata = {
  title: 'Fixo — Reliable Local Services in Under 30 Minutes',
  description:
    'Connect with verified, trusted blue-collar workers for on-demand or scheduled home services. Transparent pricing, seamless booking.',
  keywords: ['home services', 'plumber', 'electrician', 'cleaner', 'on-demand', 'fixo'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <body className={`${inter.className} antialiased`}>{children}</body>
    </html>
  );
}
