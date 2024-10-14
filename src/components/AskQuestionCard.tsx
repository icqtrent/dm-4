// components/AskQuestionCard.tsx
import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AskQuestionForm } from './AskQuestionForm';
import Link from 'next/link';

interface AskQuestionCardProps {
  onQuestionAdded: () => void;
  link: string;
}

const AskQuestionCard: React.FC<AskQuestionCardProps> = ({ onQuestionAdded, link }) => {
  return (
    <Link href={link} passHref>
      <Card className="w-full max-w-4xl mx-auto cursor-pointer">
        <CardHeader>
          <CardTitle>Haz tu consulta</CardTitle>
        </CardHeader>
        <CardContent>
          <AskQuestionForm onQuestionAdded={onQuestionAdded} />
        </CardContent>
      </Card>
    </Link>
  );
};

export default AskQuestionCard;
