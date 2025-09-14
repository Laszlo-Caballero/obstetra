'use client';
import { useAuth } from '@/components/context/AuthContext';
import Button from '@/components/ui/button/Button';
import { env } from '@/config/env';
import { useMutation } from '@/hooks/useMutation';
import { UserContextData } from '@/interface/auth.interface';
import { Response } from '@/interface/response.interface';
import { ResponseUser } from '@/interface/user.interface';
import { notify } from '@/libs/toast';
import Image from 'next/image';
import React, { useRef } from 'react';
import { MdOutlineFileUpload } from 'react-icons/md';
import { toast } from 'sonner';

interface PhotoProps {
  src?: string;
  nombre?: string;
  apellidoPaterno?: string;
  apellidoMaterno?: string;
  correo?: string;
}

export default function Photo({
  src,
  nombre,
  apellidoPaterno,
  apellidoMaterno,
  correo,
}: PhotoProps) {
  const { setUser, token } = useAuth();

  const ref = useRef<HTMLInputElement>(null);

  const { mutate, data } = useMutation<FormData, Response<UserContextData>>({
    mutationFn: async (formData: FormData) => {
      const res = await fetch(`${env.url_api}/auth/update-foto`, {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      return res.json();
    },
    onSuccess: ({ data }) => {
      setUser({
        ...data,
        token: token,
      });
      localStorage.setItem('obstetra_user', JSON.stringify(data));
      notify.success({ message: 'Foto de perfil actualizada' });
    },
    onError: () => {
      notify.error({ message: 'Error al actualizar la foto de perfil' });
    },
  });

  return (
    <div className="border-ob-gray bg- flex items-center gap-x-3 border-b pb-3">
      <Image
        src={`${env.api_images}${data?.data?.recurso?.url || src}`}
        className="w-16 rounded-full"
        alt="foto de perfil"
        width={64}
        height={64}
      />
      <div className="flex flex-col">
        <span className="text-ob-white font-medium">
          {nombre} {apellidoPaterno} {apellidoMaterno}
        </span>
        <span className="text-ob-gray-2 text-sm font-medium">{correo}</span>
        <div className="mt-2 flex items-center gap-x-2">
          <input
            type="file"
            className="hidden"
            ref={ref}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (!file) return;
              const formData = new FormData();
              formData.append('file', file);
              mutate(formData);
            }}
          />

          <Button className="bg-ob-blue-2 text-ob-lightblue" onClick={() => ref.current?.click()}>
            <MdOutlineFileUpload size={18} className="text-ob-lightblue" />
            Cambiar Foto
          </Button>
        </div>
      </div>
    </div>
  );
}
