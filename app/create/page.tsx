"use client";

import Create from "@/components/Create/Create";
import userStore from "@/stores/userStore";
import { useRouter } from "next/navigation";

export default function Home() {
  const { user } = userStore();
  const router = useRouter();

  // if(!user) {
  //   router.push("/")
  //   return null;
  // }

  return (
    <div className="flex min-h-screen flex-col items-center justify-between pt-24">
      <Create />
    </div>
  );
}
