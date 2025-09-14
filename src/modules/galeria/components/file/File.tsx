'use client';
import React, { useState } from 'react';
import { FileType, getFileType } from './types';
import Image from 'next/image';
import { env } from '@/config/env';
import { LuDownload, LuEye, LuFile } from 'react-icons/lu';
import { TbPhoto } from 'react-icons/tb';
import Button from '@/components/ui/button/Button';
import { FiMoreHorizontal } from 'react-icons/fi';
import { AnimatePresence, motion } from 'motion/react';
import { useClose } from '@/hooks/useClose';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { toast } from 'sonner';

interface FileCardProps {
  name: string;
  path: string;
}

export default function FileCard({ name, path }: FileCardProps) {
  const [_, fileExtension] = name.split('.');

  const fileType = getFileType(fileExtension);
  const parseName = Buffer.from(name, 'latin1').toString('utf-8');

  const [isOpen, setIsOpen] = useState(false);
  const ref = useClose({
    closeFunction: () => setIsOpen(false),
  });

  const { mutate } = useMutation<unknown, Blob>({
    mutationFn: async () => {
      const res = await axios.get(
        `${env.url_api}/files/download/${path == '/' ? '' : path}${name}`,
        {
          responseType: 'blob',
        },
      );

      return res.data;
    },
    onSuccess: (data) => {
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', name);
      document.body.appendChild(link);
      link.click();
      toast.success('Descarga iniciada');
    },
    onError: () => {
      toast.error('Error al descargar el archivo');
    },
  });

  return (
    <div className="border-ob-gray-4 flex flex-col rounded-3xl border">
      <div className="max-h-[120px] min-h-[120px] w-full rounded-t-3xl">
        {fileType == FileType.IMAGE && (
          <Image
            src={`${env.api_images}/static/${path}${name}`}
            alt={name}
            width={200}
            height={200}
            className="h-full w-full rounded-t-3xl object-cover"
          />
        )}

        {fileType == FileType.DOCUMENT && (
          <div className="text-ob-gray-2 flex h-full w-full flex-col items-center justify-center gap-y-2 text-wrap">
            <LuFile className="size-7" />
            <p className="max-w-[200px] break-words whitespace-normal">{parseName}</p>
          </div>
        )}
      </div>

      <article className="flex h-full flex-col gap-y-[9px] p-2.5">
        <span className="border-ob-gray-4 text-ob-gray-2 flex max-w-max items-center gap-x-[6px] rounded-full border px-2 py-[3px]">
          {fileType == FileType.IMAGE && <TbPhoto />}
          {fileType == FileType.DOCUMENT && <LuFile />}
          {fileType}
        </span>

        <h3 className="text-ob-white text-sm leading-5 font-medium break-words whitespace-normal">
          {parseName}
        </h3>

        <div className="relative mt-auto flex gap-x-2" ref={ref}>
          <Button className="bg-ob-blue-3 flex w-full items-center justify-center px-2.5 py-2 text-white">
            <LuEye />
            Ver
          </Button>

          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="border-ob-gray-4 text-ob-gray-2 flex w-full items-center justify-center border bg-transparent px-2.5 py-2"
          >
            <FiMoreHorizontal />
            Mas
          </Button>

          <AnimatePresence>
            {isOpen && (
              <motion.div
                className="bg-ob-black-6 border-ob-gray-4 absolute top-full right-0 flex min-w-[220px] flex-col overflow-y-hidden rounded-xl border"
                initial={{
                  height: 0,
                }}
                animate={{
                  height: 'auto',
                  y: 20,
                }}
                exit={{ height: 0 }}
                transition={{ type: 'spring', stiffness: 400, damping: 40 }}
              >
                <button
                  onClick={mutate}
                  className="hover:bg-ob-gray-4 flex cursor-pointer items-center gap-x-2 p-3"
                >
                  <LuDownload /> Descargar
                </button>

                <button className="hover:bg-ob-gray-4 flex cursor-pointer items-center gap-x-2 p-3">
                  <LuFile /> Mover Archivo
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </article>
    </div>
  );
}
