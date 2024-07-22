"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button"; 
import { usePathname } from "next/navigation";

interface Props {
  icon: React.ReactNode;
  text: string;
  href: string | (() => Promise<void>);
  isOpen: boolean;
}

const SidebarItem = ({ icon, text, href, isOpen }: Props) => {
  const params = usePathname();
  const param = params.replace(/^\//, "");
  console.log(param, text)
  const commonClasses = `${param.toLowerCase() === text.toLowerCase() && "bg-white text-zinc-950"} flex items-center space-x-4 w-full px-6 py-4 rounded-xl hover:bg-zinc-900 hover:text-white ${
    !isOpen && "justify-center"
  }`;

  if (typeof href === 'string') {
    return (
      <Link href={href} className={commonClasses}>
        {icon}
        {isOpen && <span className="text-lg">{text}</span>}
      </Link>
    );
  } else {
    return (
      <button
        onClick={href}
        className={`${commonClasses} bg-transparent`}
      >
        {icon}
        {isOpen && <span className="text-lg">{text}</span>}
      </button>
    );
  }
};

export default SidebarItem;