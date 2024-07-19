"use client";

import { useState, useEffect } from 'react';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { Quiz } from '@/types';

interface Props {
  params: { slug: string[] }
}

export default function Home({ params }: Props) {
  const id = params.slug[0];
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [loading, setLoading] = useState(true);

  // id에 맞는 quizzes 가져오기
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

  
  // 이미 퀴즈를 한 유저라면 처리해줄 로직


  if (loading) {
    return <div>로딩 중...</div>;
  }

  console.log(quiz)
  return (
    <main className="flex flex-col items-center justify-between p-24">
      {quiz && (
        <div>
          <h2 className='text-3xl'>{quiz.title}</h2>
   
        </div>
      )}
    </main>
  );
}