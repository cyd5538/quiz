import { Dispatch, SetStateAction } from "react";
import { addDoc, collection, doc, increment, serverTimestamp, updateDoc } from "firebase/firestore";
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
      // 새로운 'comments' 컬렉션에 댓글 추가
      const commentsRef = collection(db, "comments");
      await addDoc(commentsRef, {
        quizId: quiz.id,  // 퀴즈 ID 추가
        text: newComment,
        createdAt: serverTimestamp(),
        author: user.displayName,
        authorEmail: user.email,
        authorId: user.uid  // 사용자 ID 추가 (선택사항)
      });
  
      // 퀴즈 문서의 댓글 카운트 업데이트
      const quizRef = doc(db, "quizzes", quiz.id);
      await updateDoc(quizRef, {
        commentCount: increment(1)
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
