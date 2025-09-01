import React from 'react'
import cx from '@/libs/cx';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
    label: string;
    id:string;
    className?: string;
    classNameLabel?: string;
}
export default function Input({label, className, id, classNameLabel, ...props}: InputProps) {
    return (
        <div className="flex flex-col gap-y-1">
            <label className={cx("text-ob-gray-2 font-medium", classNameLabel)} htmlFor={id}>
                {label}
            </label>
            <input
            className={cx("bg-ob-black-4 rounded-xl font-medium text-sm placeholder-ob-white py-2 px-3 border border-ob-gray",className)}
            id={id}
            {...props}
            />
        </div>
    )
}

