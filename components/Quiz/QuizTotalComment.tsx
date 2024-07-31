"use client";
import React, { useState, useEffect, useRef } from 'react';
import { collection, query, orderBy, limit, getDocs, startAfter, QueryDocumentSnapshot, DocumentData } from 'firebase/firestore';
import { db } from '@/lib/firebase';
import { 
  Pagination, 
  PaginationContent, 
  PaginationItem, 
  PaginationLink, 
  PaginationNext, 
  PaginationPrevious 
} from "@/components/ui/pagination";
import { Quiz, QuizComment } from '@/types';
import QuizTotalCommentForm from './QuizTotalCommentForm';
import QuizTotalCommentList from './QuizTotalCommentList';

interface Props {
  quiz: Quiz  
}

const COMMENTS_PER_PAGE = 4; // 한 페이지당 보여줄 댓글 수

const QuizTotalComment: React.FC<Props> = ({ quiz }) => {
  const [comments, setComments] = useState<QuizComment[]>([]);
  const [newComment, setNewComment] = useState<string>('');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [lastVisiblePerPage, setLastVisiblePerPage] = useState<{ [key: number]: QueryDocumentSnapshot<DocumentData> | null }>({});

  const loadComments = async (page: number): Promise<void> => {
    if (!quiz.id || isLoading) return;
    setIsLoading(true);

    try {
      const commentsRef = collection(db, 'quizzes', quiz.id, 'comments');
      const countSnapshot = await getDocs(commentsRef);
      const totalComments = countSnapshot.size;
      setTotalPages(Math.ceil(totalComments / COMMENTS_PER_PAGE));

      let q;
      if (page === 1) {
        q = query(commentsRef, orderBy('createdAt', 'desc'), limit(COMMENTS_PER_PAGE));
      } else {
        const lastVisible = lastVisiblePerPage[page - 1];
        if (!lastVisible) {
          setIsLoading(false);
          return;
        }
        q = query(
          commentsRef, 
          orderBy('createdAt', 'desc'), 
          startAfter(lastVisible), 
          limit(COMMENTS_PER_PAGE)
        );
      }

      const querySnapshot = await getDocs(q);
      const fetchedComments: QuizComment[] = [];
      querySnapshot.forEach((doc) => {
        fetchedComments.push({ id: doc.id, ...doc.data() } as QuizComment);
      });

      setComments(fetchedComments);
      setCurrentPage(page);
      setLastVisiblePerPage(prev => ({ ...prev, [page]: querySnapshot.docs[querySnapshot.docs.length - 1] || null }));
    } catch (error) {
      console.error('Error loading comments: ', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadComments(1);
  }, [quiz.id]);

  return (
    <div className='h-full overflow-hidden w-full p-4'>
      <QuizTotalCommentForm 
        newComment={newComment}
        setNewComment={setNewComment}
        quiz={quiz}
        loadComments={loadComments}
      />
      <QuizTotalCommentList 
        comments={comments}
      />
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious 
              onClick={() => currentPage > 1 && loadComments(currentPage - 1)}
              className={currentPage === 1 ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
          {[...Array(totalPages)].map((_, index) => (
            <PaginationItem key={index}>
              <PaginationLink
                className='cursor-pointer'
                onClick={() => loadComments(index + 1)}
                isActive={currentPage === index + 1}
              >
                {index + 1}
              </PaginationLink>
            </PaginationItem>
          ))}
          <PaginationItem>
            <PaginationNext 
              onClick={() => currentPage < totalPages && loadComments(currentPage + 1)}
              className={currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default QuizTotalComment;
