import React from "react";
import Button from "@/components/ui/button/Button";
import Input from "@/components/ui/input/input";
import Select from "@/components/ui/select/Select";

import { LuUserCog, LuSave, LuShieldCheck, LuX ,LuCheck } from "react-icons/lu";
import { GoHome, GoGear } from "react-icons/go";
import { LiaUndoAltSolid } from "react-icons/lia";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import Breadcrums from "@/components/ui/breadcrums/Breadcrums";

export default function Perfilpage() {
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
                title: "Admin",
                icon: <GoGear />,
                href: "/",
                },
                {
                title: "Perfil",
                href: "/",
                },
            ]}
            />

            {/* Titulo */}

            <div className="flex items-center justify-between">
            <div className="flex items-start gap-x-2.5">
                <span className="bg-ob-blue-2 rounded-xl border-2 border-ob-blue p-1">
                <LuUserCog className=" text-ob-white" size={16} />
                </span>
                <div className="flex flex-col gap-y-0.5">
                <p className="text-ob-white font-medium text-xl">
                    Ver y Editar Perfil
                </p>
                <span className="text-ob-gray-2 text-sm font-medium">
                    Actualiza tu informacion personal, credenciales y preferencias.
                </span>
                </div>
            </div>
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
            </div>

            {/* Perfil */}

            <div className="bg-ob-black-3 p-4 rounded-3xl border border-ob-gray">
                <div className="flex items-center gap-x-3 border-b border-ob-gray pb-3 bg-">
                    <img
                    src="https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg"
                    className="w-16 rounded-full"
                    />
                    <div className="flex flex-col ">
                        <span className="text-ob-white font-medium">Admin</span>
                        <span className="text-ob-gray-2 text-sm font-medium">
                            admin@salud.gov
                        </span>
                        <div className="flex items-center gap-x-2 mt-2">
                            <Button className="bg-ob-blue-2 text-ob-lightblue">
                                <MdOutlineFileUpload
                                size={18}
                                className="text-ob-lightblue"
                                />
                                Cambiar Foto
                            </Button>
                            <Button className="bg-transparent border border-ob-gray text-ob-white">
                                <FaRegTrashAlt size={18} className="text-ob-white" />
                                Quitar
                            </Button>
                            
                        </div>
                    </div>
                </div>
                <div className="grid grid-cols-2 gap-x-3 gap-y-2 mt-3">
                    <div className="flex flex-col gap-y-1">
                    <span className="text-ob-gray-2 text-xs font-medium">Rol</span>
                    <span className="text-ob-white text-sm font-medium">
                        Administrador
                    </span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                    <span className="text-ob-gray-2 text-xs font-medium">Dni</span>
                    <span className="text-ob-white text-sm font-medium">
                        12345678
                    </span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                    <span className="text-ob-gray-2 text-xs font-medium">Estado</span>
                    <span className="text-ob-white text-sm font-medium">Activo</span>
                    </div>
                    <div className="flex flex-col gap-y-1">
                    <span className="text-ob-gray-2 text-xs font-medium">
                        Telefono
                    </span>
                    <span className="text-ob-white text-sm font-medium">
                        +51 987 654 321
                    </span>
                    </div>
                </div>
            </div>

            {/* Formulario  */}

            <form className="flex flex-col gap-y-4">
                <div className=" flex flex-col gap-y-3 bg-ob-black-3 p-4 rounded-3xl border border-ob-gray">
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
                        label="Apellidos"
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
                </div>
                <div className=" flex flex-col gap-y-3 bg-ob-black-3 p-4 rounded-3xl border border-ob-gray">
                    <span className="text-ob-white font-medium text-sm">
                        Seguridad
                    </span>
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
                </div>
            </form>

            {/* Tabla */}

            <div className=" flex flex-col gap-y-3 bg-ob-black-3 p-4 rounded-3xl border border-ob-gray">
                <span className="text-ob-white font-medium text-sm">
                    Actividad Reciente
                </span>

                <div className="font-medium text-sm border border-ob-gray rounded-3xl overflow-hidden">
                    <table className="w-full">
                        <thead className="bg-ob-blue-2 border-collapse ">
                            <tr className="text-ob-lightblue text-xs rounded-t-3xl text-left">
                                <th className="p-2.5">Fecha</th>
                                <th className="p-2.5">Accion</th>
                                <th className="p-2.5">IP</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="border-b border-ob-gray hover:bg-ob-black-4">
                                <td className="p-2.5">2025-08-12 09:20</td>
                                <td className="p-2.5">Inicio de Sesión</td>
                                <td className="p-2.5">201.160.23.10</td>
                            </tr>
                            <tr className="border-b border-ob-gray hover:bg-ob-black-4">
                                <td className="p-2.5">2025-08-11 13:55</td>
                                <td className="p-2.5">Actualizó perfil</td>
                                <td className="p-2.5">201.160.23.10</td>
                            </tr>
                            <tr className="hover:bg-ob-black-4">
                                <td className="p-2.5">2025-08-10 08:55</td>
                                <td className="p-2.5">Restablecio Contraseña</td>
                                <td className="p-2.5">201.160.23.10</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

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
