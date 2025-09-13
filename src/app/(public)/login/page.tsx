"use client";
import React, { useRef, useState } from "react";
import Select from "@/components/ui/select/Select";
import Input from "@/components/ui/input/input";
import { LuHeartPulse } from "react-icons/lu";
import { LuShield } from "react-icons/lu";
import { PiSignInBold } from "react-icons/pi";
import { FiHelpCircle } from "react-icons/fi";
import { RiInformationLine } from "react-icons/ri";
import { LuHospital } from "react-icons/lu";
import { Response, ResponsePosta } from "@/interface/response.interface";
import { useQuery } from "@/hooks/useQuery";
import { useForm } from "react-hook-form";
import axios from "axios";
import { zodResolver } from "@hookform/resolvers/zod";
import { AuthSchema } from "@/schemas/auth/auth.schema";
import Link from "next/link";
import { useAuth } from "@/components/context/AuthContext";
import ReCAPTCHA from "react-google-recaptcha";
import { env } from "@/config/env";
import { useMutation } from "@/hooks/useMutation";
import { toast } from "sonner";

export default function LoginPage() {
  const [searchPostaLabel, setSearchPostaLabel] = useState("");
  const [searchPosta, setSearchPosta] = useState("");
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
        throw new Error("No token provided");
      }

      const res = await axios.post(`${url}/auth/verify-captcha`, { token });
      return res.data;
    },
    onSuccess: () => {
      setIsVerified(true);
      toast.success("Captcha verificado");
    },
    onError: () => {
      setIsVerified(false);
      toast.error("Error al verificar el captcha, intenta nuevamente");
    },
  });
  const handleChange = (token: string | null) => {
    mutate(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  return (
    <div className="flex justify-center items-center h-screen font-inter">
      <main className="bg-ob-black-3 border-1 border-ob-gray rounded-3xl w-[520px]">
        <div className="flex justify-between p-5 border-b border-ob-gray">
          <div className="flex items-center gap-x-3">
            <span className="bg-ob-black-2 p-2 rounded-lg">
              <LuHeartPulse size={18} />
            </span>
            <p className="text-lg font-medium"> Portal Obstetrico</p>
          </div>
          <div className="flex justify-center items-center gap-x-2 bg-ob-black-5 rounded-full px-2">
            <span>
              <LuShield className="text-ob-gray-2" size={14} />
            </span>
            <p className="text-xs text-ob-gray-2">Acceso Seguro</p>
          </div>
        </div>
        <form
          className="flex flex-col gap-y-4 p-5"
          onSubmit={handleSubmit((data) => {
            if (!isVerified) {
              toast.error("Por favor verifica el captcha");
              setIsVerified(false);
              return;
            }
            login(data);
          })}
        >
          <div className="flex flex-col">
            <span className="font-medium text-ob-white">Iniciar Sesion</span>
            <p className="text-sm text-ob-gray-2">
              Ingresa tu usuario, contraseña y la posta donde trabaja
            </p>
          </div>

          <Input
            label="Usuario"
            placeholder="tu.ususario@hospital.com"
            id="username"
            {...register("user")}
            error={errors.user?.message}
          />
          <Input
            label="Contraseña"
            placeholder="••••••••"
            id="password"
            type="password"
            {...register("password")}
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
            value={watch("posta")}
            onChange={(value) => {
              setValue("posta", value);
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
            sitekey={env.site_key || ""}
            onChange={handleChange}
            onExpired={handleExpired}
            ref={refCaptcha}
          />

          <div className="flex gap-x-3 text-sm">
            <button
              type="submit"
              className="flex items-center justify-center w-[372px] disabled:bg-ob-lightblue bg-ob-blue p-2.5 rounded-md gap-x-2"
            >
              <span>
                <PiSignInBold size={18} />
              </span>
              <p>Entrar</p>
            </button>
            <Link
              href="public/ayuda"
              className="flex items-center justify-center w-[94px] border border-ob-gray rounded-md gap-x-2"
            >
              <span>
                <FiHelpCircle size={18} />
              </span>
              <p>Ayuda</p>
            </Link>
          </div>
        </form>
        <div className="p-4 border-t border-ob-gray">
          <div className="flex items-center justify-center gap-x-2">
            <span>
              <RiInformationLine className="text-ob-gray-2" size={16} />
            </span>
            <p className="text-sm text-ob-gray-2">
              ¿Olvidaste tu contraseña? Contacta al Administrador
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
