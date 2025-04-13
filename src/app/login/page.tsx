'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';
import {useToast} from "@/hooks/use-toast";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Icons} from "@/components/icons";

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {toast} = useToast();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    // Simulate authentication process
    try {
      if (username === 'user' && password === 'password') {
        localStorage.setItem('authToken', 'dummyToken');
        toast({
          title: "Login Successful",
          description: "Redirecting to dashboard...",
        });
        router.push('/dashboard');
      } else {
        setError("Invalid username or password");
        toast({
          variant: "destructive",
          title: "Login Failed",
          description: "Invalid credentials. Please try again.",
        });
      }
    } catch (e: any) {
      setError("An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Login Error",
        description: e.message || "Failed to log in.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-blue-100 to-purple-100">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
          <CardHeader>
            <CardTitle className="text-3xl font-semibold text-gray-800">
              Log In
            </CardTitle>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert variant="destructive">
                <Icons.warning className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 rounded-md shadow-sm"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 rounded-md shadow-sm"
              />
              <Button
                type="submit"
                disabled={isLoading}
                className="bg-blue-500 text-white hover:bg-blue-700 transition-colors duration-300 rounded-md shadow-sm"
              >
                {isLoading ? (
                  <>
                    <Icons.loader className="mr-2 h-4 w-4 animate-spin" />
                    Logging in...
                  </>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
