"use client";

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '../ui/use-toast';

export default function Signin() {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!email || !password) {
      toast({
        title: "Please fill in all blanks"
      })
      return;
    }

    try {
      await signInWithEmailAndPassword(auth, email, password);
      toast({
        title: "Successfully signed in"
      });
    } catch (error: any) {
      switch (error.code) {
        case 'auth/user-not-found':
        case 'auth/wrong-password':
          toast({
            variant: "destructive",
            title: "Invalid email or password"
          });
          break;
        case 'auth/too-many-requests':
          toast({
            variant: "destructive",
            title: "Too many failed login attempts. Please try again later"
          });
          break;
        default:
          toast({
            variant: "destructive",
            title: "An error occurred while signing in"
          });
      }
    }
  };

  return (
    <form className='w-72 mb-2' onSubmit={handleSubmit}>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor="email" className="mb-2">Email address</Label>
        <Input 
          id="email" 
          placeholder="example@google.com"
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor="password" className="mb-2">Password</Label>
        <Input 
          id="password" 
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </LabelInputContainer>
      <Button type="submit" className="w-full group relative mt-8 bg-zinc-800 hover:bg-zinc-900">
        Sign in
        <BottomGradient />
      </Button>
    </form>
  );
}

const BottomGradient = () => {
  return (
    <>
      <span className="group-hover:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    <div className={cn("flex flex-col space-y-2 w-full", className)}>
      {children}
    </div>
  );
};