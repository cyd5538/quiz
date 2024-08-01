"use client";

import { useState } from "react";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Input } from "../ui/input";
import userStore from "@/stores/userStore";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useToast } from "../ui/use-toast";

interface Props {
  authorEmail: string;
  text: string;
  id: string;
  loadComments: (page: number) => Promise<void>;
  currentPage: number;
}

export function QuizTotalCommentUpdatebtn({
  authorEmail,
  text,
  id,
  loadComments,
  currentPage,
}: Props) {
  const [updateComment, setUpdateComment] = useState<string>(text);
  const { user } = userStore();
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleUpdate = async () => {
    if (user?.email !== authorEmail) return;

    setIsLoading(true);
    try {

      const commentRef = doc(db, "comments", id);
      await updateDoc(commentRef, {
        text: updateComment,
      });
      toast({
        title: "Update Complete",
      });
      await loadComments(currentPage);
      setIsOpen(false);
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Problem occurred while updating",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleOpenChange = (open: boolean) => {
    if (!isLoading) {
      setIsOpen(open);
    }
  };

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger asChild>
        <Button className="w-6 h-6" variant="outline">
          📝
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Please edit your comment.</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription>
          <Input
            value={updateComment}
            onChange={(e) => setUpdateComment(e.target.value)}
          />
        </AlertDialogDescription>
        <AlertDialogFooter>
          <Button onClick={handleUpdate} disabled={isLoading}>
            {isLoading ? "Updating..." : "Update"}
          </Button>
          <AlertDialogCancel disabled={isLoading}>Cancel</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
