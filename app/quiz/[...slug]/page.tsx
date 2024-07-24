"use client";

import { useState, useEffect } from "react";
import { doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { Quiz } from "@/types";
import Question from "@/components/Quiz/Question";
import QuizResult from "@/components/Quiz/QuizTotal";
import userStore from "@/stores/userStore";
import { useToast } from "@/components/ui/use-toast";
import { Loading } from "@/components/ui/Loading";

interface Props {
  params: { slug: string[] };
}

export default function Home({ params }: Props) {
  const id = params.slug[0];
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [showExplanation, setShowExplanation] = useState(false);
  const [answered, setAnswered] = useState(false);

  const { user } = userStore();
  const { toast } = useToast();

  useEffect(() => {
    async function fetchQuiz() {
      try {
        const docRef = doc(db, "quizzes", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setQuiz({ id: docSnap.id, ...docSnap.data() } as Quiz);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchQuiz();
  }, [id]);

  // 이미 참여했으면 결과페이지로
  useEffect(() => {
    if (quiz?.results && quiz?.results.hasOwnProperty(user?.displayName as string)) {
      setShowResult(true);
    }
  }, [quiz]);

  const handleAnswer = (answer: string) => {
    const currentQuestion = quiz!.questions[currentQuestionIndex];
    const isCorrect = answer.slice(0,1) === currentQuestion.correctAnswer;
    if (isCorrect) {
      setScore((prevScore) => prevScore + 1);
    }

    setUserAnswers([...userAnswers, answer]);
    setShowExplanation(true);
    setAnswered(true);
  };

  const handleNext = () => {
    if (!answered) {
      toast({
        variant: "destructive",
        title: `문제를 먼저 풀어주세요.`,
      });
      return null;
    }

    if (currentQuestionIndex < quiz!.questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setShowExplanation(false);
      setAnswered(false);
    } else {
      setShowResult(true);
    }
  };

  if (loading) {
    return (
      <p className="w-full h-screen flex justify-center items-center">
        <Loading className="bg-white text-black">Loading...</Loading>;
      </p>
    );
  }

  return (
    <main className="flex-1 mx-auto 2xl:w-[1440px] w-full mt-32">
      <h1 className="sm:text-3xl text-xl font-semibold">{quiz?.title}</h1>
      {quiz && (
        <div>
          {!showResult ? (
            <Question
              question={quiz.questions[currentQuestionIndex]}
              currentQuestionIndex={currentQuestionIndex}
              handleAnswer={handleAnswer}
              handleNext={handleNext}
              showExplanation={showExplanation}
              answered={answered}
            />
          ) : (
            <QuizResult
              quiz={quiz}
              score={score}
              totalQuestions={quiz.questions.length}
            />
          )}
        </div>
      )}
    </main>
  );
}
