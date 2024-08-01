import React from "react";
import userStore from "@/stores/userStore";
import { QuizComment } from "@/types";
import { QuizTotalCommentDelbtn } from "./QuizTotalCommentDelbtn";
import { QuizTotalCommentUpdatebtn } from "./QuizTotalCommentUpdatebtn";

interface Props {
  comment: QuizComment;
  loadComments: (page: number) => Promise<void>;
  currentPage: number;
}

const QuizTotalCommentListItem = ({
  comment,
  loadComments,
  currentPage,
}: Props) => {
  const { text, createdAt, authorEmail, id } = comment;
  const { user } = userStore();

  return (
    <div className="p-3 rounded shadow w-full">
      <p className="text-sm">{text}</p>
      <div className="flex justify-between items-center mt-4">
        {user && user.email === authorEmail ? (
          <div className="flex gap-2">
            <QuizTotalCommentDelbtn
              currentPage={currentPage}
              id={id}
              authorEmail={authorEmail}
              loadComments={loadComments}
            />
            <QuizTotalCommentUpdatebtn
              text={text}
              id={id}
              authorEmail={authorEmail}
              loadComments={loadComments}
              currentPage={currentPage}
            />
          </div>
        ) : null}
        <small className="text-gray-500 text-sm inline-block text-right w-full">
          {createdAt.toDate().toLocaleString()} - {authorEmail}
        </small>
      </div>
    </div>
  );
};

export default QuizTotalCommentListItem;
