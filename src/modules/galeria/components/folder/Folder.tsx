import Link from "next/link";
import React from "react";
import { LuFolder } from "react-icons/lu";
interface FolderProps {
  name: string;
  url: string;
}

export default function Folder({ name, url }: FolderProps) {
  return (
    <Link
      href={url}
      className="p-[11px] flex gap-x-2 items-center border rounded-full border-ob-gray-4"
    >
      <LuFolder />

      {name}
    </Link>
  );
}
