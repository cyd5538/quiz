import userStore from "@/stores/userStore";
import { QuizComment } from "@/types";
import React from "react";
import QuizTotalCommentListItem from "./QuizTotalCommentListItem";

interface Props {
  comments: QuizComment[];
  loadComments: (page: number) => Promise<void>;
  currentPage: number;
}

const QuizTotalCommentList = ({ comments, currentPage, loadComments }: Props) => {
  return (
    <div className="space-y-4 mb-4">
      {comments.map((comment) => (
        <QuizTotalCommentListItem
          key={comment.id}
          comment={comment}
          loadComments={loadComments}
          currentPage={currentPage}
        />
      ))}
    </div>
  );
};

export default QuizTotalCommentList;
