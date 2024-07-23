import { motion } from "framer-motion";
import { QuizQuestion } from "@/types";
import { useState } from "react";

import QuestionOptions from "./QuizOptions";
import QuizTitle from "./QuizTitle";
import QuizQuestionResult from "./QuizQuestionResult";

interface QuestionProps {
  question: QuizQuestion;
  currentQuestionIndex: number;
  handleAnswer: (answer: string) => void;
  handleNext: () => void;
  showExplanation: boolean;
  answered: boolean;
}

const Question = ({
  question,
  currentQuestionIndex,
  handleAnswer,
  handleNext,
  showExplanation,
  answered,
}: QuestionProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);

  const handleOptionClick = (option: string) => {
    setSelectedAnswer(option);
    handleAnswer(option);
  };

  return (
    <motion.div
      key={currentQuestionIndex}
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.5 }}
      className="px-2 mt-12"
    >
      <QuizTitle 
        currentQuestionIndex={currentQuestionIndex}
        question={question.question}
        questionEng={question.questionEng}
      />
      <QuestionOptions 
        question={question}
        handleOptionClick={handleOptionClick}
        answered={answered}
      />
      {showExplanation && (
        <QuizQuestionResult 
          correctAnswer={question.correctAnswer}
          explanation={question.explanation}
          explanationEng={question.explanationEng}
          handleNext={handleNext}
        />
      )}
    </motion.div>
  );
};

export default Question;
