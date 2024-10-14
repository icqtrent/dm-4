// components/QuestionListContent.tsx
import React from 'react';
import { Question, User } from '../types/index';
import Link from 'next/link';

interface QuestionListContentProps {
  questions: Question[];
  users: { [userId: string]: User };
}

const QuestionListContent: React.FC<QuestionListContentProps> = ({ questions, users }) => {
  return (
    <div className="space-y-8">
      {questions.map(question => (
        <div key={question.id} className="border-b pb-4 last:border-b-0">
          <Link href={`/questions/${question.id}`}>
            <h3 className="text-xl font-medium mb-2 hover:underline">{question.title}</h3>
          </Link>
          <p className="text-sm text-gray-500 mb-4">{question.content.substring(0, 100)}...</p>
          <p className="text-xs text-gray-400">Preguntado por: {users[question.authorId]?.name}</p>
        </div>
      ))}
      {questions.length === 0 && (
        <p>No hay resultados de búsqueda.</p>
      )}
    </div>
  );
};

export default QuestionListContent;
