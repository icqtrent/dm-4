"use client"

import { useState, useEffect } from 'react';
import { collection, query, orderBy, getDocs, getDoc, doc, limit } from 'firebase/firestore';
import { db } from '../app/firebase';
import { Question, User } from '../types/index';
import { Card, CardTitle, CardContent } from "@/components/ui/card";

export default function QuestionList() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [users, setUsers] = useState<{ [userId: string]: User }>({});
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

  return (
    <Card className="w-full max-w-4xl mx-auto">
      <CardContent className="flex flex-col gap-4 pt-4">
        <CardTitle className="pt-4">Comunidad DrawingsMachines</CardTitle>
        <hr className="flex gap-2 my-4" />
        <div className="flex flex-col gap-4">
          {visibleQuestions.map((question) => (
            <div key={question.id} className="border p-4">
              <h2 className="font-bold">{question.title}</h2>
              <p>{question.content}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}


