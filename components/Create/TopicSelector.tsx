import React from 'react';
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';

interface Props {
  topic: string;
  setTopic: (topic: string) => void;
}

const TopicSelector: React.FC<Props> = ({ topic, setTopic }) => (
  <div>
    <Label htmlFor="topic" className="text-sm font-medium text-gray-700 block mb-2">
      Topic
    </Label>
    <Select onValueChange={setTopic}>
      <SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent">
        <SelectValue placeholder="Select a topic" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {['History', 'People', 'Geography', 'Sports', 'World Capitals'].map((item) => (
            <SelectItem key={item} value={item.toLowerCase()}>
              {item}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  </div>
);

export default TopicSelector;
