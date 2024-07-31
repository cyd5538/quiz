import { Timestamp } from 'firebase/firestore';

export interface QuizQuestion {
  question: string;
  questionEng: string;
  options: string[];
  optionsEng: string[];
  correctAnswer: string;
  explanation:string;
  difficulty: string;
  explanationEng: string
  userAnswer: string
}

export interface Quiz {
  commentCount: number;
  creator: {
    displayName: string;
    id: string;
    profileImage: string;
  };
  title: string;
  difficulty: string
  id: string;
  createdAt: Timestamp
  likes: number;
  participants: string[]; 
  questions: QuizQuestion[]; 
  optionsEng: QuizQuestion[]; 
  thumbnail: string;
  comments: QuizComment[]
  viewCount: number;
  results: {
    [key: string]: number;
  }
}

export interface QuizComment {
  id: string;
  text: string;
  createdAt: Timestamp;
  author: string; 
  authorEmail: string; 
}

export interface QuizResult {
  id: string;
  quizId: string;
  quizTitle: string;
  score: number;
  totalQuestions: number;
  userEmail: string;
  userId: string;
  userName: string;
  question: QuizQuestion[];
}