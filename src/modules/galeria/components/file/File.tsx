import React from "react";
import { FileType, getFileType } from "./types";
import Image from "next/image";
import { env } from "@/config/env";
import { LuEye, LuFile } from "react-icons/lu";
import { TbPhoto } from "react-icons/tb";
import Button from "@/components/ui/button/Button";
import { FiMoreHorizontal } from "react-icons/fi";
interface FileCardProps {
  name: string;
  path: string;
}

export default function FileCard({ name, path }: FileCardProps) {
  const [_, fileExtension] = name.split(".");

  const fileType = getFileType(fileExtension);
  const parseName = Buffer.from(name, "latin1").toString("utf-8");

  return (
    <div className="flex flex-col rounded-3xl border border-ob-gray-4">
      <div className="min-h-[120px] max-h-[120px] w-full rounded-t-3xl">
        {fileType == FileType.IMAGE && (
          <Image
            src={`${env.api_images}/static/${path}${name}`}
            alt={name}
            width={200}
            height={200}
            className="h-full w-full object-cover rounded-t-3xl"
          />
        )}

        {fileType == FileType.DOCUMENT && (
          <div className="w-full text-wrap h-full flex flex-col text-ob-gray-2 justify-center items-center gap-y-2">
            <LuFile className="size-7" />
            <p className="whitespace-normal break-words max-w-[200px]">
              {parseName}
            </p>
          </div>
        )}
      </div>

      <article className="flex flex-col h-full p-2.5 gap-y-[9px]">
        <span className="flex gap-x-[6px] max-w-max items-center px-2 py-[3px] border border-ob-gray-4 rounded-full text-ob-gray-2">
          {fileType == FileType.IMAGE && <TbPhoto />}
          {fileType == FileType.DOCUMENT && <LuFile />}
          {fileType}
        </span>

        <h3 className="text-sm break-words whitespace-normal font-medium text-ob-white leading-5">
          {parseName}
        </h3>

        <div className="flex gap-x-2 mt-auto">
          <Button className="py-2 px-2.5 bg-ob-blue-3 text-white w-full flex items-center justify-center">
            <LuEye />
            Ver
          </Button>

          <Button className="flex w-full items-center justify-center py-2 px-2.5 bg-transparent border border-ob-gray-4 text-ob-gray-2">
            <FiMoreHorizontal />
            Mas
          </Button>
        </div>
      </article>
    </div>
  );
}
