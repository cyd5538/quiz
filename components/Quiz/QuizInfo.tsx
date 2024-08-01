"use client";

import { Quiz } from "@/types";
import React, { useState, useEffect } from "react";
import {
  collection,
  doc,
  setDoc,
  deleteDoc,
  query,
  where,
  getDocs,
  DocumentReference,
  QuerySnapshot,
  updateDoc,
  increment,
} from "firebase/firestore";
import { Heart } from "lucide-react";
import { db } from "@/lib/firebase";
import userStore from "@/stores/userStore";
import { useToast } from "../ui/use-toast";
import Image from "next/image";

interface Props {
  quiz: Quiz | null;
}

interface Like {
  quizId: string;
  userId: string;
  createdAt: Date;
}

const QuizInfo: React.FC<Props> = ({ quiz }) => {
  const { user } = userStore();
  const [isLiked, setIsLiked] = useState<boolean>(false);
  const [likeCount, setLikeCount] = useState<number>(0);

  const { toast } = useToast();

  useEffect(() => {
    if (user && quiz) {
      checkLikeStatus();
      setLikeCount(quiz.likes || 0);
    }
  }, [user, quiz]);

  const checkLikeStatus = async (): Promise<void> => {
    if (!user || !quiz) return;
    const likesQuery = query(
      collection(db, "likes"),
      where("quizId", "==", quiz.id),
      where("userId", "==", user.uid)
    );
    const likeDoc: QuerySnapshot = await getDocs(likesQuery);
    setIsLiked(!likeDoc.empty);
  };

  const toggleLike = async (): Promise<void> => {
    if (!user || !quiz) return;
    const likeRef: DocumentReference<Like> = doc(
      db,
      "likes",
      `${quiz.id}_${user.uid}`
    ) as DocumentReference<Like>;
    const quizRef = doc(db, "quizzes", quiz.id);

    // 좋아요 취소
    if (isLiked) {
      await deleteDoc(likeRef);
      await updateDoc(quizRef, {
        likes: increment(-1),
      });
      toast({
        title: "I like it.❤️",
      });
      setLikeCount((prev) => prev - 1);
      // 좋아요 추가
    } else {
      await setDoc(likeRef, {
        quizId: quiz.id,
        userId: user.uid,
        createdAt: new Date(),
      });
      await updateDoc(quizRef, {
        likes: increment(1),
      });
      toast({
        title: "Like Cancel 💔",
      });
      setLikeCount((prev) => prev + 1);
    }

    setIsLiked(!isLiked);
  };

  return (
    <div className="bg-white shadow-lg rounded-lg p-6 max-w-7xl mx-auto mb-10">
      <h1 className="text-2xl sm:text-4xl font-bold mb-6 text-gray-800 break-words">
        {quiz?.title}
      </h1>
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mt-4">
        <div className="flex items-center gap-4">
          <div className="flex flex-col items-center">
            <Image
              width={80}
              height={80}
              src={quiz?.creator.profileImage as string}
              alt={quiz?.creator.displayName as string}
              className="w-16 h-16 sm:w-20 sm:h-20 rounded-full border-2 border-blue-500 shadow-md"
            />
            <span className="text-xs sm:text-sm text-gray-500 mt-2">
              created by {quiz?.creator.displayName}
            </span>
          </div>
          <div className="px-3 py-1 border-2 border-gray-300 rounded-full text-sm font-medium text-gray-700 bg-gray-100">
            {quiz?.difficulty}
          </div>
        </div>
        <button
          onClick={toggleLike}
          className={`flex items-center gap-2 px-4 py-2 rounded-full transition-colors duration-300 ${
            isLiked
              ? "bg-red-100 text-red-500 hover:bg-red-200"
              : "bg-gray-100 text-gray-500 hover:bg-gray-200"
          }`}
          disabled={!user}
        >
          <Heart className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
          <span className="font-medium">{likeCount}</span>
        </button>
      </div>
    </div>
  );
}

export default QuizInfo;
