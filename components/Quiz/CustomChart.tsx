import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

interface QuizData {
  [key: string]: number;
}

interface Props {
  quizData: QuizData;
  quizNum: number;
}

export default function CustomBarChart({ quizData, quizNum }: Props) {
  function createQuizData(quizNum: number, quizData: QuizData) {
    const newData = [];
    
    for (let i = 0; i <= quizNum; i++) {
      const name = i.toString();
      let answer = 0;
      
      for (const value of Object.values(quizData)) {
        if (value === i) {
          answer++;
        }
      }
      
      newData.push({ name, answer });
    }
    
    return newData;
  }
  
  const result = createQuizData(quizNum, quizData);

  const maxAnswer = Math.max(...result.map(item => item.answer));

  return (
    <div className="flex justify-center w-full mt-4">
      <ResponsiveContainer width="90%" height={240}>
        <BarChart
          data={result}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis 
            tickFormatter={(value) => value === 0 ? '' : Math.floor(value).toString()}
            domain={[0, Math.ceil(maxAnswer)]}
            allowDecimals={false}
          />
          <Tooltip 
            formatter={(value: number) => [Math.floor(value), "Correct Answers"]}
          />
          <Bar dataKey="answer" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}