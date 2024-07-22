import React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";

interface Props {
  numberQuestions: string;
  setNumberQuestions: (subTopic: string) => void;
}

const NumberQuestionSelect: React.FC<Props> = ({
  numberQuestions,
  setNumberQuestions,
}) => (
  <>
    <Label
      htmlFor="topic"
      className="text-sm font-medium text-gray-700 block mb-2"
    >
      Number of questions
    </Label>
    <Select onValueChange={setNumberQuestions}>
      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <SelectValue placeholder="Select a Number of questions" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {[
            "5",
            "7",
            "10"
          ].map((item) => (
            <SelectItem key={item} value={item.toLowerCase()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </>
);

export default NumberQuestionSelect;
