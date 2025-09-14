import Link from 'next/link';
import React from 'react';
import { LuFolder } from 'react-icons/lu';
interface FolderProps {
  name: string;
  url: string;
}

export default function Folder({ name, url }: FolderProps) {
  return (
    <Link
      href={url}
      className="border-ob-gray-4 flex min-w-[143px] items-center gap-x-2 rounded-full border p-[11px]"
    >
      <LuFolder />

      {name}
    </Link>
  );
}
