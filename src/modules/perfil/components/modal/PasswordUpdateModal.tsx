'use client';

import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import Modal from '@/components/ui/modal/Modal';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import { PasswordUpdateSchema, PasswordUpdateSchemaType } from '@/schemas/profile/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { LuSave, LuX } from 'react-icons/lu';
import axios from '@/libs/axios';
import { env } from '@/config/env';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useState } from 'react';

interface PasswordUpdateModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PasswordUpdateModal({ isOpen, onClose }: PasswordUpdateModalProps) {
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<PasswordUpdateSchemaType>({
    resolver: zodResolver(PasswordUpdateSchema),
  });

  const onSubmit = async (data: PasswordUpdateSchemaType) => {
    setLoading(true);
    try {
      const token = Cookies.get('obstetra_token');
      await axios.patch(
        `${env.url_api}/auth/update-password`,
        {
          previousPassword: data.previousPassword,
          newPassword: data.newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      toast.success('Contraseña actualizada correctamente');
      reset();
      onClose();
    } catch (error: any) {
      console.error(error);
      toast.error(error.response?.data?.message || 'Error al actualizar la contraseña');
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Actualizar Contraseña" />
        <button onClick={onClose}>
          <LuX className="text-ob-gray-2" size={20} />
        </button>
      </ModalHeader>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalContent className="flex flex-col gap-y-4">
          <Input
            label="Contraseña Actual"
            type="password"
            placeholder="********"
            id="previousPassword"
            className={{ label: 'text-sm' }}
            {...register('previousPassword')}
            error={errors.previousPassword?.message}
          />
          <Input
            label="Nueva Contraseña"
            type="password"
            placeholder="********"
            id="newPassword"
            className={{ label: 'text-sm' }}
            {...register('newPassword')}
            error={errors.newPassword?.message}
          />
          <Input
            label="Confirmar Contraseña"
            type="password"
            placeholder="********"
            id="confirmPassword"
            className={{ label: 'text-sm' }}
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
        </ModalContent>
        <ModalFooter>
          <Button
            type="button"
            className="border-ob-gray text-ob-white border bg-transparent"
            onClick={onClose}
            disabled={loading}
          >
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            <LuSave size={18} className="text-ob-black-6" />
            {loading ? 'Guardando...' : 'Guardar Cambios'}
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
