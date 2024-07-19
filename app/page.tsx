"use client";

import HomeInfo from "@/components/Home/HomeInfo";
import HomeTabMenu from "@/components/Home/HomeTabMenu";
import QuizLists from "@/components/Home/QuiszLists";
import { useState } from "react";

export default function Home() {
  const [tabmenu, setTabMenu] = useState<string>("popularity")

  return (
    <div className="flex-1 mx-auto 2xl:w-[1440px] w-full ">
      <HomeInfo />
      <HomeTabMenu tabmenu={tabmenu} setTabMenu={setTabMenu}/>
      <QuizLists tabmenu={tabmenu} />
    </div>
  );
}