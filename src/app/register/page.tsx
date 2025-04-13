'use client';

import {useState} from 'react';
import {Button} from '@/components/ui/button';
import {Input} from '@/components/ui/input';
import {Card, CardContent, CardHeader, CardTitle} from '@/components/ui/card';
import {useRouter} from 'next/navigation';
import {useToast} from "@/hooks/use-toast";
import {Alert, AlertDescription} from "@/components/ui/alert";
import {Icons} from "@/components/icons";
import {ThemeProvider} from "next-themes";
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import {doc, setDoc, getFirestore} from 'firebase/firestore';
import {app} from '@/lib/firebase';
import {useForm} from "react-hook-form";

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [username, setUsername] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();
  const {toast} = useToast();
  const auth = getAuth(app);
  const db = getFirestore(app);

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: "Passwords do not match. Please try again.",
      });
      setIsLoading(false);
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      if (user) {
        await updateProfile(user, {
          displayName: username,
        });

        // Store additional user data in Firestore
        await setDoc(doc(db, "users", user.uid), {
          email: email,
          username: username,
          points: 0, // Initial points
        });

        localStorage.setItem('authToken', user.uid);
        toast({
          title: "Registration Successful",
          description: "Account created successfully. Redirecting to dashboard...",
        });
        router.push('/dashboard');
      } else {
        setError("Registration failed.");
        toast({
          variant: "destructive",
          title: "Registration Failed",
          description: "Failed to create account. Please try again.",
        });
      }
    } catch (e: any) {
      setError(e.message || "An unexpected error occurred");
      toast({
        variant: "destructive",
        title: "Registration Error",
        description: e.message || "Failed to create account.",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gradient-to-br from-blue-100 to-purple-100">
        <main className="flex flex-col items-center justify-center w-full flex-1 px-20 text-center">
          <Card className="w-full max-w-md p-8 rounded-2xl shadow-lg hover:shadow-xl transition duration-300">
            <CardHeader>
              <CardTitle className="text-3xl font-semibold text-gray-800">
                Create Account
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
                  type="email"
                  placeholder="Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 rounded-md shadow-sm"
                />
                <Input
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="border-gray-300 focus:ring-blue-500 focus:border-blue-500 transition-colors duration-300 rounded-md shadow-sm"
                />
                <Input
                  type="password"
                  placeholder="Confirm Password"
                  value={confirmPassword}
                  onChange={e => setConfirmPassword(e.target.value)}
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
                      Creating Account...
                    </>
                  ) : (
                    "Create Account"
                  )}
                </Button>
              </form>
              <Button
                variant="link"
                onClick={() => router.push('/login')}
                className="mt-4"
              >
                Already have an account?
              </Button>
            </CardContent>
          </Card>
        </main>
      </div>
    </ThemeProvider>
  );
};

export default RegisterPage;
