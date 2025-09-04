import React from 'react'
import Breadcrums from '@/components/ui/breadcrums/Breadcrums'
import Button from '@/components/ui/button/Button';
import Input from '@/components/ui/input/input';
import Select from '@/components/ui/select/Select';
import TextArea from '@/components/ui/textarea/Textarea';
import SmallCard from '@/components/ui/small-card/SmallCard';
import { LuHouse, LuBookOpen, LuLayers, LuFlag, LuPhone, LuPaperclip, LuX, LuSend } from "react-icons/lu";
import { MdOutlineEmail } from "react-icons/md";
import { RxText } from "react-icons/rx";
import { IoMdHelpCircleOutline } from "react-icons/io";
import { GoGoal } from "react-icons/go";
import { AiOutlineMedicineBox } from "react-icons/ai";
import Badge from '@/components/ui/badge/Badge';

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

            <form className='bg-ob-black-6 border border-ob-gray rounded-3xl p-4'>
                <div className='grid grid-cols-2 gap-3'>
                    <div className='flex flex-col gap-y-1.5'>
                        <Input
                        placeholder='Breve descripción del Problema'
                        label='Asunto'
                        id='issue'
                        className={{label: "text-sm"}}
                        icon= {<RxText className="text-ob-white" size={18}/>}
                        />
                        <span className='text-xs text-ob-gray-2' >
                            Se especifico. Ej. No puedo crear una cita
                        </span>
                    </div>
                    <div className='flex flex-col gap-y-1.5'>
                        <Select
                            label="Módulo Relacionado"
                            placeholder="Seleccionar Modulo"
                            search="Buscar Módulos..."
                            className={{label: "text-sm"}}
                            iconInput={<LuLayers className="text-ob-white" size={18} />}
                            options={[
                                { label: "Perfil", value: "1" },
                                { label: "Postas", value: "2" },
                            ]}
                        />
                        <span className='text-xs text-ob-gray-2' >
                            Obstetras, Admin, Citas, Laboratorio, Metas.
                        </span>
                    </div>
                    <Select
                        label="Prioridad"
                        placeholder="Seleccionar Prioridad"
                        search="Buscar Prioridad..."
                        className={{label: "text-sm"}}
                        iconInput={<LuFlag className="text-ob-white" size={18} />}
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
                        iconInput={<IoMdHelpCircleOutline  size={18} />}
                        options={[
                                    { label: "Soporte Técnico", value: "1" },
                                    { label: "asdad", value: "2" },
                                ]}
                    />
                    <div className='flex flex-col gap-y-1.5 col-start-1 col-end-3'>
                        <TextArea
                        placeholder='Describe lo ocurrido'
                        label='Descripción'
                        id='description'
                        className={{label: "text-sm"}}
                        rows={5}
                        />
                        <span className='text-xs text-ob-gray-2' >
                            Incluye capturas de pantalla o mensajes de error si los tienes
                        </span>
                    </div>

                    <Input
                    placeholder='nombre@ejemplo.com'
                    label='Correo de contacto'
                    id='email'
                    className={{label: "text-sm"}}
                    icon= {<MdOutlineEmail size={18}/>}
                    />
                        
                    <Input
                    placeholder='+51 999 999 999'
                    label='Teléfono (opcional)'
                    id='phone'
                    className={{label: "text-sm"}}
                    icon={<LuPhone size={18} />}
                    />
                </div>
                <div className='flex flex-col gap-y-1.5 py-4'>
                        <span className='text-sm text-ob-gray-2'>
                            Adjuntos
                        </span>
                        <div className='flex items-center gap-x-2'>
                            <Button className='bg-ob-blue-2 text-ob-lightblue text-sm'>
                                <LuPaperclip size={18}/>
                                Subir Archivos
                            </Button>
                            <span className='text-sm text-ob-gray-2'>
                                PNG, JPG o PDF, máx. 10MB
                            </span>
                        </div>
                    </div>
                    <div className='flex items-center justify-between pt-4 border-t border-ob-gray'>
                        <Button className='bg-transparent border border-ob-gray text-ob-white'>
                            <LuX size={18}/>
                            Cancelar
                        </Button>
                        <Button>
                            <LuSend />
                            Enviar Consulta
                        </Button>
                    </div>
            </form> 
            <div className='flex flex-col gap-y-3 bg-ob-black-6 border border-ob-gray rounded-3xl p-4'>
                <span>Preguntas Frecuentes</span>
                <SmallCard
                    title='¿Cómo reinicio mi contraseña?'
                    description='Ve a Admin > Usuarios > Restablecer Contraseña'
                    icon={<IoMdHelpCircleOutline  size={18} />}
                >
                    <Badge className='bg-ob-blue-3 text-xs'>
                        Guia Rapida
                    </Badge>
                </SmallCard>
                <SmallCard
                    title='No veo mis metas del Mes'
                    description='Revisa los filtros de año/mes en la vista Metas'
                    icon={<GoGoal  size={18} />}
                >
                    <Badge className='bg-ob-blue-3 text-xs'>
                        Solucion
                    </Badge>
                </SmallCard>

                <SmallCard
                    title='Error al Completar Datos del Cliente'
                    description='Usa el botón "Completar datos" en Laboratorio y valida campos obligatorios.'
                    icon={<AiOutlineMedicineBox  size={18} />}
                >
                    <Badge className='bg-ob-blue-3 text-xs  '>
                        Paso a paso
                    </Badge>
                </SmallCard>

            </div>
        </div>
    )
}
