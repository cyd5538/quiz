"use client";

import { useSearchParams } from "next/navigation";


export default function Page() {
  const searchParams = useSearchParams();
  const query = searchParams.get('q');

  return (
    <div className="flex items-center justify-center min-h-screen bg-zinc-100">
      {query}
    </div>
  );
}