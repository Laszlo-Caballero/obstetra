import React, { ButtonHTMLAttributes, ReactNode } from 'react'
import cx from "@/libs/cx";

interface ButtonProps extends Omit<ButtonHTMLAttributes<HTMLButtonElement>, "className">  {
    text: string
    icon?: ReactNode
    className?: {
        button?: string;
        text?: string;
    }
}


export default function Button({text,icon,className,...props}: ButtonProps) {
    return (
        <button className={cx('flex items-center bg-ob-blue gap-x-2 px-3 py-2.5 rounded-md',className?.button)}> 
            {icon}
            <span className={cx('text-ob-black-6 text-sm font-medium',className?.text)}>
                {text}
            </span>
        </button>
    )
}
