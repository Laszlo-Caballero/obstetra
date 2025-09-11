import React from "react";
import Image from "next/image";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/input";
import Select from "@/components/ui/select/Select";
import InfoContainer from "@/components/ui/info-container/InfoContainer";
import { LuUserCog, LuSave, LuShieldCheck, LuX, LuCheck } from "react-icons/lu";
import { GoHome } from "react-icons/go";
import { LiaUndoAltSolid } from "react-icons/lia";
import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import { env } from "@/config/env";
import { fetcher } from "@/libs/fetch";
import { ResponseUser } from "@/interface/user.interface";
import Photo from "@/modules/perfil/components/photo/Photo";
import Title from "@/components/ui/title/Title";

export default async function Perfilpage() {
  const cookieStore = await cookies();
  const token = cookieStore.get("obstetra_token")?.value;

  if (!token) {
    return notFound();
  }

  const res = await fetcher<ResponseUser>(`${env.url_api}/auth/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return (
    <div className="w-full h-full">
      <main className="p-5 flex flex-col gap-y-4">
        <Breadcrums
          items={[
            {
              title: "Inicio",
              icon: <GoHome />,
              href: "/",
            },
            {
              title: "Perfil",
              href: "/perfil",
            },
          ]}
        />

        {/* Titulo */}

        <section className="flex items-center justify-between">
          <Title
            title="Ver y Editar Perfil"
            description="Actualiza tu informacion personal, credenciales y preferencias."
            icon={<LuUserCog size={18} />}
          />
          <div className="flex gap-x-1.5">
            <Button className="bg-transparent border border-ob-gray text-ob-white">
              <LiaUndoAltSolid className="text-ob-white" size={18} />
              Deshacer
            </Button>

            <Button>
              <LuSave size={18} className="text-ob-black-6" />
              Guardar Cambios
            </Button>
          </div>
        </section>

        {/* Perfil */}

        <InfoContainer>
          <Photo
            apellidoMaterno={res?.data?.personal.apellidoMaterno}
            apellidoPaterno={res?.data?.personal.apellidoPaterno}
            correo={res?.data?.personal.correo}
            nombre={res?.data?.personal.nombre}
            src={res?.data?.recurso?.url}
          />
          <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">Rol</span>
              <span className="text-ob-white text-sm font-medium">
                {res?.data?.role.roleName}
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">Dni</span>
              <span className="text-ob-white text-sm font-medium">
                {res?.data?.personal.dni}
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">Estado</span>
              <span className="text-ob-white text-sm font-medium">
                {res?.data?.personal.estado ? "Activo" : "Inactivo"}
              </span>
            </div>
            <div className="flex flex-col gap-y-1">
              <span className="text-ob-gray-2 text-xs font-medium">
                Telefono
              </span>
              <span className="text-ob-white text-sm font-medium">
                +51 {res?.data?.personal.telefono.slice(0, 3)}{" "}
                {res?.data?.personal.telefono.slice(3, 6)}{" "}
                {res?.data?.personal.telefono.slice(6)}
              </span>
            </div>
          </div>
        </InfoContainer>

        {/* Formulario  */}

        <form className="flex flex-col gap-y-4">
          <InfoContainer>
            <span className="text-ob-white font-medium text-sm">
              Información Personal
            </span>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Nombres"
                placeholder="Ñepito"
                id="name"
                className={{ label: "text-sm" }}
              />
              <Input
                label="Apellido Paterno"
                placeholder="Ñispe"
                id="lastname"
                className={{ label: "text-sm" }}
              />

              <Input
                label="Apellido Materno"
                placeholder="Ñispe"
                id="lastname"
                className={{ label: "text-sm" }}
              />
              <Input
                label="Correo Institucional"
                placeholder="admin@salud.gob"
                id="email"
                className={{ label: "text-sm" }}
              />
              <Select
                label="Establecimiento (Posta)"
                placeholder="Seleccionar Posta"
                search="Buscar Postas..."
                className={{ label: "text-sm" }}
                options={[
                  { label: "Posta Central - Turno Mañana", value: "1" },
                  { label: "Posta Central - Turno Noche", value: "2" },
                ]}
              />
              <Select
                label="Especialidad"
                placeholder="Seleccionar Especialidad"
                search="Buscar Especialidades..."
                className={{ label: "text-sm" }}
                options={[
                  { label: "Medicina Reproductiva", value: "1" },
                  { label: "Oncología", value: "2" },
                ]}
              />
              <Input
                label="Telefono"
                placeholder="+51 987 654 321"
                id="phone"
                className={{ label: "text-sm" }}
              />
            </div>
          </InfoContainer>
          <InfoContainer>
            <span className="text-ob-white font-medium text-sm">Seguridad</span>
            <div className="grid grid-cols-2 gap-3">
              <Input
                label="Contraseña Actual"
                placeholder="********"
                id="actual-password"
                className={{ label: "text-sm" }}
              />
              <div className="flex flex-col gap-y-2">
                <Input
                  label="Nueva Contraseña"
                  placeholder="********"
                  id="new-password"
                  className={{ label: "text-sm" }}
                />
                <span className="text-ob-gray-2 text-xs font-medium">
                  Minimo 8 caracteres. Usa números y letras
                </span>
              </div>
              <Input
                label="Confirmar Contraseña"
                placeholder="********"
                id="confirm-password"
                className={{ label: "text-sm" }}
              />
            </div>
            <div className="flex justify-end">
              <Button className="bg-ob-blue-2 text-ob-lightblue">
                <LuShieldCheck size={18} className="text-ob-lightblue" />
                Actualizar Contraseña
              </Button>
            </div>
          </InfoContainer>
        </form>

        {/* Botones */}

        <div className="flex justify-end gap-x-3">
          <Button className="bg-transparent border border-ob-gray text-ob-white">
            <LuX size={18} className="text-ob-white" />
            Cancelar
          </Button>
          <Button>
            <LuCheck size={18} className="text-ob-black-6" />
            Guardar Perfil
          </Button>
        </div>
      </main>
    </div>
  );
}
