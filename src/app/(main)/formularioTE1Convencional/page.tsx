"use client";
import * as z from "zod";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { collection, addDoc, doc, setDoc } from "firebase/firestore";
import { db, imgDb, app } from "../../firebase";
import firebase from "firebase/compat/app";
import ProtectedRoute from "@/components/ProtectedRoute";
import FileUploaderTest from "@/components/FileUploaderTest";
import { useState } from "react";
type DocumentData = firebase.firestore.DocumentData;
import { useAuth } from "@/context/AuthContext";

// Define un esquema para una URL
const urlSchema = z.string().url("Invalid URL");

// Define un esquema para un array de URLs
const urlsArraySchema = z.array(urlSchema);



const formSchema = z.object({
  enlaceUrl: urlsArraySchema,
});

export default function Home() {
  const [files, setFiles] = useState<File[] | null>(null);

  const handleFileUpload = async (files: File[]) => {
    if (!files || files.length === 0) return;

    const file = files[0]; // Solo tomamos el primer archivo en este
    const storageRef = app.storage().ref();
    const archivoPath = storageRef.child(file.name);
    try {
      await archivoPath.put(file);
      console.log("Archivo cargado:", file.name);
      const enlaceUrl = await archivoPath.getDownloadURL();
      console.log("URL de descarga:", enlaceUrl);
      // Lógica para manejar la URL de descarga en tu formulario
      form.setValue("enlaceUrl", [enlaceUrl]);
    } catch (error) {
      console.error("Error al subir archivo:", error);
    }
  };

  const timestamp = new Date();
  const formattedDat = timestamp.toISOString();
  const formattedDate = timestamp.toISOString().split("T")[0];

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { user } = useAuth();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      enlaceUrl: [""],
    },
  });

  const onSubmit = async (form: any) => {

    const response = await setDoc(
      doc(db, formattedDate+" - TE1Convencional", user.email+" - "+formattedDat),
      {
        form,
      }
    );
  }
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          //className="max-w-md w-full flex flex-col gap-4"
          className="max-w-md w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">
              Confección TE1 Convencional
            </h2>
            <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
          </div>

          <FormField
            control={form.control}
            name="enlaceUrl"
            render={({ field }) => {
              return (
                <FormItem className="md:col-span-2">
                  <FormLabel>Croquis de la instalación</FormLabel>

                  <FormControl>
                    {/* <Input id="picture" type="file" onChange={handleFileUpload}/> */}
                    <FileUploaderTest
                      control={form.control}
                      setValue={form.setValue}
                      name="enlaceUrl"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

          <Button type="submit" className="md:col-span-2">
            Enviar
          </Button>
        </form>
      </Form>
    </main>
  );
}
