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
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  likes: number;
  participants: string[]; 
  questions: QuizQuestion[]; 
  optionsEng: QuizQuestion[]; 
  thumbnail: string;
  viewCount: number;
  results: {
    [key: string]: number;
  }
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