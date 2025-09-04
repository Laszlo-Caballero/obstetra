import React from 'react'
import Modal from '@/components/ui/modal/Modal'
import Input from '@/components/ui/input/input'
import TextArea from '@/components/ui/textarea/Textarea'
import { LuSave, LuTag} from "react-icons/lu";
import { PiStethoscopeFill } from "react-icons/pi";

export default function CrearTipo() {
    return (
        <Modal
        title='Crear Tipo de Consulta'
        badge='Basico'
        button='Guardar'
        nota='Se le notificara a todos los administradores'
        iconButton ={<LuSave size={18} />}
        icon={<PiStethoscopeFill size={20}/>}>
            
            <div className='flex flex-col gap-y-3'>
                <span className='text-ob-gray-2 text-sm'>
                    Agrega un Tipo de Consulta Basico. Solo necesitas dos datos
                </span>
                <div className='flex flex-col gap-y-1'>
                    <Input
                    label='Nombre del Tipo de Consulta'
                    placeholder='Ingresar Nombre'
                    id='name'
                    className={{label: "text-ob-white text-sm"}}
                    icon={<LuTag size={18}/>}
                    />
                    <span className='text-ob-gray-2 text-xs'>
                        Ejemplos: Soporte Tecnico, Seguridad, Error en Página
                    </span>
                </div>
                <div className='flex flex-col gap-y-1'>
                    <TextArea
                    label='Descripcion'
                    placeholder='Ingresar Descripcion...'
                    id='description'
                    rows={3}
                    className={{label: "text-ob-white text-sm"}}
                    />
                    <span className='text-ob-gray-2 text-xs'>
                        Describe de que se trata el tipo de consulta
                    </span>
                </div>
            </div>
        
        </Modal>
    )
}
