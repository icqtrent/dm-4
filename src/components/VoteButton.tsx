"use client"

import { Button } from "@/components/ui/button";
import { ThumbsUp } from "lucide-react";
import { doc, updateDoc, increment } from "firebase/firestore";
import { db } from "../app/firebase";

interface VoteButtonProps {
  answerId: string;
  questionId: string;
  userId: string;
}

export function VoteButton({ answerId, questionId, userId }: VoteButtonProps) {
  const handleVote = async () => {
    try {
      const answerRef = doc(db, `questions/${questionId}/answers`, answerId);
      const userRef = doc(db, "users", userId);

      await updateDoc(answerRef, {
        votes: increment(1)
      });

      await updateDoc(userRef, {
        score: increment(1)
      });

      console.log("Vote registered successfully");
    } catch (error) {
      console.error("Error voting:", error);
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleVote}>
      <ThumbsUp className="mr-2 h-4 w-4" />
      Vote
    </Button>
  );
}