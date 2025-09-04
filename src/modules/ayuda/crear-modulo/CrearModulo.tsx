import React from 'react'
import Modal from '@/components/ui/modal/Modal'
import { HiOutlineSquares2X2 } from "react-icons/hi2";
import { LuSave, LuTag} from "react-icons/lu";
import Input from '@/components/ui/input/input';

export default function CrearModulo() {
    return (
        <Modal
        title='Crear Modulo'
        badge='Basico'
        button='Guardar'
        iconButton ={<LuSave size={18} />}
        icon={<HiOutlineSquares2X2 size={16}/>}>
            
            <div className='flex flex-col gap-y-3'>
                <span className='text-ob-gray-2'>
                    Agrega un Módulo Basico. Solo necesitas dos datos
                </span>
                <div className='flex flex-col gap-y-1'>
                    <Input
                    label='Nombre del Modulo'
                    placeholder='Ingresar Nombre'
                    id='name'
                    className={{label: "text-ob-white"}}
                    icon={<LuTag size={18}/>}
                    />
                    <span className='text-ob-gray-2 text-xs'>
                        Ejemplos: Citas, Laboratorio, Metas
                    </span>
                </div>
            </div>
        
        </Modal>
    )
}
