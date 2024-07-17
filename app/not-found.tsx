"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="flex flex-col gap-10 justify-center items-center w-full h-screen">
      <motion.div 
        initial={{ opacity: 0 }}
        style={{ y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0 }}
      >
        <h1 className="text-4xl font-semibold">404 - Page Not Found</h1>
      </motion.div>
      <motion.button 
        className="shadow-[inset_0_0_0_2px_#616467] text-black px-12 py-4 rounded-full tracking-widest uppercase font-bold bg-transparent hover:bg-[#616467] hover:text-white dark:text-neutral-200 transition duration-200"
        style={{ x: 100 }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1, x: 0  }}
        exit={{ opacity: 0 }}
      >
        <Link href={"/"}>Go Home</Link>
      </motion.button>
    </div>
  );
}
