import { useEffect } from "react";
import { db } from "@/lib/firebase";
import userStore from "@/stores/userStore";
import { Quiz } from "@/types";
import { arrayUnion, doc, updateDoc, getDoc } from "firebase/firestore";

interface Props {
  quiz: Quiz;
  score: number;
  totalQuestions: number;
}

const QuizResult = ({ quiz, score, totalQuestions }: Props) => {
  const { user } = userStore();

  const updateQuizParticipants = async () => {
    if (quiz && user?.displayName) {
      const quizRef = doc(db, "quizzes", quiz.id);
      await updateDoc(quizRef, {
        participants: arrayUnion(user.displayName) // 중복된 참가자는 추가되지 않음
      });
    }
  };

  const updateViewCounts = async () => {
    if (quiz) {
      const quizRef = doc(db, "quizzes", quiz.id);
      const quizSnap = await getDoc(quizRef);
      if (quizSnap.exists()) {
        const currViewCount = quizSnap.data().viewCount || 0;
        await updateDoc(quizRef, {
          viewCount: currViewCount + 1
        });
      }
    }
  };

  const updateAnswerResult = async () => {
    if (quiz && user?.displayName) {
      const quizRef = doc(db, "quizzes", quiz.id);
      const quizSnap = await getDoc(quizRef);
      if (quizSnap.exists()) {
        const currentResults = quizSnap.data().results || {};
        // 유저네임이 존재하지않을때만 업데이트
        if (!currentResults[user.displayName]) {
          const updatedResults = {
            ...currentResults,
            [user.displayName]: score
          };
          await updateDoc(quizRef, {
            results: updatedResults
          });
        }
      }
    }
  };

  useEffect(() => {
    updateQuizParticipants();
    updateViewCounts();
    updateAnswerResult();
  }, []);

  return (
    <div>
      <h2>Quiz Results</h2>
      <p>맞은 문제: {score} / {totalQuestions}</p>
    </div>
  );
};

export default QuizResult;
