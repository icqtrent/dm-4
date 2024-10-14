"use client";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { doc, setDoc } from "firebase/firestore";
import { db, app } from "../../firebase";
import firebase from "firebase/compat/app";
import FileUploaderMemLum from '@/components/FileUploaderMemLum'
import { useState } from "react";
type DocumentData = firebase.firestore.DocumentData;
import { useAuth } from "@/context/AuthContext";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Info } from 'lucide-react';

const urlSchema = z.string().url("Invalid URL");
const urlsArraySchema = z.array(urlSchema);

const formSchema = z.object({
  enlaceUrl: urlsArraySchema,
});

export default function Home() {
  const [files, setFiles] = useState<File[] | null>(null);

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
      doc(db, formattedDate+" - MemoriasLuminicas", user.email+" - "+formattedDat),
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
          className="max-w-md w-full grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold">
              Memorias Lumínicas
            </h2>
            <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
          </div>

          <FormField
            control={form.control}
            name="enlaceUrl"
            render={({ field }) => {
              return (
                <FormItem className="md:col-span-2">
                  <FormLabel>Archivos para la memoria lumínica</FormLabel>
                  <FormControl>
                  <div style={{ display: 'flex', alignItems: 'flex-start' }}>
                    <FileUploaderMemLum
                      control={form.control}
                      setValue={form.setValue}
                      name="enlaceUrl"
                    />
                    <Dialog>
                          <DialogTrigger><Info /></DialogTrigger>
                          <DialogContent>
                            <DialogHeader>
                              <DialogTitle>Requisitos</DialogTitle>
                              <hr className="border-t-2 border-gray-200 mt-2 mb-4" />
                              <DialogDescription>
                                <p className="p-2">-Los planos del instalación deben estar escalados y en formato DWG o DXF.</p>
                                <p className="p-2">-Los archivo IES, LDT o ULD son archivos de proyección lumínica entregados usualmente por el fabricante o vendor de la luminaria.</p>
                               
                              </DialogDescription>
                            </DialogHeader>
                          </DialogContent>
                        </Dialog>

                    </div>
                   
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