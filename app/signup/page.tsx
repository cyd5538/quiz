"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";
import userStore from "@/stores/userStore";

export default function Page() {
  const router = useRouter()
  const { toast } = useToast()
  const { user, setUser } = userStore()

  if(user) {
    router.push("/")
    return null;
  }
  
  const handleLogin = async (provider: any) => {
    try {
      const result = await signInWithPopup(auth, provider);
      setUser(result.user);
      toast({
        description: "성공적으로 로그인 되었습니다.",
      })
      router.push("/")
    } catch (error: any) {
      console.error("error: ", error);
    }
  };

  const handleGoogleLogin = () => handleLogin(new GoogleAuthProvider());
  const handleGithubLogin = () => handleLogin(new GithubAuthProvider());

 
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[300px] flex flex-col items-center justify-center min-h-screen">
        <CardHeader>
          <CardTitle>서비스 이용하기</CardTitle>
          <CardDescription>소셜 계정으로 간편하게 시작하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full bg-white hover:bg-gray-100"
              variant="outline"
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              <span className="w-36">Google로 계속하기</span>
            </Button>
            <Button
              onClick={handleGithubLogin}
              className="w-full bg-[#24292e] text-white hover:bg-[#24292e]/90"
            >
              <FaGithub className="mr-2 h-4 w-4" />
              <span className="w-36">GitHub로 계속하기</span>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}