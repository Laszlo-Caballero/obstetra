'use client';
import { useAuth } from '@/components/context/AuthContext';
import InputOtp from '@/components/ui/input-otp/InputOtp';
import { OtpSchema } from '@/schemas/auth/otp.schema';
import { zodResolver } from '@hookform/resolvers/zod';
import { redirect } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { LuClock4, LuShieldCheck, LuStethoscope } from 'react-icons/lu';

export default function VerificarOtpPage() {
  const { verifyOtp, user } = useAuth();

  const [timer, setTimer] = useState(120);

  const { setValue, handleSubmit } = useForm({
    resolver: zodResolver(OtpSchema),
  });

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  if (!user) {
    redirect('/login');
  }
  const onSubmit = handleSubmit((data) => {
    const { code_otp } = user;
    verifyOtp({ code: data.code, code_otp });
  });
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center">
      <form
        onSubmit={onSubmit}
        className="bg-ob-black-6 border-ob-gray-4 flex min-w-[520px] flex-col gap-y-5 rounded-3xl border p-[33px]"
      >
        <div className="flex justify-between">
          <span className="flex items-center gap-x-2.5 text-lg">
            <LuStethoscope className="size-5" />
            Portal Obstetrico
          </span>

          <span className="flex items-center gap-x-1.5 p-1.5">
            <LuClock4 />
            {`${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`}
          </span>
        </div>

        <h1 className="text-2xl">Ingresa el código de verificación</h1>
        <p className="text-ob-gray-2 text-wrap">
          Hemos enviado un código de 6 dígitos a tu correo y número móvil registrados.
        </p>

        <section className="grid grid-cols-6 gap-x-2.5">
          <InputOtp
            onChange={(code) => {
              setValue('code', code);
            }}
          />
        </section>

        <div className="flex w-full justify-between">
          <span className="text-ob-gray-2 flex items-center gap-x-2">
            <LuShieldCheck />
            Tu codigo expira en 2 minutos
          </span>

          <button className="cursor-pointer underline">Reenviar código</button>
        </div>

        <button
          className="bg-ob-blue rounded py-3 text-white disabled:cursor-not-allowed disabled:opacity-50"
          disabled={timer === 0}
        >
          Verificar
        </button>
      </form>
    </div>
  );
}
