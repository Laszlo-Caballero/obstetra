"use client";

import { ReactNode, useState } from "react";
import Badge from '../badge/Badge';
import { LuX } from "react-icons/lu";
import Button from '../button/Button';

export interface ModalProps{
    children?: ReactNode;
    title?: string;
    badge?: string;
    nota?: string;
    button?: string;
    icon?: ReactNode;
    iconButton?: ReactNode;
    onClose?: () => void;
}



export default function Modal({children, title, icon, badge, nota, button, iconButton, onClose} : ModalProps) {
    return (
        <div className=' fixed inset-0 z-10 bg-black/50 flex items-center justify-center ' onClick={onClose}>
            <div className='flex flex-col bg-ob-black-6 border border-ob-gray rounded-3xl min-w-[560px]' onClick={(e) => e.stopPropagation()}>
                <header className='flex items-center justify-between p-4 font-medium border-b border-ob-gray'>
                    <div className='flex items-center gap-x-2'>
                        {icon}
                        <span className='text-ob-white text-lg'> {title} </span>
                        <Badge className='bg-ob-blue-3 text-ob-lightblue text-xs'>
                            {badge}
                        </Badge>
                    </div>
                    <span className='border border-ob-gray py-2.5 px-3 rounded-md cursor-pointer' onClick={onClose}>
                        <LuX size={18} className='text-ob-white'/>
                    </span>
                </header>
                <div className="p-4">
                    {children}
                </div>
                <footer className='flex items-center justify-between p-4 font-medium border-t border-ob-gray'>
                    <span className="text-ob-gray-2 text-sm">
                        {nota}
                    </span>
                    <div className='flex items-center justify-between gap-x-3'>
                        <Button className='bg-transparent border border-ob-gray text-ob-white' onClick={onClose}>
                            Cancelar
                        </Button>
                        <Button className='font-semibold bg-ob-teal'>
                            {iconButton}
                            {button}
                        </Button>
                    </div>
                </footer>
            </div>
        </div>
    )
}
