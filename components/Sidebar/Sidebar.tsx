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
} from "lucide-react";
import SidebarItem from "./SidebarItem";
import useLocalStorage from "@/hooks/useLocalStorage";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useLocalStorage('sidebar', false)

  return (
    <div
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
      </nav>
    </div>
  );
};

export default Sidebar;