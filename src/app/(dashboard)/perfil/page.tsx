import React from 'react'
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/Select';

import { LuUser, LuUserCog, LuSave } from "react-icons/lu";
import { GoHome, GoGear } from "react-icons/go";
import { RiArrowDropDownLine } from "react-icons/ri";
import { IoIosArrowForward } from "react-icons/io";
import { LiaUndoAltSolid } from "react-icons/lia";
import { MdOutlineFileUpload } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";

export default function Perfilpage() {
    return (
        <div className='w-full h-full'>
            <header className='flex items-center justify-between bg-ob-black-3 px-5 py-2.5 border-b border-ob-gray'>
                <div className='flex items-center gap-x-3'>
                    <span className='bg-ob-blue-2 rounded-xl border-2 border-ob-blue p-1'>
                        <LuUser size={16} className='text-ob-white'/>
                    </span>
                    <p className='text-ob-white font-medium text-lg'> 
                        Perfil de Usuario
                    </p>
                </div>
                <div className='flex items-center bg-ob-blue-2 gap-x-2.5 px-2.5 py-1.5 cursor-pointer rounded-xl'>
                    <img src="https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg" className='w-6 rounded-full' />
                    <span className='text-ob-lightblue font-medium text-sm'>
                        Admin
                    </span>
                    <RiArrowDropDownLine size={18}/>
                </div>
            </header>
            <main className='p-5 flex flex-col gap-y-4'>

                {/* breadcrumbs */}

                <div className='flex items-center gap-x-2'>
                    <span className='flex items-center gap-x-2'>
                        <GoHome className=' text-ob-gray-2 ' size={16}/>
                        <p className='text-ob-gray-2 text-sm font-medium'>
                            Inicio
                        </p>
                    </span>
                    <IoIosArrowForward className='text-ob-gray-2' size={16}/>
                    <span className='flex items-center gap-x-2'>
                        <GoGear className=' text-ob-gray-2' size={16}/>
                        <p className='text-ob-gray-2 text-sm font-medium'>
                            Admin
                        </p>
                    </span>
                    <IoIosArrowForward className='text-ob-gray-2' size={16}/>
                    <span className='flex items-center gap-x-2'>
                        <p className='text-ob-white text-sm font-medium'>
                            Perfil
                        </p>
                    </span>
                </div>

                {/* Titulo */}

                <div className='flex items-center justify-between'>
                    <div className='flex items-start gap-x-2.5'>
                        <span className='bg-ob-blue-2 rounded-xl border-2 border-ob-blue p-1'>
                            <LuUserCog className=' text-ob-white' size={16}/>
                        </span>
                        <div className='flex flex-col gap-y-0.5'>
                            <p className='text-ob-white font-medium text-xl'>
                                Ver y Editar Perfil
                            </p>
                            <span className='text-ob-gray-2 text-sm font-medium'>
                                Actualiza tu informacion personal, credenciales y preferencias.
                            </span>
                        </div>
                    </div>
                    <div className='flex gap-x-1.5'>
                        <Button text='Deshacer' icon={<LiaUndoAltSolid className='text-ob-white' size={18} />} className={{button:"bg-transparent border border-ob-gray",text: "text-ob-white"}} />

                        <Button text='Guardar Cambios' icon={<LuSave size={18} className='text-ob-black-6' />} />
                    </div>
                </div>

                {/* Cards */}

                <div className='bg-ob-black-3 p-4 rounded-3xl border border-ob-gray'>
                    <div className='flex items-center gap-x-3 border-b border-ob-gray pb-3'>
                        <img src="https://i.pinimg.com/736x/69/d4/f5/69d4f553a801270cc080e78402855353.jpg" className='w-16 rounded-full' />
                        <div className='flex flex-col '>
                            <span className='text-ob-white font-medium'>
                                Admin
                            </span>
                            <span className='text-ob-gray-2 text-sm font-medium'>
                                admin@salud.gov
                            </span>
                            <div className='flex items-center gap-x-2 mt-2'>
                                <Button text='Cambiar Foto' icon={<MdOutlineFileUpload size={18} className='text-ob-lightblue'/>} className={{button:"bg-ob-blue-2",text: "text-ob-lightblue"}} />
                                <Button text='Quitar' icon={<FaRegTrashAlt  size={18} className='text-ob-white'/>} className={{button:"bg-transparent border border-ob-gray",text: "text-ob-white"}} />
                            </div>
                        </div>
                    </div>
                    <div className='grid grid-cols-2 gap-x-3 gap-y-2 mt-3'>
                        <div className='flex flex-col gap-y-1'>
                            <span className='text-ob-gray-2 text-xs font-medium'>
                                Rol
                            </span>
                            <span className='text-ob-white text-sm font-medium'>
                                Administrador
                            </span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <span className='text-ob-gray-2 text-xs font-medium'>
                                Dni
                            </span>
                            <span className='text-ob-white text-sm font-medium'>
                                12345678
                            </span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <span className='text-ob-gray-2 text-xs font-medium'>
                                Estado
                            </span>
                            <span className='text-ob-white text-sm font-medium'>
                                Activo
                            </span>
                        </div>
                        <div className='flex flex-col gap-y-1'>
                            <span className='text-ob-gray-2 text-xs font-medium'>
                                Telefono
                            </span>
                            <span className='text-ob-white text-sm font-medium'>
                                +51 987 654 321
                            </span>
                        </div>
                    </div>
                </div>

                    {/* Formulario  */}

                <form>
                    <div >
                        <span className='text-ob-white font-medium text-sm'>
                            Información Personal
                        </span>
                        <div className='grid grid-cols-2 gap-3'>
                            <Input label='Nombres' placeholder='Ñepito' id='name' className={{label:'text-sm'}} />
                            <Input label='Apellidos' placeholder='Ñispe' id='lastname' className={{label:'text-sm'}} />
                            <Input label='Correo Institucional' placeholder='admin@salud.gob' id='email'className={{label:'text-sm'}} />
                            <Select label='Establecimiento (Posta)' placeholder='Seleccionar Posta' search='Buscar Postas...' options={[
                                { label: "Posta Central - Turno Mañana", value: "1" },
                                { label: "Posta Central - Turno Noche", value: "2" },
                            ]}/>
                            <Select label='Especialidad' placeholder='Seleccionar Especialidad' search='Buscar Especialidades...' options={[
                                { label: "Medicina Reproductiva", value: "1" },
                                { label: "Oncología", value: "2" },
                            ]}/>
                            <Input label='Telefono' placeholder='+51 987 654 321' id='phone' className={{label:'text-sm'}} />
                        </div>
                    </div>
                    <div></div>
                </form>
            </main>
        </div>
    )
}
