import { useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import userStore from "@/stores/userStore";
import { Quiz } from "@/types";
import { arrayUnion, doc, updateDoc, getDoc, FieldValue } from "firebase/firestore";
import { QuizTotalDashboard } from "./QuizTotalDashboard";
import { Loading } from "@/components/ui/Loading";

interface Props {
  quiz: Quiz;
  score: number;
  totalQuestions: number;
}

type UpdateData = {
  participants: FieldValue;
  viewCount: number;
  results?: { [key: string]: number };
};

const QuizTotalResult = ({ quiz, score, totalQuestions }: Props) => {
  const { user } = userStore();
  const [loading, setLoading] = useState(true);
  const [updatedQuiz, setUpdatedQuiz] = useState<Quiz | null>(null);

  const updateQuizData = async () => {
    if (quiz && user?.email) {
      const quizRef = doc(db, "quizzes", quiz.id);
      
      try {
        // 현재 퀴즈 데이터 가져오기
        const quizSnap = await getDoc(quizRef);
        if (quizSnap.exists()) {
          const currentData = quizSnap.data() as Quiz;
          const currentViewCount = currentData.viewCount || 0;
          const currentResults = currentData.results || {};

          const updatedData: UpdateData = {
            participants: arrayUnion(user.email),
            viewCount: currentViewCount + 1,
          };
          
          if (!currentResults[user.email]) {
            updatedData.results = {
              ...currentResults,
              [user.email as string]: score,
            };
          }

          // 데이터 업데이트
          await updateDoc(quizRef, updatedData);

          // 업데이트된 퀴즈 데이터 가져오기
          const updatedQuizSnap = await getDoc(quizRef);
          if (updatedQuizSnap.exists()) {
            setUpdatedQuiz({ id: updatedQuizSnap.id, ...updatedQuizSnap.data() } as Quiz);
          }
        }
      } catch (error) {
        console.error("Error updating quiz data:", error);
      } finally {
        setLoading(false);
      }
    }
  };

  useEffect(() => {
    updateQuizData();
  }, [quiz, user]);

  if (loading) {
    return <Loading className="bg-white text-black">Loading quiz results...</Loading>;
  }

  return (
    <div>
      <QuizTotalDashboard quiz={updatedQuiz || quiz} />
    </div>
  );
};

export default QuizTotalResult;