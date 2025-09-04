import { Options } from "@/interface/props";
import { GrLocation } from "react-icons/gr";
import { FiTarget } from "react-icons/fi";
import { MdOutlineMyLocation } from "react-icons/md";
import { useState } from "react";

interface SearchProps {
  values: Options[];
  value: string;
  onChange: (value: string) => void;
  onClickButton: () => void;
}

export default function Search({
  values,
  value,
  onChange,
  onClickButton,
}: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="w-full bg-ob-black-4 border py-[11px] rounded-xl flex justify-between relative px-[13px] border-ob-gray">
      <div className="flex gap-x-2 items-center w-full">
        <GrLocation className="text-ob-white size-[18px]" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-none outline-none w-full text-sm text-ob-white placeholder:text-white"
          placeholder="Buscar ubicación"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <button
        className="flex gap-x-[6px] py-[6px] text-nowrap px-2 items-center"
        onClick={onClickButton}
      >
        <FiTarget className="text-ob-white size-[18px]" />
        Usar ubicación
      </button>

      {isOpen && (
        <ul className="absolute top-full left-0 translate-y-2 z-10 w-full bg-ob-black-4 border border-ob-gray-4 rounded-xl mt-1">
          <li className="bg-ob-blue-3 px-2.5 py-2 w-full rounded-t-xl flex gap-x-2 items-center">
            <MdOutlineMyLocation className="text-white size-4" />

            <p className="text-sm">Sugerencias</p>
          </li>

          {values.map((item) => (
            <li
              key={item.value}
              className="py-2.5 px-3 text-sm flex text-ob-white cursor-pointer hover:bg-ob-black-3 last:rounded-b-xl last:border-none border-b border-b-ob-gray-4"
              onClick={() => {
                onChange(item.value);
                setIsOpen(false);
              }}
            >
              <span className="flex items-center justify-center rounded-full p-[3px] bg-ob-blue-3 max-w-max">
                <GrLocation className="size-[14px]" />
              </span>

              <p className="px-4 font-medium">{item.label}</p>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
