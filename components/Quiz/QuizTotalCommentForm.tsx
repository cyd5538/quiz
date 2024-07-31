import { Dispatch, SetStateAction } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "@/lib/firebase";
import React from "react";
import userStore from "@/stores/userStore";
import { Quiz } from "@/types";
import { Input } from "../ui/input";

interface Props {
  newComment: string;
  setNewComment: Dispatch<SetStateAction<string>>;
  quiz: Quiz;
  loadComments: (page: number) => Promise<void>;
}

const QuizTotalCommentForm = ({
  newComment,
  setNewComment,
  quiz,
  loadComments,
}: Props) => {
  const { user } = userStore();
  const handleSubmitComment = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === "" || !quiz?.id || !user) return;

    try {
      const commentsRef = collection(db, "quizzes", quiz.id, "comments");
      await addDoc(commentsRef, {
        text: newComment,
        createdAt: new Date(),
        author: user.displayName,
        authorEmail: user.email,
      });
      setNewComment("");
      loadComments(1);
    } catch (error) {
      console.error("Error adding comment: ", error);
    }
  };
  return (
    <form
      onSubmit={handleSubmitComment}
      className="flex gap-2 justify-center items-center h-16"
    >
      <Input
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        className="w-full p-2 rounded h-12 border-2 border-black"
        placeholder="comment..."
      />
      <button
        type="submit"
        className="px-4 py-2 rounded-md border border-black bg-white text-black text-sm hover:shadow-[4px_4px_0px_0px_rgba(0,0,0)] transition duration-200"
      >
        Submit
      </button>
    </form>
  );
};

export default QuizTotalCommentForm;
