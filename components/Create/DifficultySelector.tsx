import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Props {
  difficulty: string;
  setDifficulty: (difficulty: string) => void;
}

const DifficultySelector: React.FC<Props> = ({ difficulty, setDifficulty }) => (
  <div>
    <Label htmlFor="difficulty" className="text-sm font-medium text-gray-700 block mb-2">
      Difficulty
    </Label>
    <Select onValueChange={setDifficulty}>
      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <SelectValue placeholder="Select difficulty" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {['Easy', 'Medium', 'Hard'].map((item) => (
            <SelectItem key={item} value={item.toLowerCase()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default DifficultySelector;
