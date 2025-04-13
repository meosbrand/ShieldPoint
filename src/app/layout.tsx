'use client';

import type {Metadata} from 'next';
import {Geist, Geist_Mono} from 'next/font/google';
import './globals.css';
import {useRouter} from 'next/navigation';
import {useEffect, useState} from 'react';
import {ThemeProvider} from 'next-themes';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

// export const metadata: Metadata = {
//   title: 'ShieldPoint',
//   description: 'Stay safe online with ShieldPoint',
// };

// Simulate authentication check
const isAuthenticated = () => {
  // Replace this with your actual authentication logic
  // Check for a token in local storage, cookies, etc.
  return localStorage.getItem('authToken') !== null;
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      if (!isAuthenticated()) {
        // Redirect to login only if not already on the login page
        if (router.pathname !== '/login') {
          router.push('/login');
        }
      } else {
        //If the user is already authenticated take them to the dashboard
        if (router.pathname === '/login' || router.pathname === '/') {
          router.push('/dashboard');
        }
      }
      setLoading(false);
    };

    checkAuth();
  }, [router]);

  // Show a loading indicator while checking authentication
  if (loading) {
    return (
      <html lang="en">
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
          <div>Loading...</div>
        </body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
