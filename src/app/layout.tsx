import type {Metadata} from 'next';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { Oswald, Roboto } from 'next/font/google';

export const metadata: Metadata = {
  title: 'FitGuide Pro - AI-Powered Fitness & Nutrition Guide | Personalized Workout & Meal Plans',
  description: 'Transform your fitness journey with AI-powered personalized workout plans and culturally diverse meal plans. Get custom nutrition guidance, track progress, and achieve your goals. Free fitness app with 7 cuisine-themed weekly meal plans, strength training, cardio, HIIT, and yoga workouts.',
  keywords: [
    'fitness app',
    'AI fitness coach',
    'personalized workout plans',
    'meal planning',
    'nutrition tracking',
    'weight loss',
    'muscle building',
    'fitness tracker',
    'diet plans',
    'workout routines',
    'healthy eating',
    'meal prep',
    'strength training',
    'cardio workouts',
    'HIIT training',
    'yoga exercises',
    'fitness goals',
    'health and wellness',
    'macro tracking',
    'calorie counting',
    'Mediterranean diet',
    'Asian cuisine',
    'vegan meals',
    'keto diet',
    'paleo diet',
  ],
  authors: [{ name: 'FitGuide Pro Team' }],
  creator: 'FitGuide Pro',
  publisher: 'FitGuide Pro',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://fitguidepro.vercel.app',
    title: 'FitGuide Pro - AI-Powered Fitness & Nutrition Guide',
    description: 'Transform your fitness journey with AI-powered personalized workout plans and culturally diverse meal plans. Free fitness app with custom nutrition guidance.',
    siteName: 'FitGuide Pro',
    images: [
      {
        url: '/logo.png',
        width: 1200,
        height: 630,
        alt: 'FitGuide Pro - AI Fitness & Nutrition App',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'FitGuide Pro - AI Fitness & Nutrition Guide',
    description: 'Transform your fitness with AI-powered workout & meal plans. 7 cuisine themes weekly, progress tracking, and personalized guidance.',
    images: ['/logo.png'],
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
  icons: {
    icon: '/logo.png',
    apple: '/logo.png',
  },
  manifest: '/manifest.json',
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
