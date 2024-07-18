import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Quiz } from "@/types";
import { Eye, Heart, MessageCircle } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

interface Props {
  quiz: Quiz
}

export function QuizLists({ quiz }: Props) {
  const truncateTitle = (title: string, maxLength: number) => {
    return title.length > maxLength ? `${title.slice(0, maxLength)}...` : title;
  };

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
        <CardTitle className="flex-1 text-lg font-bold">
          {truncateTitle(quiz.title, 24)}
        </CardTitle>
        <div className="flex flex-col items-center">
          <Image 
            src={quiz.creator.profileImage}
            width={45}
            height={45}
            alt={quiz.creator.displayName}
            className="rounded-full mb-2"
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
      <div className="flex justify-between items-center h-12 p-6 b border-t-[1px] border-zinc-95s0">
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
