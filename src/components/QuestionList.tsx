// components/QuestionList.tsx
"use client"

import { useState, useEffect, createContext } from 'react';
import { collection, query, orderBy, getDocs, getDoc, doc, limit } from 'firebase/firestore';
import { db } from '../app/firebase';
import { Question, User } from '../types/index';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { AskQuestionForm } from './AskQuestionForm';
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
import QuestionListContent from './QuestionListContent';



export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<{ [userId: string]: User }>({});
  const [searchTerm, setSearchTerm] = useState('');
  const [visibleQuestions, setVisibleQuestions] = useState<Question[]>([]);

  const fetchQuestions = async () => {
    const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'), limit(3));
    const snapshot = await getDocs(q);
    const fetchedQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
    setQuestions(fetchedQuestions);
    setVisibleQuestions(fetchedQuestions);

    const userIds = new Set<string>(fetchedQuestions.map(q => q.authorId));

    const usersPromises = Array.from(userIds).map(async (userId) => {
      const userDoc = await getDoc(doc(db, 'users', userId));
      return [userId, { id: userId, ...userDoc.data() } as User];
    });

    const usersResults = await Promise.all(usersPromises);
    setUsers(Object.fromEntries(usersResults));
  };

  useEffect(() => {
    fetchQuestions();
  }, []);

  const handleSearch = async () => {
    if (searchTerm) {
      const q = query(collection(db, 'questions'), orderBy('createdAt', 'desc'));
      const snapshot = await getDocs(q);
      const allQuestions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Question));
      const filtered = allQuestions.filter(question =>
        question.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        question.content.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setVisibleQuestions(filtered);
    } else {
      setVisibleQuestions(questions.slice(0, 3));
    }
  };

  return (
    
    <Card className="w-full max-w-4xl mx-auto">
      <CardHeader>
        <CardTitle>Haz tu consulta</CardTitle>
      </CardHeader>
      <CardContent>
       
        <AskQuestionForm onQuestionAdded={fetchQuestions} />
        <hr className="flex gap-2 my-4 pt-4" />
        <CardTitle className="pt-4">Busca consultas realizadas</CardTitle>
        <div className="flex gap-2 my-8">
          <Input
            type="text"
            placeholder="Buscar preguntas"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button onClick={handleSearch}>Buscar</Button>
        </div>
        
        <QuestionListContent questions={visibleQuestions} users={users} /> 
      </CardContent>
    </Card>
  );
}