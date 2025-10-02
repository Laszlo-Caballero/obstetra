'use client';
import Button from '@/components/ui/button/Button';
import { useMutation } from '@/hooks/useMutation';
import { notify } from '@/libs/toast';
import axios from 'axios';
import React from 'react';
import { LuDownload } from 'react-icons/lu';

export default function ExportButton() {
  const { mutate } = useMutation<unknown, Blob>({
    mutationFn: async (_, urlApi) => {
      const res = await axios.get(`${urlApi}/posta/export`, {
        responseType: 'blob',
      });

      return res.data;
    },
    onSuccess: (data) => {
      notify.success({ message: 'Exportando postas' });
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement('a');
      link.href = url;
      const now = new Date();

      const day = String(now.getDate()).padStart(2, '0');
      const month = String(now.getMonth() + 1).padStart(2, '0');
      const year = now.getFullYear();

      link.setAttribute('download', `Posta-${year}-${month}-${day}.xlsx`);
      document.body.appendChild(link);
      link.click();
    },
  });

  return (
    <Button
      onClick={() => mutate()}
      className="border-ob-gray max-h-10 rounded-[6px] border bg-transparent text-white"
    >
      <LuDownload /> Exportar
    </Button>
  );
}
