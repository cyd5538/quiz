import React from 'react';
import { motion } from 'framer-motion';
import { QuizQuestion } from '@/types';

interface Props {
  question: {
    options: string[]
    optionsEng: string[]
  }
  answered: boolean;
  handleOptionClick: (option: string) => void;
}

const QuestionOptions = ({ question, handleOptionClick, answered }: Props) => {
  const combinedOptions = question.options.map((option, index) => ({
    korean: option,
    english: question.optionsEng[index]
  }));

  return (
    <div className="flex flex-col justify-center items-center mt-12 gap-6">
      {combinedOptions.map((option, index) => (
        <div key={index} className="w-full flex flex-col sm:flex-row gap-2">
          <motion.button
            onClick={() => handleOptionClick(option.korean)}
            disabled={answered}
            className={`w-full h-28 py-2 px-4 sm:text-2xl text-base border rounded-md hover:bg-slate-900 hover:text-white`}
          >
            {option.korean}
            <br></br>
            {option.english}
          </motion.button>
        </div>
      ))}
    </div>
  );
};

export default QuestionOptions;