'use client';

import Button from '@/components/ui/button/Button';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/Select';
import { ResponseUser } from '@/interface/user.interface';
import { ProfileUpdateSchema, ProfileUpdateSchemaType } from '@/schemas/profile/profile.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { LuCheck, LuShieldCheck, LuX } from 'react-icons/lu';
import PasswordUpdateModal from '../modal/PasswordUpdateModal';
import axios from '@/libs/axios';
import { env } from '@/config/env';
import { toast } from 'sonner';
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';

interface ProfileUpdateFormProps {
  user: ResponseUser;
}

export default function ProfileUpdateForm({ user }: ProfileUpdateFormProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<ProfileUpdateSchemaType>({
    resolver: zodResolver(ProfileUpdateSchema),
    defaultValues: {
      nombre: user.personal.nombre,
      apellidoPaterno: user.personal.apellidoPaterno,
      apellidoMaterno: user.personal.apellidoMaterno,
      fechaNacimiento: user.personal.fechaNacimiento
        ? user.personal.fechaNacimiento.replace(/\//g, '-')
        : '',
      sexo: user.personal.sexo,
      telefono: user.personal.telefono,
      dni: user.personal.dni,
      codigoColegio: user.personal.codigoColegio,
      correo: user.personal.correo,
    },
  });

  const onSubmit = async (data: ProfileUpdateSchemaType) => {
    setLoading(true);
    try {
      const token = Cookies.get('obstetra_token');
      const payload = {
        ...data,
        fechaNacimiento: data.fechaNacimiento.replace(/-/g, '/'),
      };
      await axios.put(`${env.url_api}/auth/update-profile`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      toast.success('Perfil actualizado correctamente');
      router.refresh();
    } catch {
      toast.error('Error al actualizar el perfil');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-y-4">
        <InfoContainer>
          <span className="text-ob-white text-sm font-medium">Información Personal</span>
          <div className="grid grid-cols-2 gap-3">
            <Input
              label="Nombres"
              placeholder="Nombres"
              id="nombre"
              className={{ label: 'text-sm' }}
              {...register('nombre')}
              error={errors.nombre?.message}
            />
            <Input
              label="Apellido Paterno"
              placeholder="Apellido Paterno"
              id="apellidoPaterno"
              className={{ label: 'text-sm' }}
              {...register('apellidoPaterno')}
              error={errors.apellidoPaterno?.message}
            />

            <Input
              label="Apellido Materno"
              placeholder="Apellido Materno"
              id="apellidoMaterno"
              className={{ label: 'text-sm' }}
              {...register('apellidoMaterno')}
              error={errors.apellidoMaterno?.message}
            />
            <Input
              label="Correo Institucional"
              placeholder="Correo"
              id="correo"
              className={{ label: 'text-sm' }}
              {...register('correo')}
              error={errors.correo?.message}
            />

            <Input
              label="Fecha de Nacimiento"
              type="date"
              id="fechaNacimiento"
              className={{ label: 'text-sm' }}
              {...register('fechaNacimiento')}
              error={errors.fechaNacimiento?.message}
            />

            <Controller
              control={control}
              name="sexo"
              render={({ field }) => (
                <Select
                  label="Sexo"
                  placeholder="Seleccionar Sexo"
                  className={{ label: 'text-sm' }}
                  options={[
                    { label: 'Masculino', value: 'Masculino' },
                    { label: 'Femenino', value: 'Femenino' },
                  ]}
                  value={{ label: field.value, value: field.value }}
                  onChange={(option) => field.onChange(option.value)}
                  error={errors.sexo?.message}
                  disableSearch
                />
              )}
            />

            <Input
              label="Telefono"
              placeholder="Telefono"
              id="telefono"
              className={{ label: 'text-sm' }}
              {...register('telefono')}
              error={errors.telefono?.message}
            />

            <Input
              label="DNI"
              placeholder="DNI"
              id="dni"
              className={{ label: 'text-sm' }}
              {...register('dni')}
              error={errors.dni?.message}
            />

            <Input
              label="Código Colegio"
              placeholder="Código Colegio"
              id="codigoColegio"
              className={{ label: 'text-sm' }}
              {...register('codigoColegio')}
              error={errors.codigoColegio?.message}
            />
          </div>
        </InfoContainer>

        <InfoContainer>
          <span className="text-ob-white text-sm font-medium">Seguridad</span>
          <div className="flex items-center justify-between">
            <span className="text-ob-gray-2 text-sm">
              Actualiza tu contraseña para mantener tu cuenta segura.
            </span>
            <Button
              type="button"
              className="bg-ob-blue-2 text-ob-lightblue"
              onClick={() => setIsPasswordModalOpen(true)}
            >
              <LuShieldCheck size={18} className="text-ob-lightblue" />
              Actualizar Contraseña
            </Button>
          </div>
        </InfoContainer>

        <div className="flex justify-end gap-x-3">
          <Button
            type="button"
            className="border-ob-gray text-ob-white border bg-transparent"
            onClick={() => router.back()}
          >
            <LuX size={18} className="text-ob-white" />
            Cancelar
          </Button>
          <Button type="submit" disabled={loading}>
            <LuCheck size={18} className="text-ob-black-6" />
            {loading ? 'Guardando...' : 'Guardar Perfil'}
          </Button>
        </div>
      </form>

      <PasswordUpdateModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
      />
    </>
  );
}
