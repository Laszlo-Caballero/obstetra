import React from 'react'
import Breadcrums from '@/components/ui/breadcrums/Breadcrums'
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/Select';
import { LuHouse, LuBookOpen, LuLayers, LuFlag, LuPhone } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { RxText } from "react-icons/rx";
import { IoMdHelpCircleOutline } from "react-icons/io";

export default function page() {
    return (
        <div className='w-full p-5 flex flex-col gap-y-4'>
            <Breadcrums
                items={[
                    {
                        title: "Inicio",
                        icon: <LuHouse />,
                        href: "/",
                    },
                    {
                        title: "Ayuda",
                        href: "/ayuda/consulta",
                    },
                    ]}
            />

            {/* Titulo */}

            <section className='flex items-center justify-between'>
                <div className='flex items-start  gap-x-2.5'>
                    <span className="bg-ob-blue-3 rounded-xl border-3 border-ob-blue p-1">
                        <MdOutlineEmail className=" text-ob-white" size={16} />
                    </span>
                    <div className='flex flex-col gap-y-0.5 font-medium'>
                        <h2 className='text-ob-white text-xl'>
                            Enviar una Consulta
                        </h2>
                        <p className='text-ob-gray-2 text-sm'>
                            Completa un formulario y nuestro equipo te responderá en brevedad
                        </p>
                    </div>
                </div>
                <Button className='bg-transparent text-ob-white border border-ob-gray'>
                    <LuBookOpen size={18}/>
                    Documentación
                </Button>
            </section>

            {/* Formulario */}

            {/* <form className='bg-ob-black-6 border border-ob-gray rounded-3xl p-4'>
                <div className='grid grid-cols-2 gap-3'>
                    <Input
                    placeholder='Breve descripción del Problema'
                    label='Asunto'
                    id='issue'
                    className={{label: "text-sm"}}
                    icon= {<LuLayers className="text-ob-white" size={18}/>}
                    >
                        <RxText size={28} className='pl-3' />
                    </Input>
                    <Select
                        label="Módulo Relacionado"
                        placeholder="Seleccionar Modulo"
                        search="Buscar Módulos..."
                        className={{label: "text-sm"}}
                        icon={<LuLayers className="text-ob-white" size={18} />}
                        options={[
                                    { label: "Perfil", value: "1" },
                                    { label: "Postas", value: "2" },
                                ]}
                    />
                    <Select
                        label="Prioridad"
                        placeholder="Seleccionar Prioridad"
                        search="Buscar Prioridad..."
                        className={{label: "text-sm"}}
                        icon={<LuFlag className="text-ob-white" size={18} />}
                        options={[
                                    { label: "Alta", value: "1" },
                                    { label: "Baja", value: "2" },
                                ]}
                    />
                    <Select
                        label="Tipo de Consulta"
                        placeholder="Seleccionar Consulta"
                        search="Buscar Consulta..."
                        className={{label: "text-sm"}}
                        icon={<IoMdHelpCircleOutline className="text-ob-white" size={18} />}
                        options={[
                                    { label: "Soporte Técnico", value: "1" },
                                    { label: "asdad", value: "2" },
                                ]}
                    />
                    <Input
                    placeholder='nombre@ejemplo.com'
                    label='Correo de contacto'
                    id='email'
                    className={{label: "text-sm"}}
                    icon= {<LuLayers className="text-ob-white" size={18}/>}
                    >
                        <MdOutlineEmail size={28} className='pl-3' />
                    </Input>
                    <Input
                    placeholder='+51 999 999 999'
                    label='Teléfono (opcional)'
                    id='phone'
                    className={{label: "text-sm"}}
                    >
                        <LuPhone size={28} className='pl-3' />
                    </Input>
                </div>
            </form> */}

        </div>
    )
}
