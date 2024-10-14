// components/QuestionPageContent.tsx
"use client"

import { useState, useEffect } from 'react';
import { doc, getDoc, collection, query, orderBy, getDocs, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '@/app/firebase';
import { Question, Answer, User } from '@/types/index';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { VoteButton } from '@/components/VoteButton';
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import Image from 'next/image';

interface QuestionPageContentProps {
  id: string;
}

export default function QuestionPageContent({ id }: QuestionPageContentProps) {
  const [question, setQuestion] = useState<Question | null>(null);
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [users, setUsers] = useState<{ [userId: string]: User }>({});
  const [newAnswer, setNewAnswer] = useState('');

  useEffect(() => {
    if (id) {
      fetchQuestionData();
    }
  }, [id]);

  const fetchQuestionData = async () => {
    const questionDoc = await getDoc(doc(db, 'questions', id));
    if (questionDoc.exists()) {
      const questionData = { id: questionDoc.id, ...questionDoc.data() } as Question;
      setQuestion(questionData);

      const answersQuery = query(collection(db, `questions/${id}/answers`), orderBy('votes', 'desc'));
      const answersSnapshot = await getDocs(answersQuery);
      const fetchedAnswers = answersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Answer));
      setAnswers(fetchedAnswers);

      const userIds = new Set<string>([
        questionData.authorId,
        ...fetchedAnswers.map(a => a.authorId),
      ]);

      const usersPromises = Array.from(userIds).map(async (userId) => {
        const userDoc = await getDoc(doc(db, 'users', userId));
        return [userId, { id: userId, ...userDoc.data() } as User];
      });

      const usersResults = await Promise.all(usersPromises);
      setUsers(Object.fromEntries(usersResults));
    }
  };

  const handleAnswerSubmit = async () => {
    if (!question || !newAnswer) return;
    try {
      await addDoc(collection(db, `questions/${question.id}/answers`), {
        content: newAnswer,
        authorId: 'user123', // Reemplaza con el ID del usuario actual
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
        votes: 0,
      });
      setNewAnswer('');
      fetchQuestionData();
    } catch (error) {
      console.error("Error al añadir respuesta: ", error);
    }
  };

  if (!question) return <div>Cargando...</div>;

  return (
    <Card>
      <CardHeader>
        <CardTitle>{question.title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-500 mb-4" >{question.content}</p>
        {question.imageUrl && ( 
          <div className="mb-4" style={{ maxWidth: '300px' }}>
            <a href={question.imageUrl} target="_blank" rel="noreferrer">
            <Image 
              src={question.imageUrl} 
              alt="Imagen de la pregunta" 
              width={100} 
              height={50} 
              layout="responsive" 
              objectFit="contain"
            />
            </a>
          </div>
        )}
        <p className="text-xs text-gray-400 mb-4">Preguntado por: {users[question.authorId]?.name}</p>
        <h4 className="text-lg font-medium mb-2">Respuestas:</h4>
        {answers.map(answer => (
          <div key={answer.id} className="mb-4 pl-4 border-l-2 border-gray-200">
            <p className="text-sm mb-2">{answer.content}</p>
            <div className="flex items-center justify-between">
              <p className="text-xs text-gray-400">Respondido por: {users[answer.authorId]?.name}</p>
              <div className="flex items-center">
                <span className="mr-2 text-sm">{answer.votes} votos</span>
                <VoteButton answerId={answer.id} questionId={question.id} userId={answer.authorId} />
              </div>
            </div>
          </div>
        ))}
        <div className="mt-4">
          <Textarea
            value={newAnswer}
            onChange={(e) => setNewAnswer(e.target.value)}
            placeholder="Tu respuesta"
          />
          <Button onClick={handleAnswerSubmit} className="mt-2">Enviar Respuesta</Button>
        </div>
      </CardContent>
    </Card>
  );
}