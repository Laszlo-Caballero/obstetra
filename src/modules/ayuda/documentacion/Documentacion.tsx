import React from 'react'
import Modal from '@/components/ui/modal/Modal'
import Button from '@/components/ui/button/Button'
import Badge from '@/components/ui/badge/Badge'

import { IoDocumentTextOutline } from "react-icons/io5";
import { FiUpload, FiRotateCcw} from "react-icons/fi";
import { LuZoomIn, LuZoomOut } from "react-icons/lu";

export default function Documentacion() {
    return (
        <Modal
        title='Exporta Manuales en Pdf'
        badge='Documentacion'
        button='Subir Nueva Version'
        nota='Puedes cargar una nueva version sin perder el historial'
        icon={<IoDocumentTextOutline size={20}/> }
        iconButton={<FiUpload size={18}/>}
        >
            <div>
                <section>
                    <Button className='bg-transparent border border-ob-gray text-ob-white'>
                        <LuZoomIn size={18}/>
                        Zoom In
                    </Button>

                    <Button className='bg-transparent border border-ob-gray text-ob-white'>
                        <LuZoomOut size={18}/>
                        Zoom Out
                    </Button>

                    <Button className='bg-transparent border border-ob-gray text-ob-white'>
                        <FiRotateCcw size={18}/>
                        Descargar
                    </Button>
                </section>
                <div>

                </div>
                <aside>
                    <div></div>
                    <div></div>
                </aside>
            </div>
            
        </Modal>
    )
}
