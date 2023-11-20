import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'CampusPulse',
  description: 'CampusPulse is the go-to platform for all your college events. Discover, register, and participate in a wide range of campus events with ease. Stay updated, stay engaged, and never miss out on campus fun!',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
