"use client";
import cx from "@/libs/cx";
import { ReactNode, useState } from "react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { CiSearch } from "react-icons/ci";
import { useClose } from "@/hooks/useClose";

type Options = {
  label: ReactNode;
  value: string;
};

interface SelectProps {
  label?: string;
  placeholder?: string;
  search?: string;
  options?: Options[];
  className?: string;
  icon?: ReactNode;
}

export default function Select({
  label,
  options,
  placeholder,
  search,
  className,
  icon,
}: SelectProps) {
  const [isOpen,setOpen] = useState(false);
  const ref = useClose({closeFunction:setOpen});

  return <div className="flex flex-col gap-y-1 relative" ref={ref}>
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
    {isOpen && 
        <div className="absolute traslate-y-2 mt-1 top-full bg-ob-black-6 border border-ob-gray rounded-3xl p-3 w-full ">
          <div className="flex items-center gap-x-2 bg-ob-black-4 border border-ob-gray rounded-xl p-2 mb-2">
            <span>
              <CiSearch className="text-ob-white" size={18} />
            </span>
            <input type="text" className="placeholder-ob-white text-sm w-full focus:outline-none" placeholder={search}/>
          </div>
          <div className="max-h-[100px] overflow-y-scroll">
          {options?.map((option)=>{
            return (
              
            <div className="flex items-center gap-x-2 p-3 hover:bg-ob-black-4 rounded-xl cursor-pointer" onClick={()=>setOpen(false)}>
              <span>
                {icon}
              </span>
              <p className="text-ob-white text-sm">
                {option.label}
              </p>
            </div>
            )
          })}
          </div>
        </div>
      }
  </div>;
}
