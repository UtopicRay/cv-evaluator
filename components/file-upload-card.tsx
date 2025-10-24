import React from "react";
import { Card } from "./ui/card";
import { FileUploadZone } from "./file-upload-zone";

interface FileUploadCardProps {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File|null>>;
  errors: { file?: string };
}
function FileUploadCard({ file, setFile, errors }: FileUploadCardProps) {
  return (
    <Card className="p-8 w-full my-14">
      <h2 className="text-xl font-semibold mb-6">Subir Archivo</h2>
      <FileUploadZone file={file} onFileChange={setFile} error={errors.file} />
    </Card>
  );
}

export default FileUploadCard;
