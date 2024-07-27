import userStore from "@/stores/userStore";
import Image from "next/image";
import React from "react";

interface QuizData {
  [key: string]: number;
}

interface Props {
  quizData: QuizData;
  participantLen: number | null;
}

const QuizTotalUserResult = ({ quizData, participantLen }: Props) => {
  const { user } = userStore();
  const set = quizData[user?.displayName as string];

  return (
    <div>
      {user && (
        <div className="flex flex-col w-full justify-center items-center gap-2">
          <Image
            src={user.photoURL ? user.photoURL : "/baseprofile.png"}
            alt={user.displayName as string}
            width={200}
            height={200}
            className="w-24 h-24 sm:w-[200px] sm:h-[200px] rounded-full"
          />
          <p className="text-xl font-bold">{user.displayName}</p>
          <p className="text-base font-semibold text-red-400 text-center">
            I got <span className="font-bold underline text-xl">{set}</span> out of{" "}
            <span className="font-bold text-xl">{participantLen}</span>  questions correct.
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizTotalUserResult;
