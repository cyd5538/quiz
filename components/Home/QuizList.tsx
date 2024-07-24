import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Quiz } from "@/types";
import { Eye, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { format } from 'date-fns';

interface Props {
  quiz: Quiz
}

interface Timestamp {
  seconds: number;
  nanoseconds: number;
}

export function QuizLists({ quiz }: Props) {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

  const formatTimestamp = (timestamp: Timestamp): string => {
    const milliseconds = timestamp.seconds * 1000 + Math.floor(timestamp.nanoseconds / 1000000);
    const date = new Date(milliseconds);
    return format(date, "yyyy-MM-dd HH:mm");
  };

  const formatDate = formatTimestamp(quiz.createdAt);

  return (
    <Card className="max-w-[350px] w-full">
      <CardContent className="flex justify-center mt-2">
        <Image
          src={quiz.thumbnail}
          width={320}
          height={250}
          alt={quiz.title}
          className="w-[320px] h-[250px] object-cover rounded-md"
        />
      </CardContent>
      <CardHeader className="h-28 bg-zinc-100 flex flex-row items-center mb-2 p-4">
        <div className="flex-1 flex flex-col gap-2">
          <CardTitle className="text-lg font-bold">
            {truncateTitle(quiz.title, 24)}
          </CardTitle>
          <p className="text-sm text-gray-400">{formatDate}</p>
        </div>
        <div className="flex flex-col items-center">
          <Image 
            src={quiz.creator.profileImage ? quiz.creator.profileImage : "/baseprofile.png"}
            width={45}
            height={45}
            alt={quiz.creator.displayName}
            className="rounded-full mb-2 bg-white border-1 border-black"
          />
          <span className="text-sm">{quiz.creator.displayName}</span>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-between items-center pt-4 pb-[-4px] ">
        <button className="px-2 py-2 rounded-xl border border-neutral-600 text-black bg-white hover:bg-gray-100 transition duration-200">
          {quiz.difficulty}
        </button>
        <Button className="bg-zinc-800 hover:bg-zinc-950">
          <Link href={`quiz/${quiz.id}`}>
            Start Quiz
          </Link>
        </Button>
      </CardFooter>
      <div className="flex justify-between items-center h-12 p-6 border-t-[1px] border-zinc-950">
        <p className="flex justify-center items-center gap-[4px]">
          <Heart size={24} color="black" fill="red" /> {quiz.likes}
        </p>
        <div className="flex gap-6">
          <p className="flex justify-center items-center gap-[4px]">
            <Eye size={24} color="black" fill="#cbaeae" /> {quiz.viewCount}
          </p>
          <p className="flex justify-center items-center gap-[4px]">
            <MessageCircle color="black" fill="white" size={24} />{" "}
            {quiz.commentCount}
          </p>
        </div>
      </div>
    </Card>
  );
}
