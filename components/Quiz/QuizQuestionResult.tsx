import React from "react";
import { motion } from "framer-motion";

interface Props {
  correctAnswer: string
  explanation: string
  explanationEng: string
  handleNext: () => void;
}

const QuizQuestionResult = ({correctAnswer, explanation, explanationEng, handleNext}: Props) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="mt-4 p-4 rounded-md border border-black"
    >
      <p className="sm:text-2xl text-base text-slate-900 font-bold">
        {correctAnswer}
      </p>
      <p className="sm:text-base mt-2 mb-2 text-sm text-slate-500 font-semibold">
        {explanation}
      </p>
      <p className="sm:text-base mt-2 mb-2 text-sm text-slate-500 font-semibold">
        {explanationEng}
      </p>
      <div className="flex justify-end">
        <button
          onClick={handleNext}
          className="px-8 py-2 rounded-md bg-slate-800 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500"
        >
          다음
        </button>
      </div>
    </motion.div>
  );
};

export default QuizQuestionResult;
