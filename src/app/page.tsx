'use client'

import {Card, CardContent, CardDescription, CardHeader, CardTitle} from "@/components/ui/card";
import {useEffect, useState} from "react";

export default function Home() {
  const [points, setPoints] = useState(0);

  useEffect(() => {
    // Simulate earning points
    const interval = setInterval(() => {
      setPoints((prevPoints) => prevPoints + 10);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-6xl font-bold">
          Welcome to <span className="text-primary">ShieldPoint</span>
        </h1>

        <p className="mt-3 text-2xl">
          Get rewarded for staying safe online!
        </p>

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
      </main>
    </div>
  );
}

