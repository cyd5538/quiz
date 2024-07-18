import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

interface Props {
  subTopic: string;
  setSubTopic: (subTopic: string) => void;
  topic: string;
}

const SubTopicInput: React.FC<Props> = ({ subTopic, setSubTopic, topic }) => (
  topic === "people" || topic === "sports" ? (
    <div>
      <Label htmlFor="subTopic" className="text-sm font-medium text-gray-700 block mb-2">
        {topic === "people" ? "Person" : "Sport"}
      </Label>
      <Input
        value={subTopic}
        onChange={(e) => setSubTopic(e.target.value)}
        id="subTopic"
        placeholder={topic === "people" ? "Enter person's name" : "Enter sport"}
        className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
    </div>
  ) : null
);

export default SubTopicInput;
