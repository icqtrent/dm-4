"use client";

import { useCallback, useState } from "react";
import {
  FileUploader,
  FileUploaderContent,
  FileUploaderItem,
  FileInput,
} from "@/components/extension/file-upload-mem";
import { Paperclip, Upload } from "lucide-react";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { toast } from "sonner";
import { app } from "../app/firebase";
import { useAuth } from "@/context/AuthContext";
import { Control, UseFormSetValue } from "react-hook-form";

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
        <span>&nbsp; o arrastra y suelta (DXF, DWG, IES, LDT, ULD)</span>
      </div>
      
      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-1">
        -Máximo 20MB para DXF/DWG, 2MB para IES/LDT/ULD.
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

type FileUploaderMemLumProps = {
  control: Control<any>;
  setValue: UseFormSetValue<any>;
  name: string;
};

const FileUploaderMemLum = ({
  control,
  setValue,
  name,
}: FileUploaderMemLumProps) => {
  
  const [files, setFiles] = useState<File[] | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const { user } = useAuth();
  const timestamp = new Date();

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 20 * 1024 * 1024, // 20MB
    multiple: true,
    accept: {
      "application/dxf": [".dxf"],
      "application/acad": [".dwg"],
      "application/x-ies": [".ies"],
      "application/x-ldt": [".ldt"],
      "application/x-uld": [".uld"]
    },
  };

  const uploadToStorage = useCallback(async () => {
    if (!files || files.length === 0) {
      toast.error("No hay archivo para subir");
      return;
    }

    setIsUploading(true);
    const storage = getStorage(app);

    try {
      const urls = await Promise.all(
        files.map(async (file) => {
          if (file.size > 20 * 1024 * 1024) {
            throw new Error(`El archivo ${file.name} excede el tamaño máximo permitido de 20MB.`);
          }
          if (['.ies', '.ldt', '.uld'].some(ext => file.name.toLowerCase().endsWith(ext)) && file.size > 2 * 1024 * 1024) {
            throw new Error(`El archivo ${file.name} excede el tamaño máximo permitido de 2MB para archivos IES/LDT/ULD.`);
          }
          const storageRef = ref(storage, `${user.email}/Memlum/${file.name}+${timestamp.toISOString()}`);
          await uploadBytes(storageRef, file);
          const downloadURL = await getDownloadURL(storageRef);
          return downloadURL;
        })
      );

      console.log("Archivos subidos:", files.map(file => file.name));
      console.log("URLs de descarga:", urls);

      setValue(name, urls, { shouldValidate: true });
      toast.success("Archivos subidos exitosamente");
      setFiles(null);
    } catch (error) {
      console.error("Error al subir archivos:", error);
      toast.error(error instanceof Error ? error.message : "Error al subir archivos");
    } finally {
      setIsUploading(false);
    }
  }, [files, setValue, name, user.email]);

  return (
    <FileUploader
      value={files}
      onValueChange={setFiles}
      dropzoneOptions={dropZoneConfig}
      className="relative bg-background rounded-lg p-2"
    >
      <div>
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
          onClick={uploadToStorage}
          disabled={isUploading || !files || files.length === 0}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:bg-gray-400"
        >
          {isUploading ? "Subiendo..." : "Subir a plataforma"}
          <Upload className="inline-block ml-2 h-4 w-4" />
        </button>
      </div>
    </FileUploader>
  );
};

export default FileUploaderMemLum;