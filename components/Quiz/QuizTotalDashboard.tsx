import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import CustomBarChart from "./CustomChart";
import { Quiz } from "@/types";
import QuizTotalUserResult from "./QuizTotalUserResult";
import QuizTotalInCorrect from "./QuizTotalInCorrect";
import QuizTotalComment from "./QuizTotalComment";

interface Props {
  quiz: Quiz;
}

export function QuizTotalDashboard({ quiz }: Props) {

  const items = [
    {
      title: `Problem Statistics Total ${quiz.participants.length} participants`,
      description: "These are the results of people who participated in the quiz.",
      header: <CustomBarChart quizData={quiz?.results} quizNum={quiz?.questions.length} />,
      className: "md:col-span-2",
    },
    {
      title: "User Quiz Results",
      description: "Here is your grade for this quiz",
      header: <QuizTotalUserResult quizData={quiz?.results} participantLen={quiz?.questions.length}/>,
      className: "md:col-span-1",
    },
    {
      title: "Incorrect Answers",
      description: "Collection of my wrong answers",
      header: <QuizTotalInCorrect id={quiz.id}/>,
      className: "md:col-span-1",
    },
    {
      title: "Comment",
      description: "Understand the impact of effective communication in our lives.",
      header: <QuizTotalComment quiz={quiz}/>,
      className: "md:col-span-2",
    },
  ];

  return (
    <BentoGrid className="w-full mx-auto md:auto-rows-[20rem] pb-12">
      {items.map((item, i) => (
        <BentoGridItem
          key={i}
          title={item.title}
          description={item.description}
          header={item.header}
          className={item.className}
        />
      ))}
    </BentoGrid>
  );
}
