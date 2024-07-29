import React, { useEffect, useState } from "react";
import userStore from "@/stores/userStore";
import { db } from "@/lib/firebase";
import { collection, query, where, getDocs } from "firebase/firestore";
import { QuizQuestion, QuizResult } from "@/types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

interface Props {
  id: string;
}

const QuizTotalInCorrect = ({ id }: Props) => {
  const { user } = userStore();
  const [incorrectQuestions, setIncorrectQuestions] = useState<QuizQuestion[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizResults = async () => {
      if (!user?.email) {
        setError("User email not available");
        setLoading(false);
        return;
      }

      try {
        const quizResultsRef = collection(db, "quizResults");
        const q = query(
          quizResultsRef,
          where("quizId", "==", id),
          where("userEmail", "==", user.email)
        );
        const querySnapshot = await getDocs(q);
        let allIncorrectQuestions: QuizQuestion[] = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data() as QuizResult;
          const incorrect = data.question.filter(
            (q) => q.userAnswer !== q.correctAnswer
          );
          allIncorrectQuestions = [...allIncorrectQuestions, ...incorrect];
        });

        setIncorrectQuestions(allIncorrectQuestions);
      } catch (err) {
        console.error(err);
        setError("An error occurred. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizResults();
  }, [id, user?.email]);

  if (loading) {
    return (
      <div className="w-full h-full flex justify-center items-center">
        Loading...
      </div>
    );
  }

  if (error) {
    return <div>Error is occurred</div>;
  }

  return (
    <div className="w-full h-full p-4 flex justify-center items-center">
      {incorrectQuestions.length > 0 ? (
        <div className="w-full">
          <Carousel className="w-full h-full">
            <CarouselContent className="h-full">
              {incorrectQuestions.map((question, index) => (
                <CarouselItem key={index} className="h-[100%] flex items-center justify-center">
                  <div className="w-[90%] h-[100%] overflow-y-auto overflow-x-hidden rounded-lg shadow p-6 bg-white">
                    <div className="mb-4">
                      <h3 className="font-semibold mb-2">{question.question}</h3>
                      <h3 className="font-semibold mb-2">{question.questionEng}</h3>
                    </div>
                    <p className="mb-2">Your answer <span className="text-red-600 font-bold">{question.userAnswer}</span></p>
                    <div className="mt-4">
                      <p className="font-medium mb-2">Explanation</p>
                      <p className="mb-2">{question.explanation}</p>
                      <p>{question.explanationEng}</p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      ) : (
        <p>No incorrect answers found. / 틀린 답변이 없습니다.</p>
      )}
    </div>
  );
};

export default QuizTotalInCorrect;