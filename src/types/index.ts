// src/types/index.ts
export interface Question {
    id: string;
    title: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    imageUrl?: string;
    votes: number;

  }
  
  export interface Answer {
    id: string;
    questionId: string;
    content: string;
    authorId: string;
    createdAt: Date;
    updatedAt: Date;
    votes: number;
  }
  
  export interface User {
    id: string;
    name: string;
    email: string;
    score: number;
  }