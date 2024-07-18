import React, { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import userStore from "@/stores/userStore";
import { db } from '@/lib/firebase';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { uploadFile } from "@/lib/firestore";
import QuizTitleInput from './QuizTitleInput';
import ThumbnailUploader from './ThumbnailUploader';
import TopicSelector from './TopicSelector';
import DifficultySelector from './DifficultySelector';
import SubTopicInput from './SubTopicInput';
import { Button } from '@/components/ui/button';
import { Loading } from '../ui/Loading';

const CreateQuizForm: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [subTopic, setSubTopic] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [showDropZone, setShowDropZone] = useState<boolean>(true);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<any>(null);

  const router = useRouter();
  const { user } = userStore();

  const handleFileUpload = (file: File) => {
    setThumbnail(file);
    setThumbnailPreview(URL.createObjectURL(file));
    setShowDropZone(false);
  };

  const clearThumbnail = () => {
    setThumbnail(null);
    setThumbnailPreview(null);
    setShowDropZone(true);
  };

  const saveQuiz = async (quizData: any, userId: string) => {
    try {
      setIsLoading(true);
      let thumbnailURL = "";
      if (thumbnail) {
        thumbnailURL = await uploadFile(thumbnail);
      }
      
      const quizRef = await addDoc(collection(db, "quizzes"), {
        title: quizTitle,
        thumbnail: thumbnailURL,
        creator: userId,
        createdAt: serverTimestamp(),
        likes: 0,
        questions: quizData,
        participants: [],
      });

      return quizRef.id;
    } catch (error) {
      console.error(error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const handleCreateQuiz = async () => {
    if(!topic || !difficulty || !quizTitle || !thumbnail) {
      return alert("Please fill in the fields");
    }

    if(topic === "people" || topic === "sports") {
      if(!subTopic) {
        return alert("Please fill in the fields");
      }
    } 

    setIsLoading(true);
    try {
      const response = await axios.post("/api/generate", {
        topic,
        difficulty,
        setSubTopic: topic === "people" || topic === "sports" ? subTopic : undefined,
      });

      const jsonString = response.data.quiz.replace(/```json\n|```/g, "");
      const quizData = JSON.parse(jsonString);
      setQuiz(quizData);
      const quizId = await saveQuiz(quizData, user?.uid as string);

      router.push(`/quiz/${quizId}`);
    } catch (error:any) {
      console.error("Error creating quiz:", error);
      alert(
        `An error occurred while creating the quiz.: ${
          error.response?.data?.error || error?.message
        }`
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="absolute -z-10 top-0 w-full h-full flex justify-center items-center">
        <Loading
          borderRadius="1.75rem"
          className="bg-white dark:bg-slate-900 text-black dark:text-white border-neutral-200 dark:border-slate-800"
        >
          Creating...
        </Loading>
      </div>
    );
  }

  return (
    <main className="lg:w-[900px] md:w-[600px] w-[330px] mt-24 mx-auto bg-white shadow-sm rounded-lg">
      <h1 className="text-3xl font-semibold mb-12 text-left text-gray-800">
        Create Your Quiz
      </h1>
      <div className="space-y-8">
        <QuizTitleInput quizTitle={quizTitle} setQuizTitle={setQuizTitle} />
        <ThumbnailUploader
          thumbnail={thumbnail}
          thumbnailPreview={thumbnailPreview}
          showDropZone={showDropZone}
          handleFileUpload={handleFileUpload}
          clearThumbnail={clearThumbnail}
        />
        <TopicSelector topic={topic} setTopic={setTopic} />
        <SubTopicInput topic={topic} subTopic={subTopic} setSubTopic={setSubTopic} />
        <DifficultySelector difficulty={difficulty} setDifficulty={setDifficulty} />
        <Button
          onClick={handleCreateQuiz}
          className="w-full bg-zinc-700 text-white py-8 px-4 rounded-md hover:bg-zinc-900 text-xl transition duration-200 ease-in-out focus:outline-none "
        >
          Create Quiz
        </Button>
      </div>
    </main>
  );
};

export default CreateQuizForm;
