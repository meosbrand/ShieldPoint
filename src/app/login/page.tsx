'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // TODO: Implement actual authentication logic here
    // In a real application, you would send the username and password to your backend
    // and validate the credentials. If the credentials are valid, you would receive a token
    // that you would store in local storage or a cookie.
    if (username === 'user' && password === 'password') {
      // Simulate successful login
      localStorage.setItem('authToken', 'dummyToken');
      router.push('/dashboard');
    } else {
      alert('Invalid credentials');
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
        <Card className="w-full max-w-md hover:shadow-xl transition duration-300">
          <CardHeader>
            <CardTitle>Login</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
              <Input
                type="text"
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                className="hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
              <Input
                type="password"
                placeholder="Password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                className="hover:border-blue-500 focus:border-blue-500 transition-colors duration-300"
              />
              <Button type="submit" className="hover:bg-blue-700 transition-colors duration-300">Log In</Button>
            </form>
          </CardContent>
        </Card>
      </main>
    </div>
  );
};

export default LoginPage;
