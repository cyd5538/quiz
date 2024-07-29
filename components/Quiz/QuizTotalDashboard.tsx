import React from "react";
import { BentoGrid, BentoGridItem } from "../ui/bento-grid";
import CustomBarChart from "./CustomChart";
import { Quiz } from "@/types";
import QuizTotalUserResult from "./QuizTotalUserResult";
import QuizTotalInCorrect from "./QuizTotalInCorrect";

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
      title: "The Power of Communication",
      description: "Understand the impact of effective communication in our lives.",
      header: <Skeleton />,
      className: "md:col-span-2",
    },
  ];

  return (
    <BentoGrid className="w-full mx-auto md:auto-rows-[20rem]">
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

const Skeleton = () => (
  <div className="flex flex-1 w-full h-full min-h-[6rem] rounded-xl dark:bg-dot-white/[0.2] bg-dot-black/[0.2] [mask-image:radial-gradient(ellipse_at_center,white,transparent)]  border border-transparent dark:border-white/[0.2] bg-neutral-100 dark:bg-black"></div>
);
