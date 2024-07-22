import React from "react";
import { Button } from "@/components/ui/button";
import { FaGoogle, FaGithub } from "react-icons/fa";
import { signInWithPopup, GoogleAuthProvider, GithubAuthProvider } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useRouter } from 'next/navigation'
import { useToast } from "@/components/ui/use-toast";
import userStore from "@/stores/userStore";

const OauthSign = () => {
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
    <div className="flex flex-col justify-start items-start gap-4 w-72">
      <Button
        onClick={handleGoogleLogin}
        className="w-full bg-white hover:bg-gray-100"
        variant="outline"
      >
        <FaGoogle className="mr-2 h-4 w-4" />
        <span className="w-16">Google</span>
      </Button>
      <Button
        onClick={handleGithubLogin}
        className="w-full bg-[#24292e] text-white hover:bg-[#24292e]/90"
      >
        <FaGithub className="mr-2 h-4 w-4" />
        <span className="w-16">GitHub</span>
      </Button>
    </div>
  );
};

export default OauthSign;
