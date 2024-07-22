"use client";

import OauthSign from "@/components/Sign/OauthSign";
import Signup from "@/components/Sign/Signup";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100">
      <Card className="sm:w-[600px] w-full flex flex-col items-center justify-center min-h-screen">
        <CardHeader className="flex justify-start w-72 px-0 mb-4">
          <CardTitle className="text-4xl">Sign up</CardTitle>
        </CardHeader>
        <CardContent>
          <Signup />
          <OauthSign />
        </CardContent>
      </Card>
    </div>
  );
}