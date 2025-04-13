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

export default function Home() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Simulate earning points
    const interval = setInterval(() => {
      setPoints(prevPoints => prevPoints + 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <div className="absolute top-4 right-4 flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon">
              <Avatar className="h-8 w-8">
                <AvatarImage src="https://picsum.photos/50/50" alt="Profile" />
                <AvatarFallback>SP</AvatarFallback>
              </Avatar>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem>Profile</DropdownMenuItem>
            <DropdownMenuItem>Log Out</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        <ThemeToggle />
      </div>
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <p className="text-2xl">Hello User,</p>
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-primary">ShieldPoint</span>
        </h1>

        <p className="mt-3 text-2xl">Get rewarded for staying safe online!</p>

        <div className="mt-6 flex flex-wrap items-center justify-around max-w-4xl sm:w-full">
          <Card className="w-full md:w-1/3 p-4">
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
          <Link href="/analytics" className="text-blue-500 hover:underline">
            View Analytics
          </Link>
          <Link href="/settings" className="text-blue-500 hover:underline">
            Extension Settings
          </Link>
        </div>
      </main>
    </div>
  );
}
