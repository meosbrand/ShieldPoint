'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useEffect, useState} from 'react';
import {Button} from '@/components/ui/button';
import Link from 'next/link';

const AnalyticsPage = () => {
  const [browsingHistory, setBrowsingHistory] = useState([
    {id: 1, url: 'example.com', threatDetected: false},
    {id: 2, url: 'malicious.com', threatDetected: true},
  ]);

  useEffect(() => {
    // Simulate fetching browsing history and threat detection logs
    // In a real app, you would fetch this data from a database or API
    const fetchData = async () => {
      // Simulating an API call with a promise
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate network delay
      setBrowsingHistory([
        {id: 1, url: 'example.com', threatDetected: false},
        {id: 2, url: 'malicious.com', threatDetected: true},
        {id: 3, url: 'another-example.com', threatDetected: false},
      ]);
    };

    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">Analytics Dashboard</h1>
        <p className="mt-3 text-xl">Overview of your browsing activity and detected threats</p>

        <div className="mt-6 w-full max-w-4xl">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Browsing History</CardTitle>
            </CardHeader>
            <CardContent>
              <ul>
                {browsingHistory.map(item => (
                  <li key={item.id} className="py-2 border-b">
                    <span className="mr-2">{item.url}</span>
                    {item.threatDetected ? (
                      <span className="text-red-500">Threat Detected</span>
                    ) : (
                      <span className="text-green-500">No Threat</span>
                    )}
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>
        </div>
        <Link href="/" className="text-blue-500 hover:underline">
          Back to Home
        </Link>
      </main>
    </div>
  );
};

export default AnalyticsPage;
