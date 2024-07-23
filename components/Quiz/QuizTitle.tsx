import React from "react";

interface Props {
  currentQuestionIndex: number;
  question: string;
  questionEng: string
}

const QuizTitle = ({currentQuestionIndex, question, questionEng}: Props) => {
  return (
    <div>
      <h2 className="sm:text-2xl text-base mt-4 py-5 bg-slate-800 text-white w-auto">
        {`문제 ${currentQuestionIndex + 1} : ${question}`}
      </h2>
      <h2 className="sm:text-2xl text-base py-5 bg-slate-800 text-white w-auto">
        {`Question ${currentQuestionIndex + 1} : ${questionEng}`}
      </h2>
    </div>
  );
};

export default QuizTitle;

