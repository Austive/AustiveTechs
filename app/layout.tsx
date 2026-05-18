import type {Metadata} from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-sans' });

export const metadata: Metadata = {
  title: {
    default: 'Austive Technologies | Smart Software Solutions & App Development',
    template: '%s | Austive Technologies',
  },
  description: 'Austive Technologies builds custom loan management systems, dynamic web applications, and powerful business software solutions in South Africa. Transform your business with cutting-edge technology today.',
  keywords: ['Software Development', 'Loan Management Systems', 'Web Development', 'App Development', 'South Africa Tech', 'Business Software', 'Austive Technologies', 'IT Solutions'],
  authors: [{ name: 'Austive Technologies' }],
  creator: 'Austive Technologies',
  openGraph: {
    type: 'website',
    locale: 'en_ZA',
    url: 'https://austivetechs.co.za', // Update with actual domain
    title: 'Austive Technologies | Smart Software Solutions',
    description: 'We build custom software, web apps, and system solutions tailored for your business needs.',
    siteName: 'Austive Technologies',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Austive Technologies | Smart Software Solutions',
    description: 'We build custom software, web apps, and system solutions tailored for your business needs.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.variable} font-sans text-slate-800 antialiased bg-white`} suppressHydrationWarning>{children}</body>
    </html>
  );
}
