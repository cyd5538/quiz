import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface DropZoneProps {
  onFileUploaded: (file: File) => void;
}

const DropZone: React.FC<DropZoneProps> = ({ onFileUploaded }) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles[0]) {
        onFileUploaded(acceptedFiles[0]);
      }
    },
    [onFileUploaded]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
  });

  return (
    <div
      {...getRootProps()}
      className={`border-2 mt-2 p-6 rounded-lg text-center cursor-pointer transition-colors ${
        isDragActive
          ? "border-indigo-500 bg-indigo-50"
          : "border-gray-300 bg-gray-50"
      }`}
    >
      <input {...getInputProps()} />
      <p className="text-gray-600">Please upload an image.</p>
    </div>
  );
};

export default DropZone;
