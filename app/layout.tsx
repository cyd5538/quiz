import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar/Sidebar";
import { Toaster } from "@/components/ui/toaster";
import AuthStateManager from "@/components/AuthStateManager";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "QuizAI",
  description: "AI와 함께하는 Quiz 플랫폼",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) 
{
  return (
    <html lang="en">
      <body className={inter.className}>
        <Toaster />
        <AuthStateManager />
        <Sidebar />
        <div className="pl-[110px]">
          {children}
        </div>
      </body>
    </html>
  );
}
