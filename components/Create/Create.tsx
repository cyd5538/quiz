"use client";

import axios from "axios";
import React, { useState } from "react";
import DropZone from "@/components/Create/DropZone";
import ThumbnailPreview from "@/components/Create/ThumbnailPreview";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Loading } from "../ui/Loading";

const Create: React.FC = () => {
  const [topic, setTopic] = useState<string>("");
  const [difficulty, setDifficulty] = useState<string>("");
  const [subTopic, setSubTopic] = useState<string>("");
  const [thumbnail, setThumbnail] = useState<File | null>(null);
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);
  const [showDropZone, setShowDropZone] = useState<boolean>(true);
  const [quizTitle, setQuizTitle] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<any>(null);

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

  const handleCreateQuiz = async () => {
    if(!topic || !difficulty || !quizTitle || !thumbnail) {
      return alert("Please fill in the fields")
    }

    if(topic === "People" || topic === "Sports") {
      if(!subTopic) {
        return alert("Please fill in the fields")
      }
    } 

    setIsLoading(true);
    try {
      const response = await axios.post("/api/generate", {
        topic,
        difficulty,
        setSubTopic: topic === "People" || "Sports" ? setSubTopic : undefined,
      });

      const jsonString = response.data.quiz.replace(/```json\n|```/g, "");
      const quizData = JSON.parse(jsonString);
      setQuiz(quizData);
      console.log("Quiz data:", quizData);
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
    <main className="max-w-3xl min-w-[350px] mx-auto bg-white shadow-sm rounded-lg">
      <h1 className="text-3xl font-semibold mb-12 text-left text-gray-800">
        Create Your Quiz
      </h1>
      <div className="space-y-8">
        <div>
          <Label
            htmlFor="quizTitle"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Quiz Title
          </Label>
          <Input
            value={quizTitle}
            onChange={(e) => setQuizTitle(e.target.value)}
            id="quizTitle"
            placeholder="Enter quiz title"
            className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        <div>
          <Label className="text-sm font-medium text-gray-700 block mb-2">
            Thumbnail
          </Label>
          {showDropZone ? (
            <DropZone onFileUploaded={handleFileUpload} />
          ) : (
            thumbnailPreview && (
              <ThumbnailPreview
                thumbnail={thumbnail}
                thumbnailPreview={thumbnailPreview}
                clearThumbnail={clearThumbnail}
              />
            )
          )}
        </div>

        <div>
          <Label
            htmlFor="topic"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Topic
          </Label>
          <Select onValueChange={(value: string) => setTopic(value)}>
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder="Select a topic" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {[
                  "History",
                  "People",
                  "Geography",
                  "Sports",
                  "World Capitals",
                ].map((item) => (
                  <SelectItem key={item} value={item.toLowerCase()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        {(topic === "people" || topic === "sports") && (
          <div>
            <Label
              htmlFor="subTopic"
              className="text-sm font-medium text-gray-700 block mb-2"
            >
              {topic === "people" ? "Person" : "Sport"}
            </Label>
            <Input
              onChange={(e) => setSubTopic(e.target.value)}
              value={subTopic}
              id="subTopic"
              placeholder={
                topic === "people" ? "Enter person's name" : "Enter sport"
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
        )}

        <div>
          <Label
            htmlFor="difficulty"
            className="text-sm font-medium text-gray-700 block mb-2"
          >
            Difficulty
          </Label>
          <Select onValueChange={(value: string) => setDifficulty(value)}>
            <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
              <SelectValue placeholder="Select difficulty" />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                {["Easy", "Medium", "Hard"].map((item) => (
                  <SelectItem key={item} value={item.toLowerCase()}>
                    {item}
                  </SelectItem>
                ))}
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>

        <Button
          onClick={handleCreateQuiz}
          className="w-full bg-purple-700 text-white py-2 px-4 rounded-md hover:bg-blue-900 transition duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          Create Quiz
        </Button>
      </div>
    </main>
  );
};

export default Create;
