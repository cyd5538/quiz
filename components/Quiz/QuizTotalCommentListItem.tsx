import React from "react";
import userStore from "@/stores/userStore";
import { QuizComment } from "@/types";
import { QuizTotalCommentDelbtn } from "./QuizTotalCommentDelbtn";
import { doc, deleteDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

interface Props {
  comment: QuizComment;
  loadComments: (page: number) => Promise<void>;
  currentPage: number;
}

const QuizTotalCommentListItem = ({ comment, loadComments, currentPage }: Props) => {
  const { text, createdAt, authorEmail, id, quizId } = comment;
  const { user } = userStore();

  const handleDelete = async () => {
    if (user?.email !== authorEmail) return;

    try {
      const commentRef = doc(db, "comments", id);
      await deleteDoc(commentRef);

      loadComments(currentPage)
    } catch (error) {
      console.error("댓글 삭제 중 오류 발생:", error);
    }
  };

  return (
    <div className="p-3 rounded shadow w-full">
      <p className="text-sm">{text}</p>
      {user && user.email === authorEmail ? (
        <QuizTotalCommentDelbtn onClick={handleDelete} />
      ) : null}
      <small className="text-gray-500 text-sm inline-block text-right w-full">
        {createdAt.toDate().toLocaleString()} - {authorEmail}
      </small>
    </div>
  );
};

export default QuizTotalCommentListItem;