'use client';
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/Select';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import React from 'react';
import { LuSave, LuImageUp, LuUser, LuLock, LuUserCheck, LuFileText } from 'react-icons/lu';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { UserCreateSchema, UserCreateSchemaType } from '@/schemas/usuarios/user.schema';
import { useDrop } from '@/hooks/useDrop';
import Image from 'next/image';
import { useMutation } from '@/hooks/useMutation';
import axios from 'axios';
import { notify } from '@/libs/toast';
import { useRouter } from 'next/navigation';
import { useCreateUserOptions } from '../hooks/useCreateUserOptions';
import { Recurso } from '@/interface/auth.interface';
import { Response } from '@/interface/response.interface';
import PasswordModal from './modal/PasswordModal';
import { useState } from 'react';
import { useAuth } from '@/components/context/AuthContext';

export default function UserCreateForm() {
  const router = useRouter();
  const { roles, personal, isLoading } = useCreateUserOptions();
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const { token } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = useForm<UserCreateSchemaType>({
    resolver: zodResolver(UserCreateSchema),
  });

  const { divProps, inputProps } = useDrop({
    onDrop(file) {
      const firstFile = file[0];
      if (firstFile) {
        setValue('foto', firstFile);
      }
    },
  });

  const watchPersonal = watch('personalId');
  const watchRole = watch('roleId');

  const { mutate, isLoading: isPending } = useMutation<UserCreateSchemaType>({
    mutationFn: async (data, urlApi) => {
      const { foto, ...userData } = data;
      let recursoId = userData.recursoId;

      if (foto) {
        const formData = new FormData();
        formData.append('file', foto);
        formData.append('destination', 'usuarios'); // Assuming 'usuarios' destination or generic

        const res = await axios.post<Response<Recurso>>(`${urlApi}/recurso/one`, formData, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        recursoId = res.data.data.recursoId;
      }

      const payload = {
        ...userData,
        personalId: parseInt(userData.personalId),
        roleId: parseInt(userData.roleId),
        recursoId: recursoId,
      };

      return axios.post(`${urlApi}/auth/register`, payload, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
    },
    onSuccess: () => {
      notify.success({
        message: 'Usuario creado con éxito',
      });
      router.push('/usuarios');
    },
    onError: () => {
      notify.error({
        message: 'Error al crear el usuario',
      });
    },
  });

  return (
    <form className="flex flex-col gap-y-4" onSubmit={handleSubmit((data) => mutate(data))}>
      <InfoContainer>
        <div className="flex items-center justify-between text-sm">
          <span className="text-ob-white">Información de Cuenta</span>
          <span className="text-ob-gray-2">Credenciales de acceso</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Input
            label="Usuario"
            id="user"
            placeholder="Nombre de usuario"
            className={{ label: 'text-ob-white text-sm' }}
            icon={<LuUser />}
            {...register('user')}
            error={errors.user?.message}
          />
          <div className="flex flex-col gap-y-1.5">
            <label className="text-ob-white text-sm font-medium">Contraseña</label>
            {watch('password') ? (
              <div className="border-ob-gray bg-ob-black-4 flex items-center justify-between rounded-xl border px-3 py-2.5">
                <div className="text-ob-gray-2 flex items-center gap-2">
                  <LuLock />
                  <span>••••••••</span>
                </div>
                <Button
                  className="text-ob-teal hover:text-ob-teal-2 h-auto bg-transparent p-0 text-xs"
                  onClick={(e) => {
                    e.preventDefault();
                    setShowPasswordModal(true);
                  }}
                >
                  Cambiar
                </Button>
              </div>
            ) : (
              <Button
                className="border-ob-gray bg-ob-black-4 text-ob-gray-2 hover:bg-ob-black-3 w-full justify-start border"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPasswordModal(true);
                }}
              >
                <LuLock className="mr-2" />
                Crear contraseña
              </Button>
            )}
            {errors.password && (
              <span className="text-sm text-red-500">{errors.password.message}</span>
            )}
          </div>
        </div>
      </InfoContainer>

      {showPasswordModal && (
        <PasswordModal
          onClose={() => setShowPasswordModal(false)}
          onConfirm={(password) => {
            setValue('password', password);
            setShowPasswordModal(false);
          }}
        />
      )}

      <InfoContainer>
        <div className="flex items-center justify-between text-sm">
          <span className="text-ob-white">Asignación</span>
          <span className="text-ob-gray-2">Vincular con personal y rol</span>
        </div>
        <div className="grid grid-cols-2 gap-3">
          <Select
            label="Personal"
            placeholder="Seleccionar Personal"
            className={{ label: 'text-ob-white text-sm' }}
            options={personal.map((p) => ({
              label: `${p.nombre} ${p.apellidoPaterno} ${p.apellidoMaterno}`,
              value: p.personalId.toString(),
            }))}
            onChange={(val) => setValue('personalId', val.value)}
            value={
              watchPersonal
                ? {
                    value: watchPersonal,
                    label: personal.find((p) => p.personalId.toString() === watchPersonal)
                      ? `${personal.find((p) => p.personalId.toString() === watchPersonal)?.nombre} ${personal.find((p) => p.personalId.toString() === watchPersonal)?.apellidoPaterno}`
                      : 'Seleccionar Personal',
                  }
                : undefined
            }
            error={errors.personalId?.message}
          />
          <Select
            label="Rol"
            placeholder="Seleccionar Rol"
            className={{ label: 'text-ob-white text-sm' }}
            options={roles.map((r) => ({
              label: r.roleName,
              value: r.roleId.toString(),
            }))}
            onChange={(val) => setValue('roleId', val.value)}
            value={
              watchRole
                ? {
                    value: watchRole,
                    label: roles.find((r) => r.roleId.toString() === watchRole)?.roleName || '',
                  }
                : undefined
            }
            error={errors.roleId?.message}
          />
        </div>
      </InfoContainer>

      <InfoContainer>
        <div className="flex items-center justify-between text-sm">
          <span className="text-ob-white">Recurso (Opcional)</span>
          <span className="text-ob-gray-2">Archivo adjunto</span>
        </div>
        <div
          {...divProps}
          className="bg-ob-black-4 border-ob-gray flex h-[132px] cursor-pointer items-center justify-center rounded-xl border border-dashed"
        >
          <input {...inputProps} />
          {watch('foto') ? (
            <div className="flex flex-col items-center gap-2">
              <LuFileText size={32} className="text-ob-teal" />
              <span className="text-ob-white text-sm">{(watch('foto') as File).name}</span>
            </div>
          ) : (
            <span className="text-ob-gray-2 flex items-center gap-x-2">
              <LuImageUp size={22} />
              Arrastrar archivo o hacer click para subir
            </span>
          )}
        </div>
        {errors.foto && (
          <span className="text-sm text-red-500">{errors.foto.message as string}</span>
        )}
      </InfoContainer>

      <div className="flex items-center justify-end gap-x-2">
        <Button
          className="border-ob-gray text-ob-white border bg-transparent"
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Cancelar
        </Button>
        <Button className="bg-ob-teal" disabled={isPending}>
          <LuSave size={18} />
          {isPending ? 'Guardando...' : 'Guardar Usuario'}
        </Button>
      </div>
    </form>
  );
}
