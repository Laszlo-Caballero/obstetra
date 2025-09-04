import React from "react";
import Button from "@/components/ui/button/Button";
import Search from "@/components/ui/search/Search";
import Select from "@/components/ui/select/Select";
import SmallCard from "@/components/ui/small-card/SmallCard";
import CrearModulo from "@/modules/ayuda/crear-modulo/CrearModulo";
import CrearTipo from "@/modules/ayuda/crear-tipo/CrearTipo";

import {
  LuHouse,
  LuBookOpen,
  LuLayers,
  LuFlag,
  LuFolderPlus,
  LuPlus,
} from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { FaRegDotCircle } from "react-icons/fa";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { AiOutlineMedicineBox } from "react-icons/ai";
import Modal from "@/components/ui/modal/Modal";
import ButtonModal from "@/components/ui/button-modal/ButtonModal";

import Breadcrums from "@/components/ui/breadcrums/Breadcrums";
export default function AdministrarPage() {
  return (
    <div className="w-full flex flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: "Inicio",
            icon: <LuHouse />,
            href: "/",
          },
          {
            title: "Ayuda",
            href: "/ayuda/administrar",
          },
        ]}
      />

      {/* Titulo */}

      <section className="flex items-center justify-between">
        <div className="flex items-start gap-x-2.5 text-ob-white font-medium">
          <span className="bg-ob-blue-3 p-1 rounded-xl border-3 border-ob-blue">
            <MdOutlineEmail size={16} />
          </span>
          <div className="flex flex-col gap-y-0.5">
            <h2 className="text-xl">Consultas Enviadas</h2>
            <p className="text-sm text-ob-gray-2">
              Aca se listan las consultas realizadas por el usuario
            </p>
          </div>
        </div>
        <Button className="bg-transparent text-ob-white border border-ob-gray">
          <LuBookOpen size={18} />
          Documentación
        </Button>
      </section>

      {/* Tabla */}

      <div className="flex flex-col gap-y-3 bg-ob-black-6 rounded-3xl border border-ob-gray p-4.5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-x-2">
            <Search
              placeholder="Buscar por asunto o ID"
              className={{ container: "bg-ob-black-4 rounded-xl" }}
            />

            {/* Titulo */}

            <section className="flex items-center justify-between">
              <div className="flex items-start gap-x-2.5 text-ob-white font-medium">
                <span className="bg-ob-blue-3 p-1 rounded-xl border-3 border-ob-teal">
                  <MdOutlineEmail size={16} />
                </span>
                <div className="flex flex-col gap-y-0.5">
                  <h2 className="text-xl">Consultas Enviadas</h2>
                  <p className="text-sm text-ob-gray-2">
                    Aca se listan las consultas realizadas por el usuario
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-x-2">
                <ButtonModal
                  className="bg-transparent text-ob-white border border-ob-gray"
                  modal={<Modal />}
                >
                  <LuBookOpen size={18} />
                  Documentación
                </ButtonModal>
                <ButtonModal
                  className="text-ob-black-4 bg-ob-teal"
                  modal={<CrearModulo />}
                >
                  <LuPlus size={18} />
                  Agregar Modulos
                </ButtonModal>
                <ButtonModal
                  className="text-ob-black-4 bg-ob-teal"
                  modal={<CrearTipo />}
                >
                  <LuFolderPlus size={18} />
                  Agregar Tipos de Consulta
                </ButtonModal>
              </div>
            </section>

            {/* Tabla */}

            <div className="flex flex-col gap-y-3 bg-ob-black-6 rounded-3xl border border-ob-gray p-4.5">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-x-2">
                  <Search
                    placeholder="Buscar por asunto o ID"
                    className={{ container: "bg-ob-black-4 rounded-xl" }}
                  />
                  <Select
                    placeholder="Modulo"
                    search="Buscar Modulos..."
                    iconInput={<LuLayers size={18} />}
                    options={[
                      { label: "Obstetras", value: "1" },
                      { label: "Postas", value: "2" },
                    ]}
                  />
                  <Select
                    placeholder="Prioridad"
                    search="Buscar Prioridad..."
                    iconInput={<LuFlag size={18} />}
                    options={[
                      { label: "Alto", value: "1" },
                      { label: "Medio", value: "2" },
                    ]}
                  />
                  <Select
                    placeholder="Estado"
                    search="Buscar Estado..."
                    iconInput={<FaRegDotCircle size={18} />}
                    options={[
                      { label: "Alto", value: "1" },
                      { label: "Medio", value: "2" },
                    ]}
                  />
                </div>
                <span className="bg-ob-black-4 border border-ob-gray rounded-xl py-2 px-3 text-sm">
                  Total: 10
                </span>
              </div>
              <div className=" text-sm border border-ob-gray rounded-3xl overflow-hidden  font-medium text-left">
                <table className="w-full border-collapse">
                  <thead className="bg-ob-blue-3  ">
                    <tr className="text-ob-lightblue ">
                      <th className="p-3">ID</th>
                      <th>Asunto</th>
                      <th>Módulo</th>
                      <th>Prioridad</th>
                      <th>Acciones</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-b border-ob-gray hover:bg-ob-black-4 ">
                      <td className="px-3 py-4 ">#415</td>
                      <td>No puedo crear cita</td>
                      <td>
                        <span className="bg-ob-blue-3 px-2 py-1 rounded-full text-ob-lightblue">
                          Citas
                        </span>
                      </td>
                      <td className="font-medium">
                        <span className="flex items-center gap-x-1.5 text-ob-gray-2 ">
                          <LuFlag size={16} />
                          Media
                        </span>
                      </td>
                      <td>
                        <Button className="bg-ob-blue-3 text-ob-lightblue py-1.5">
                          <FaRegDotCircle size={18} />
                          Editar Estado
                        </Button>
                      </td>
                    </tr>
                    <tr className="border-b border-ob-gray hover:bg-ob-black-4">
                      <td className="p-3 py-4">#415</td>
                      <td>No puedo crear cita</td>
                      <td>
                        <span className="bg-ob-blue-3 px-2 py-1 rounded-full text-ob-lightblue">
                          Laboratorio
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-x-1.5 text-ob-gray-2 ">
                          <LuFlag size={16} />
                          Alta
                        </span>
                      </td>
                      <td>
                        <Button className="bg-ob-blue-3 text-ob-lightblue py-1.5">
                          <FaRegDotCircle size={18} />
                          Editar Estado
                        </Button>
                      </td>
                    </tr>
                    <tr className=" hover:bg-ob-black-4">
                      <td className="p-3 py-4">#415</td>
                      <td>Consulta sobre metas mensuales</td>
                      <td>
                        <span className="bg-ob-blue-3 px-2 py-1 rounded-full text-ob-lightblue">
                          Metas
                        </span>
                      </td>
                      <td>
                        <span className="flex items-center gap-x-1.5 text-ob-gray-2 ">
                          <LuFlag size={16} />
                          Baja
                        </span>
                      </td>
                      <td>
                        <Button className="bg-ob-blue-3 text-ob-lightblue py-1.5">
                          <FaRegDotCircle size={18} />
                          Editar Estado
                        </Button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-ob-gray-2">
                  Mostrando 1-10 de 48
                </span>
                <div className="flex items-center gap-x-2">
                  <span className="border border-ob-gray px-2.5 py-1.5 rounded-md text-sm">
                    1
                  </span>
                  <span className="bg-ob-red px-2.5 py-1.5 rounded-md text-sm">
                    2
                  </span>
                  <span className="border border-ob-gray px-2.5 py-1.5 rounded-md text-sm">
                    3
                  </span>
                  <span className="border border-ob-gray px-2.5 py-1.5 rounded-md text-sm">
                    ...
                  </span>
                  <span className="border border-ob-gray px-2.5 py-1.5 rounded-md text-sm">
                    6
                  </span>
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-y-3 bg-ob-black-6 border border-ob-gray rounded-3xl p-4">
              <span>Preguntas Frecuentes</span>
              <SmallCard
                title="¿Cómo reinicio mi contraseña?"
                description="Ve a Admin > Usuarios > Restablecer Contraseña"
                button="Guia Rapida"
                icon={<IoMdHelpCircleOutline size={18} />}
              />
              <SmallCard
                title="No veo mis metas del Mes"
                description="Revisa los filtros de año/mes en la vista Metas"
                button="Solución"
                icon={<GoGoal size={18} />}
              />
              <SmallCard
                title="Error al Completar Datos del Cliente"
                description='Usa el botón "Completar datos" en Laboratorio y valida campos obligatorios.'
                button="Paso a Paso"
                icon={<AiOutlineMedicineBox size={18} />}
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-y-3 bg-ob-black-6 border border-ob-gray rounded-3xl p-4">
          <span>Preguntas Frecuentes</span>
          <SmallCard
            title="¿Cómo reinicio mi contraseña?"
            description="Ve a Admin > Usuarios > Restablecer Contraseña"
            button="Guia Rapida"
            icon={<IoMdHelpCircleOutline size={18} />}
          />
          <SmallCard
            title="No veo mis metas del Mes"
            description="Revisa los filtros de año/mes en la vista Metas"
            button="Solución"
            icon={<GoGoal size={18} />}
          />
          <SmallCard
            title="Error al Completar Datos del Cliente"
            description='Usa el botón "Completar datos" en Laboratorio y valida campos obligatorios.'
            button="Paso a Paso"
            icon={<AiOutlineMedicineBox size={18} />}
          />
        </div>
      </div>
    </div>
  );
}
