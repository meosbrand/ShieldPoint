'use client';

import Link from 'next/link';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';

const AboutPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <h1 className="text-4xl font-bold">About ShieldPoint</h1>
        <p className="mt-3 text-xl">Learn more about our mission to keep you safe online.</p>

        <div className="mt-6 w-full max-w-4xl">
          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Our Mission</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                ShieldPoint is dedicated to providing users with a secure and rewarding browsing
                experience. We use cutting-edge AI technology to detect and block potential
                threats, ensuring your data and privacy are protected.
              </p>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Key Features</CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="list-disc pl-5">
                <li>Real-time Threat Detection: Protection against phishing and malware.</li>
                <li>AI-Powered Analysis: Advanced scanning for malicious content.</li>
                <li>Points and Rewards: Earn points for safe browsing habits.</li>
                <li>Customizable Settings: Tailor the extension to your needs.</li>
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-4">
            <CardHeader>
              <CardTitle>Contact Us</CardTitle>
            </CardHeader>
            <CardContent>
              <p>
                If you have any questions or feedback, please don't hesitate to{' '}
                <a href="mailto:support@shieldpoint.com" className="text-blue-500 hover:underline">
                  contact us
                </a>
                .
              </p>
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

export default AboutPage;
