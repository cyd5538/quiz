"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import userStore from "@/stores/userStore";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";
import { useState } from "react";

interface Props {
  authorEmail: string
  id: string
  loadComments: (page: number) => Promise<void>;
  currentPage: number;
}

export function QuizTotalCommentDelbtn({authorEmail, id, loadComments, currentPage}: Props) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isOpen, setIsOpen] = useState(false);
  const { user } = userStore();
  const { toast } = useToast()
  
  const handleDelete = async () => {
    if (user?.email !== authorEmail) return;
    setIsLoading(true);
    try {
      const commentRef = doc(db, "comments", id);
      await deleteDoc(commentRef);
      toast({
        title: "Delete Complete"
      })
      await loadComments(currentPage);
      setIsOpen(false);
    } catch (error) {
      toast({
        title: "Problem occurred while deleting"
      })
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-6 h-6" variant="outline">🗑️</Button> 
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you sure you want to delete your comment?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <Button onClick={handleDelete} disabled={isLoading}>
            {isLoading ? "Deleting..." : "Delete"}
          </Button>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
