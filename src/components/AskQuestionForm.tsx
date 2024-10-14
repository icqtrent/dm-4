// components/AskQuestionForm.tsx
"use client"

import { useState } from 'react';
import { collection, addDoc, serverTimestamp } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { db,  imgDb } from '../app/firebase';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import imageCompression from 'browser-image-compression';

interface AskQuestionFormProps {
  onQuestionAdded: () => void;
}

export function AskQuestionForm({ onQuestionAdded }: AskQuestionFormProps) {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Comprimir la imagen
      const options = {
        maxSizeMB: 0.05,
        maxWidthOrHeight: 800,
        useWebWorker: true
      }
      
      try {
        const compressedFile = await imageCompression(file, options);
        setImage(compressedFile);
        
        // Crear preview
        const reader = new FileReader();
        reader.onloadend = () => {
          setImagePreview(reader.result as string);
        }
        reader.readAsDataURL(compressedFile);
      } catch (error) {
        console.error("Error compressing image:", error);
      }
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !content) return;

    try {
      let imageUrl = null;
      if (image) {
        const storageRef = ref( imgDb, `question_images/${Date.now()}_${image.name}`);
        await uploadBytes(storageRef, image);
        imageUrl = await getDownloadURL(storageRef);
      }

      await addDoc(collection(db, 'questions'), {
        title,
        content,
        imageUrl,
        authorId: 'user123', // Reemplaza con el ID del usuario actual
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });

      setTitle('');
      setContent('');
      setImage(null);
      setImagePreview(null);
      onQuestionAdded();
    } catch (error) {
      console.error("Error adding question: ", error);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Título de la pregunta"
        required
      />
      <Textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Contenido de la pregunta"
        required
      />
      <Input
        type="file"
        onChange={handleImageChange}
        accept="image/*"
      />
      {imagePreview && (
        <img src={imagePreview} alt="Preview" className="mt-2 max-w-xs h-auto" />
      )}
      <Button type="submit">Haz tu pregunta</Button>
    </form>
  );
}