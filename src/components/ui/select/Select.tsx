"use client";
import cx from "@/libs/cx";
import { ReactNode, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";

type Options = {
  label: ReactNode;
  value: string;
};

interface SelectProps {
  label?: string;
  placeholder?: string;
  busqueda?: string;
  options?: Options[];
  className?: string;
}

export default function Select({
  label,
  options,
  placeholder,
  busqueda,
  className,
}: SelectProps) {
  const [isOpen,setOpen] = useState(false);

  return <div className="flex flex-col gap-y-1">
    <label className="text-ob-gray-2 font-medium">
      {label}
    </label>
    <div className="flex items-center justify-between bg-ob-black-4 rounded-xl font-medium text-sm py-2 px-3 border border-ob-gray cursor-pointer" onClick={()=>setOpen(!isOpen)}>
      <p className="text-ob-white">
        {placeholder}
      </p>
      <span>
        <RiArrowDropDownLine className="text-ob-white" size={18} />
      </span>
    </div>
    {/* {isOpen && 
      <div className="bg-ob-black-6 border border-ob-gray rounded-3xl p-3">
        <div className="flex items-center bg-ob-black-4 border border-ob-gray rounded-xl mb-2">
          <span>
            <CiSearch className="text-ob-gray-2 m-3" size={18} />
          </span>
          <p className="text-ob-gray-2 text-sm">
            {busqueda}
          </p>
        </div>
      </div>} */}
  </div>;
}
