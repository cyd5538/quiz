export interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface Quiz {
  id: string;
  title: string;
  creator: {
    displayName: string;
    id: string;
    profileImage: string;
  };
  createdAt: {
    seconds: number;
    nanoseconds: number;
  };
  likes: number;
  participants: string[]; 
  questions: QuizQuestion[]; 
  thumbnail: string;
  viewCount: number;
  commentCount: number;
  difficulty: string;
}

