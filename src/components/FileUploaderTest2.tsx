"use client";

import { useCallback, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-upload2";
import { Paperclip, Upload } from "lucide-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import { db, imgDb, app } from "../app/firebase";
import { Control, UseFormSetValue } from "react-hook-form";
import { useAuth } from "@/context/AuthContext";


const FileSvgDraw = () => {
  return (
    <>
      <svg
        className="w-8 h-8 mb-3 text-gray-500 dark:text-gray-400"
        aria-hidden="true"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 20 16"
      >
        <path
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"
        />
      </svg>
      <div className="flex flex-col items-center justify-center text-center mb-1 text-sm text-gray-500 dark:text-gray-400">
  <span className="font-semibold">Click para subir</span>
  <span>&nbsp; o arrastra y suelta</span>
</div>
<p className="text-xs text-gray-500 dark:text-gray-400 text-center">
  SVG, PNG, JPG o GIF
</p>

    </>
  );
};

const truncateFileName = (fileName: string, maxLength = 20) => {
  if (fileName.length > maxLength) {
    return fileName.substring(0, maxLength) + "...";
  }
  return fileName;
};

type FileUploaderTestProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
};

export const FileUploaderTest = ({ control, setValue, name }: FileUploaderTestProps) => {
  const timestamp = new Date();
  const [files, setFiles] = useState<File[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();

  const dropZoneConfig = {
    maxFiles: 1,
    maxSize: 1024 * 1024 * 20,
    multiple: false,
    accept: { "image/*": [".jpg", ".jpeg", ".png", ".gif"] },
     
  };

  const uploadToStorage = useCallback(async () => {
    if (!files || files.length === 0) {
      toast.error("No hay archivo para subir");
      return;
    }

    setIsUploading(true);
    const storage = getStorage(app);

    try {
      const file = files[0];
      const storageRef = ref(storage, `${user.email}/TE1Express/${file.name}+${timestamp.toISOString()}`);
      await uploadBytes(storageRef, file);
      const downloadURL = await getDownloadURL(storageRef);
     
      
      console.log(`Archivo subido: ${file.name}`);
      console.log(`URL de descarga: ${downloadURL}`);
      
      setValue(name, downloadURL, { shouldValidate: true });
      toast.success("Archivo subido exitosamente");
      setFiles(null);
    } catch (error) {
      console.error("Error al subir archivo:", error);
      toast.error("Error al subir archivo");
    } finally {
      setIsUploading(false);
    }
  }, [files, setValue, name]);

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2"
    >
      <div> {/* Envuelve todo el contenido en un solo div */}
        <FileInput className="outline-dashed outline-1 outline-white">
          <div className="flex items-center justify-center flex-col pt-3 pb-4 w-full ">
            <FileSvgDraw />
          </div>
        </FileInput>
        <FileUploaderContent>
          {files &&
            files.length > 0 &&
            files.map((file, i) => (
              <FileUploaderItem key={i} index={i}>
                <Paperclip className="h-4 w-4 stroke-current" />
                <span>{truncateFileName(file.name)}</span>
              </FileUploaderItem>
            ))}
        </FileUploaderContent>
        <button
          type="button"
          onClick={uploadToStorage}
          disabled={isUploading || !files || files.length === 0}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isUploading ? "Subiendo..." : "Subir a Plataforma"}
          <Upload className="inline-block ml-2 h-4 w-4" />
        </button>
      </div>
    </FileUploader>
  );
};