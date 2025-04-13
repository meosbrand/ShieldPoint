'use client';

import {Avatar, AvatarFallback, AvatarImage} from '@/components/ui/avatar';
import {Button} from '@/components/ui/button';
import {Card, CardContent, CardDescription, CardHeader, CardTitle} from '@/components/ui/card';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {useEffect, useState} from 'react';
import {ThemeToggle} from '@/components/ui/theme-toggle';
import Link from 'next/link';
import {Alert, AlertDescription, AlertTitle} from '@/components/ui/alert';
import {Icons} from '@/components/icons';
import {useRouter} from 'next/navigation';
import {ThemeProvider} from 'next-themes';

export default function Dashboard() {
  const [points, setPoints] = useState(0);
  const [isNewUser, setIsNewUser] = useState(true); // Simulating a new user
  const router = useRouter();

  useEffect(() => {
    // Simulate earning points every 5 seconds
    const interval = setInterval(() => {
      setPoints(prevPoints => prevPoints + 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    router.push('/login');
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col items-center justify-start min-h-screen py-8">
        <div className="absolute top-4 right-4 flex items-center space-x-4">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon">
                <Avatar className="h-8 w-8 hover:scale-110 transition-transform duration-200">
                  <AvatarImage src="https://picsum.photos/50/50" alt="Profile" />
                  <AvatarFallback>SP</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>Profile</DropdownMenuItem>
              <DropdownMenuItem onClick={handleLogout}>Log Out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <ThemeToggle />
        </div>

        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          {isNewUser ? (
            <section className="max-w-2xl mb-8">
              <Alert variant="default">
                <Icons.shield className="h-6 w-6" />
                <AlertTitle>Welcome to ShieldPoint!</AlertTitle>
                <AlertDescription>
                  Thank you for installing ShieldPoint. Get started by exploring the features below.
                </AlertDescription>
              </Alert>
              <div className="mt-4">
                <p className="text-lg">
                  ShieldPoint helps you stay safe online by detecting and blocking potential threats.
                  Here's how it works:
                </p>
                <ul className="list-disc pl-5 mt-2">
                  <li>Real-time threat detection</li>
                  <li>AI-powered threat analysis</li>
                  <li>Rewards for safe browsing</li>
                </ul>
                <Link href="/analytics">
                  <Button className="mt-4 hover:shadow-md transition duration-300">
                    Start Exploring
                  </Button>
                </Link>
              </div>
            </section>
          ) : (
            <>
              <p className="text-2xl">Hello User,</p>
              <h1 className="text-6xl font-bold">
                Welcome to <span className="text-primary">ShieldPoint</span>
              </h1>

              <p className="mt-3 text-2xl">Get rewarded for staying safe online!</p>

              <div className="mt-6 flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
                <Card className="w-full md:w-1/3 p-4 hover:scale-105 transition-transform duration-300">
                  <CardHeader>
                    <CardTitle>Points Balance</CardTitle>
                    <CardDescription>Your current reward points</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-4xl font-bold text-accent">{points}</div>
                  </CardContent>
                </Card>
              </div>
              <div className="mt-4 space-x-4">
                <Link href="/analytics" className="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200">
                  View Analytics
                </Link>
                <Link href="/settings" className="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200">
                  Extension Settings
                </Link>
                <Link href="/about" className="text-blue-500 hover:underline hover:text-blue-700 transition-colors duration-200">
                  About ShieldPoint
                </Link>
              </div>
            </>
          )}
        </main>
      </div>
    </ThemeProvider>
  );
}
