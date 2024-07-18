import React from 'react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';

interface Props {
  quizTitle: string;
  setQuizTitle: (title: string) => void;
}

const QuizTitleInput: React.FC<Props> = ({ quizTitle, setQuizTitle }) => (
  <div>
    <Label htmlFor="quizTitle" className="text-sm font-medium text-gray-700 block mb-2">
      Quiz Title
    </Label>
    <Input
      value={quizTitle}
      onChange={(e) => setQuizTitle(e.target.value)}
      id="quizTitle"
      placeholder="Enter quiz title"
      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
  </div>
);

export default QuizTitleInput;
