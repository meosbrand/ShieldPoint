'use client';

import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useState} from 'react';
import {Switch} from '@/components/ui/switch';
import Link from 'next/link';

const SettingsPage = () => {
  const [threatAnalysisEnabled, setThreatAnalysisEnabled] = useState(true);

  const handleThreatAnalysisToggle = () => {
    setThreatAnalysisEnabled(prev => !prev);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">Extension Settings</h1>
        <p className="mt-3 text-xl">Customize the behavior of ShieldPoint</p>

        <div className="mt-6 w-full max-w-md">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Threat Analysis</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-between">
              <span>Enable real-time threat analysis for browsing protection</span>
              <Switch checked={threatAnalysisEnabled} onCheckedChange={handleThreatAnalysisToggle} />
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

export default SettingsPage;
