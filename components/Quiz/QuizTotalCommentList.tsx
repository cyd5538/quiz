import { QuizComment } from "@/types";
import React from "react";

interface Props {
  comments: QuizComment[]
}

const QuizTotalCommentList = ({comments}:Props) => {
  return (
    <div className="space-y-4 mb-4">
      {comments.map((comment) => (
        <div key={comment.id} className="p-3 rounded shadow w-full">
          <p className="text-sm">{comment.text}</p>
          <small className="text-gray-500 text-sm inline-block text-right w-full">
            {comment.createdAt.toDate().toLocaleString()} -
            {comment.authorEmail}
          </small>
        </div>
      ))}
    </div>
  );
};

export default QuizTotalCommentList;
