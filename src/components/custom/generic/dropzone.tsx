// import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import { XIcon } from "lucide-react";
import Image from "next/image";
import React, { useCallback, useState } from "react";
import { type FileRejection, useDropzone } from "react-dropzone";
import { toast } from "react-toastify";
import { string } from "zod";

interface FileWithPreview extends File {
  preview: string;
}

const Dropzone = ({
  onChange,
  className,
}: {
  onChange: (val: File[]) => void;
  className?: string;
}) => {
  const [files, setFiles] = useState<FileWithPreview[]>([]);
  // const { toast } = useToast();

  const onDrop = useCallback(
    (acceptedFiles: File[], rejectedFiles: FileRejection[]) => {
      // Do something with the files
      if (acceptedFiles?.length) {
        setFiles((previousFiles) => [
          ...previousFiles,
          ...acceptedFiles.map((file) =>
            Object.assign(file, { preview: URL.createObjectURL(file) }),
          ),
        ]);

        onChange([...files, ...acceptedFiles]);
      }

      if (rejectedFiles?.length) {
        rejectedFiles.map(({ file, errors }) => {
          errors.map((error) => {
            toast(
              <>
                <p>
                  {shorten(file.name)}:{error.code}
                </p>
                <p>{error.message}</p>
              </>,
              {
                type: "error",
              },
            );
          });
        });
      }
    },
    [files, onChange],
  );

  const shorten = (text: string, length = 10) => {
    const mid = Math.floor(length);
    if (text.length > length) {
      return `${text.substring(0, mid)}...${text.slice(-mid)}`;
    } else {
      return text;
    }
  };

  const removeFile = (filename: string) => {
    setFiles((files) => files.filter((file) => file.name !== filename));
    onChange([...files.filter((file) => file.name !== filename)]);
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "image/*": [],
    },
    maxSize: 1024 * 1024 * 2,
  });

  return (
    <div
      {...getRootProps({
        className: cn(className, "p-16 mt-10 border border-neutral-200"),
      })}
    >
      <input {...getInputProps()} />
      {isDragActive ? (
        <p>Drop the files here ...</p>
      ) : (
        <p>Drag &apos;n&apos; drop some files here, or click to select files</p>
      )}

      {/* File preview */}
      <ul className="mt-6 grid grid-cols-1 gap-10 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6">
        {files.map((file) => (
          <li key={file.name} className="relative h-32 rounded-md shadow-lg">
            <Image
              src={file.preview}
              alt={file.name}
              width={100}
              height={100}
              onLoad={() => {
                URL.revokeObjectURL(file.preview);
              }}
              className="h-full w-full rounded-md object-contain"
            />
            <button
              type="button"
              className="border-secondary-400 bg-secondary-400 absolute -right-3 -top-3 flex h-7 w-7 items-center justify-center rounded-full border transition-colors hover:bg-white"
              onClick={() => removeFile(file.name)}
            >
              <XIcon className="hover:fill-secondary-400 h-5 w-5 fill-white transition-colors" />
            </button>
            <p className="mt-2 text-[12px] font-medium text-neutral-500">
              {file.name}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Dropzone;
