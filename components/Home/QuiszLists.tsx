"use client";

import { useState, useEffect } from 'react';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { QuizLists } from './QuizList';
import { Loading } from '../ui/Loading';
import { Quiz } from '@/types';

interface Props {
  tabmenu: string;
}

const QuizList = ({ tabmenu }: Props) => {
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [loading, setLoading] = useState(true);
  console.log(quizzes)
  useEffect(() => {
    const fetchQuizzes = async () => {
      setLoading(true);
      let q;
      switch (tabmenu) {
        case 'popularity':
          q = query(collection(db, 'quizzes'), orderBy('viewCount', 'desc'), limit(10));
          break;
        case 'mostLikes':
          q = query(collection(db, 'quizzes'), orderBy('likes', 'desc'), limit(10));
          break;
        case 'mostComments':
          q = query(collection(db, 'quizzes'), orderBy('commentCount', 'desc'), limit(10));
          break;
        case 'recent':
          q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'), limit(10));
          break;
        default:
          q = query(collection(db, 'quizzes'), orderBy('createdAt', 'desc'), limit(10));
      }

      const querySnapshot = await getDocs(q);
      const quizList = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as Quiz));
      setQuizzes(quizList);
      setLoading(false);
    };

    fetchQuizzes();
  }, [tabmenu]);

  if (loading) {
    return (
      <div className="absolute -z-10 top-0 w-full h-full flex justify-center items-center">
        <Loading
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Loading...
        </Loading>
      </div>
    );
  }

  return (
    <div className="flex-1 p-4 mt-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-2 place-items-center">
        {quizzes.map((quiz) => (
          <QuizLists key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
};

export default QuizList;