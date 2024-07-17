"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaGoogle, FaApple, FaGithub } from "react-icons/fa";

export default function Page() {
  const handleGoogleLogin = () => {};

  const handleAppleLogin = () => {};

  const handleGithubLogin = () => {};

  return (
    <div className="pl-[90px] flex items-center justify-center min-h-screen bg-gray-100">
      <Card className="w-[300px] flex flex-col tems-center justify-center min-h-screen">
        <CardHeader>
          <CardTitle>서비스 이용하기</CardTitle>
          <CardDescription>소셜 계정으로 간편하게 시작하세요.</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-4">
            <Button
              onClick={handleGoogleLogin}
              className="w-full  bg-white hover:bg-gray-100"
              variant="outline"
            >
              <FaGoogle className="mr-2 h-4 w-4" />
              <span className="w-36">Google로 계속하기</span>
            </Button>
            <Button
              onClick={handleAppleLogin}
              className="w-full bg-black text-white hover:bg-gray-800"
            >
              <FaApple className="mr-2 h-4 w-4" />
              <span className="w-36">Apple로 계속하기</span>{" "}
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
