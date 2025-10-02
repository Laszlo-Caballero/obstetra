'use client';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import Table from '@/components/ui/table-without-context/Table';
import { useDrop } from '@/hooks/useDrop';
import { useMutation } from '@/hooks/useMutation';
import { Response, ResponseGaleria } from '@/interface/response.interface';
import { FilesSchema, FilesSchemaType } from '@/schemas/galeria/files.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import axios from 'axios';
import { usePathname } from 'next/navigation';
import React from 'react';
import { useForm } from 'react-hook-form';
import { LuCloudUpload, LuFile, LuUpload, LuX } from 'react-icons/lu';
import { RiDeleteBin6Line } from 'react-icons/ri';
import { useGalery } from '../context/GaleryContext';
import { notify } from '@/libs/toast';

interface SubirArchivosProps {
  onClose?: () => void;
}

export default function SubirArchivos({ onClose }: SubirArchivosProps) {
  const pathName = usePathname();

  const parsePath = pathName?.replace('/galeria', '') || '';

  const { setData } = useGalery();

  const { setValue, watch, handleSubmit } = useForm({
    resolver: zodResolver(FilesSchema),
  });

  const { inputProps, divProps } = useDrop({
    onDrop: (files) => {
      const existingFiles = watch('files') || [];
      setValue('files', [...existingFiles, ...files], { shouldValidate: true });
    },
  });

  const { mutate } = useMutation<FilesSchemaType, Response<ResponseGaleria>>({
    mutationFn: async (data, url) => {
      const formData = new FormData();
      data.files.forEach((file) => {
        formData.append('files', file);
      });

      const res = await axios.post(`${url}/files/upload${parsePath}`, formData);
      return res.data;
    },
    onSuccess: (data) => {
      notify.success({ message: 'Archivos subidos correctamente' });
      setData(data.data);
      onClose?.();
    },
    onError: () => {
      notify.error({ message: 'Error al subir los archivos' });
    },
  });

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Subir Archivos">
          <LuUpload size={20} />
        </ModalTitle>

        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <form onSubmit={handleSubmit(mutate)}>
        <ModalContent>
          <Input
            label="Carpeta Destino"
            id="folder"
            value={parsePath.replaceAll('%20', ' ') || '/'}
            disabled
          />

          <input {...inputProps} />
          <div
            {...divProps}
            className="bg-ob-blue-3 border-ob-gray-4 flex min-h-[132px] w-full cursor-pointer flex-col items-center justify-center gap-y-2.5 rounded-xl border-2 p-[26px] text-white"
          >
            <LuCloudUpload size={28} />
            <p className="font-semibold">Arrastra y suelta tus archivos aquí</p>
            <p className="text-ob-gray-2 text-sm">o haz click para seleccionar</p>
          </div>

          <Table
            initialData={[]}
            data={watch('files') || []}
            columns={[
              {
                header: 'Nombre del Archivo',
                cell({ row }) {
                  return (
                    <span className="text-ob-white flex items-center gap-x-1 text-xs">
                      <LuFile />
                      {row.name}
                    </span>
                  );
                },
              },
              {
                header: 'Tamaño',
                cell({ row }) {
                  return (
                    <span className="text-ob-white">{(row.size / 1024 / 1024).toFixed(2)} MB</span>
                  );
                },
              },
              {
                header: '',
                cell({ row }) {
                  return (
                    <button
                      type="button"
                      onClick={() => {
                        const existingFiles = watch('files') || [];
                        const newFiles = existingFiles.filter((f) => f !== row);
                        setValue('files', newFiles, { shouldValidate: true });
                      }}
                    >
                      <RiDeleteBin6Line size={18} className="text-ob-red-500" />
                    </button>
                  );
                },
              },
            ]}
          />
        </ModalContent>

        <ModalFooter>
          <ContainerButton className="w-full">
            <CloseButton>Cancelar</CloseButton>

            <Button className="bg-ob-teal font-semibold text-white">
              <LuUpload size={18} />
              Subir Archivos
            </Button>
          </ContainerButton>
        </ModalFooter>
      </form>
    </Modal>
  );
}
