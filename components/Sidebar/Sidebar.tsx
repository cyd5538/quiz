"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import {
  ChevronRight,
  ChevronLeft,
  Home,
  Settings,
  Pen,
  LayoutDashboard,
  User,
  LogIn,
  LogOut
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";
import userStore from "@/stores/userStore";
import { useRouter } from "next/navigation";
import { signOut } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useLocalStorage('sidebar', false)
  const { user,setUser } = userStore()
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      toast({
        description: "로그아웃되었습니다.",
      });
    
      router.push("/signup");
    } catch (error) {
      console.error("로그아웃 중 오류 발생:", error);
      toast({
        description: "로그아웃 중 오류가 발생했습니다.",
      });
    }
  };

  return (
    <header
      className={`fixed left-0 top-0 h-screen bg-purple-600 text-white transition-all duration-300 ${
        isOpen ? "w-[250px]" : "w-[90px]"
      }`}
    >
      <Button
        variant="ghost"
        className="absolute -right-4 top-4 bg-purple-900 text-white"
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <ChevronLeft /> : <ChevronRight />}
      </Button>
      <nav className="flex flex-col items-center justify-center ml-2 mr-2 space-y-4 pt-20">
        <SidebarItem
          icon={<Home size={24} />}
          text="Home"
          href="/"
          isOpen={isOpen}
        />
        {/* 로그인 했을 때 */}
        {user?.displayName && 
        <>
          <SidebarItem
            icon={<Pen size={24} />}
            text="Create"
            href="/create"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<LayoutDashboard size={24} />}
            text="Dashboard"
            href="/dashboard"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<User size={24} />}
            text="User"
            href="/user"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<Settings size={24} />}
            text="Settings"
            href="/settings"
            isOpen={isOpen}
          />
          <SidebarItem
            icon={<LogOut size={24} />}
            text="LogOut"
            href={handleLogout}
            isOpen={isOpen}
          />
        </>
        }

        {/* 로그인 안했을 때 */}
        {!user?.displayName && <>
          <SidebarItem
            icon={<LogIn size={24} />}
            text="Sign up"
            href="/signup"
            isOpen={isOpen}
          />
        </>
        }
      </nav>
    </header>
  );
};

export default Sidebar;