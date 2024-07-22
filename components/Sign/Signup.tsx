"use client";

import { useState } from 'react';
import { cn } from "@/lib/utils";
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { auth } from '@/lib/firebase';
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from '../ui/use-toast';

const db = getFirestore();

export default function Signup() {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please fill in the blanks"
      })
    }

    if(password !== confirmPassword) {
      toast({
        title: "Passwords do not match."
      })
    }

    try {
      const userSignup = await createUserWithEmailAndPassword(auth, email, password);
      const user = userSignup.user;

      await updateProfile(user, {
        displayName: name,
      });

      await setDoc(doc(db, "users", user.uid), {
        name: name,
        email: email,
        photoURL: ""
      });

      toast({
        title: "Sign up is complete."
      });
    } catch (error: any) {
      switch (error.code) {
        case 'auth/email-already-in-use':
          toast({
            variant: "destructive",
            title: "This email is already in use."
          });
          break;
        default:
          toast({
            variant: "destructive",
            title: "An error occurred while signing up."
          });
      }
    }
  };

  return (
    <form className='w-72 mb-2' onSubmit={handleSubmit}>
      <h2 className="text-2xl font-bold text-center text-gray-800 mb-4"></h2>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor="name" className="mb-2">name</Label>
        <Input 
          id="name" 
          placeholder="your name"
          type="text" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor="email" className="mb-2">email address</Label>
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
        <Label htmlFor="password" className="mb-2">password</Label>
        <Input 
          id="password" 
          placeholder="••••••••"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </LabelInputContainer>
      <LabelInputContainer className='mb-4'>
        <Label htmlFor="confirmpassword" className="mb-2">password confirm</Label>
        <Input
          id="confirmpassword"
          placeholder="••••••••"
          type="password"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
        />
      </LabelInputContainer>
        <Button type="submit" className="w-full group relative mt-8 bg-zinc-800 hover:bg-zinc-900">
          Sign up
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