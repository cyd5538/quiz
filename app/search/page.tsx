"use client";

import { Suspense } from "react";
import { Loading } from "@/components/ui/Loading";
import SearchContent from "@/components/Search/SearchContent";  

export default function Page() {
  return (
    <Suspense fallback={<Loading className="bg-white text-black">Loading...</Loading>}>
      <SearchContent />
    </Suspense>
  );
}