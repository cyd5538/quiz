"use client";

import OauthSign from "@/components/Sign/OauthSign";
import Signin from "@/components/Sign/Signin";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100">
      <Card className="sm:w-[600px] w-full flex flex-col items-center justify-center min-h-screen">
        <CardHeader className="flex justify-start w-72 px-0 mb-4">
          <CardTitle className="text-4xl">Sign in</CardTitle>
        </CardHeader>
        <CardContent>
          <Signin />
          <OauthSign />
        </CardContent>
        <Link href="/signup">
          <p className="text-gray-500 underline hover:text-gray-700">Don&apos;t have an account?</p>
        </Link>
      </Card>
    </div>
  );
}