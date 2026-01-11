import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'QR Code Generator | Free & Instant',
  description: 'Generate QR codes instantly for any URL or text. Free, fast, and easy to use.',
  keywords: 'QR code, generator, free, URL, barcode',
  openGraph: {
    title: 'QR Code Generator | Free & Instant',
    description: 'Generate QR codes instantly for any URL or text.',
    type: 'website',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
