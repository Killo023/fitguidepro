import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Oswald, Roboto } from 'next/font/google';

export const metadata: Metadata = {
  title: 'FitGuide Pro',
  description: 'Your personalized fitness and nutrition guide.',
};

const oswald = Oswald({
  subsets: ['latin'],
  variable: '--font-oswald',
  weight: ['400', '500', '600', '700'],
});

const roboto = Roboto({
  subsets: ['latin'],
  variable: '--font-roboto',
  weight: ['400', '500', '700'],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${oswald.variable} ${roboto.variable} font-body antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  );
}
