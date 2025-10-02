'use client';
import React, { useRef, useState } from 'react';
import Select from '@/components/ui/select/Select';
import Input from '@/components/ui/input/input';
import { LuHeartPulse } from 'react-icons/lu';
import { LuShield } from 'react-icons/lu';
import { PiSignInBold } from 'react-icons/pi';
import { FiHelpCircle } from 'react-icons/fi';
import { RiInformationLine } from 'react-icons/ri';
import { LuHospital } from 'react-icons/lu';
import { Response, ResponsePosta } from '@/interface/response.interface';
import { useQuery } from '@/hooks/useQuery';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { zodResolver } from '@hookform/resolvers/zod';
import { AuthSchema } from '@/schemas/auth/auth.schema';
import Link from 'next/link';
import { useAuth } from '@/components/context/AuthContext';
import ReCAPTCHA from 'react-google-recaptcha';
import { env } from '@/config/env';
import { useMutation } from '@/hooks/useMutation';
import { notify } from '@/libs/toast';

export default function LoginPage() {
  const [searchPostaLabel, setSearchPostaLabel] = useState('');
  const [searchPosta, setSearchPosta] = useState('');
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const { login } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(AuthSchema),
  });
  const [isVerified, setIsVerified] = useState(false);
  const refCaptcha = useRef<ReCAPTCHA>(null);

  const { data } = useQuery<Response<ResponsePosta[]>>({
    queryFn: async (url) => {
      const res = await axios.get(`${url}/posta/search/${searchPosta}`);
      return res.data;
    },
    firstRender: false,
    dependencies: [searchPosta],
  });

  const { mutate } = useMutation({
    disableLoader: true,
    mutationFn: async (token: string | null, url) => {
      if (!token) {
        throw new Error('No token provided');
      }

      const res = await axios.post(`${url}/auth/verify-captcha`, { token });
      return res.data;
    },
    onSuccess: () => {
      setIsVerified(true);
      notify.success({
        message: 'Captcha verificado',
      });
    },
    onError: () => {
      setIsVerified(false);
      notify.error({
        message: 'Error al verificar el captcha, intenta de nuevo',
      });
    },
  });
  const handleChange = (token: string | null) => {
    mutate(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  return (
    <div className="font-inter flex h-screen items-center justify-center">
      <main className="bg-ob-black-3 border-ob-gray w-[520px] rounded-3xl border-1">
        <div className="border-ob-gray flex justify-between border-b p-5">
          <div className="flex items-center gap-x-3">
            <span className="bg-ob-black-2 rounded-lg p-2">
              <LuHeartPulse size={18} />
            </span>
            <p className="text-lg font-medium"> Portal Obstetrico</p>
          </div>
          <div className="bg-ob-black-5 flex items-center justify-center gap-x-2 rounded-full px-2">
            <span>
              <LuShield className="text-ob-gray-2" size={14} />
            </span>
            <p className="text-ob-gray-2 text-xs">Acceso Seguro</p>
          </div>
        </div>
        <form
          className="flex flex-col gap-y-4 p-5"
          onSubmit={handleSubmit((data) => {
            if (!isVerified) {
              notify.error({
                message: 'Por favor verifica el captcha',
              });
              setIsVerified(false);
              return;
            }
            login(data);
          })}
        >
          <div className="flex flex-col">
            <span className="text-ob-white font-medium">Iniciar Sesion</span>
            <p className="text-ob-gray-2 text-sm">
              Ingresa tu usuario, contraseña y la posta donde trabaja
            </p>
          </div>

          <Input
            label="Usuario"
            placeholder="tu.ususario@hospital.com"
            id="username"
            {...register('user')}
            error={errors.user?.message}
          />
          <Input
            label="Contraseña"
            placeholder="••••••••"
            id="password"
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />

          <Select
            label="Posta"
            placeholder="Selecciona la posta donde trabajas"
            search={searchPostaLabel}
            icon={<LuHospital className="text-ob-white" size={18} />}
            options={
              data?.data
                ? data?.data.map((item) => ({
                    label: item.nombre,
                    value: item.postaId.toString(),
                  }))
                : []
            }
            value={watch('posta')}
            onChange={(value) => {
              setValue('posta', value);
            }}
            onSearch={(value) => {
              setSearchPostaLabel(value);
              if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
              }
              timeoutRef.current = setTimeout(() => {
                setSearchPosta(value);
              }, 300);
            }}
            error={errors.posta?.message}
          />

          <ReCAPTCHA
            sitekey={env.site_key || ''}
            onChange={handleChange}
            onExpired={handleExpired}
            ref={refCaptcha}
          />

          <div className="flex gap-x-3 text-sm">
            <button
              type="submit"
              className="disabled:bg-ob-lightblue bg-ob-blue flex w-[372px] items-center justify-center gap-x-2 rounded-md p-2.5"
            >
              <span>
                <PiSignInBold size={18} />
              </span>
              <p>Entrar</p>
            </button>
            <Link
              href="public/ayuda"
              className="border-ob-gray flex w-[94px] items-center justify-center gap-x-2 rounded-md border"
            >
              <span>
                <FiHelpCircle size={18} />
              </span>
              <p>Ayuda</p>
            </Link>
          </div>
        </form>
        <div className="border-ob-gray border-t p-4">
          <div className="flex items-center justify-center gap-x-2">
            <span>
              <RiInformationLine className="text-ob-gray-2" size={16} />
            </span>
            <p className="text-ob-gray-2 text-sm">
              ¿Olvidaste tu contraseña? Contacta al Administrador
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
