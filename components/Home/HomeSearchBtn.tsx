"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "@/components/ui/animated-modal";
import { Search, SearchCheckIcon } from "lucide-react";
import { Input } from "../ui/input";
import { useRouter } from 'next/navigation';

export function HomeSearchBtn() {
  const [search, setSearch] = useState<string>("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/search?q=${encodeURIComponent(search)}`);
    }
  };

  return (
    <div className="flex items-center justify-center">
      <Modal>
        <ModalTrigger className="bg-black dark:bg-white dark:text-black text-white flex justify-center group/modal-btn">
          <span className="group-hover/modal-btn:translate-x-40 text-center transition duration-500">
            Search Quiz!
          </span>
          <div className="-translate-x-40 group-hover/modal-btn:translate-x-0 flex items-center justify-center absolute inset-0 transition duration-500 text-white z-20">
            <Search size={24}/>
          </div>
        </ModalTrigger>
        <ModalBody>
          <form onSubmit={handleSubmit}>
            <ModalContent>
              <h4 className="text-lg md:text-2xl text-neutral-600 dark:text-neutral-100 font-bold text-center mb-8 flex gap-2 justify-center items-center">
                Search for Quiz{" "}
                <SearchCheckIcon size={32}/> 
              </h4>
              <div className="py-16 flex flex-wrap items-start justify-start max-w-lg mx-auto ">
                <div className="relative">
                  <Input 
                    className="border border-black font-semibold w-full pl-8" 
                    value={search} 
                    onChange={(e) => setSearch(e.target.value)}
                  />
                  <Search className="absolute top-[12px] left-2" size={18}/>
                </div>
              </div>
            </ModalContent>
            <ModalFooter className="gap-4">
              <button 
                type="submit"
                className="bg-black text-white dark:bg-white dark:text-black text-sm px-2 py-2 rounded-md border border-black w-28"
              >
                Search Now
              </button>
            </ModalFooter>
          </form>
        </ModalBody>
      </Modal>
    </div>
  );
}