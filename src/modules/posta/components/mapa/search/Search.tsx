import { Options } from '@/interface/props';
import { GrLocation } from 'react-icons/gr';
import { FiTarget } from 'react-icons/fi';
import { MdOutlineMyLocation } from 'react-icons/md';
import { useState } from 'react';

interface SearchProps {
  values: Options[];
  value: string;
  onChange: (value: string) => void;
  onClickButton: () => void;
}

export default function Search({ values, value, onChange, onClickButton }: SearchProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="bg-ob-black-4 border-ob-gray relative flex w-full justify-between rounded-xl border px-[13px] py-[11px]">
      <div className="flex w-full items-center gap-x-2">
        <GrLocation className="text-ob-white size-[18px]" />
        <input
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="text-ob-white w-full bg-none text-sm outline-none placeholder:text-white"
          placeholder="Buscar ubicación"
          onClick={() => setIsOpen(!isOpen)}
        />
      </div>

      <button
        className="flex items-center gap-x-[6px] px-2 py-[6px] text-nowrap"
        onClick={onClickButton}
        type="button"
      >
        <FiTarget className="text-ob-white size-[18px]" />
        Usar ubicación
      </button>

      {isOpen && (
        <ul className="bg-ob-black-4 border-ob-gray-4 absolute top-full left-0 z-10 mt-1 w-full translate-y-2 rounded-xl border">
          <li className="bg-ob-blue-3 flex w-full items-center gap-x-2 rounded-t-xl px-2.5 py-2">
            <MdOutlineMyLocation className="size-4 text-white" />

            <p className="text-sm">Sugerencias</p>
          </li>

          {values.map((item) => (
            <li
              key={item.value}
              className="text-ob-white hover:bg-ob-black-3 border-b-ob-gray-4 flex cursor-pointer border-b px-3 py-2.5 text-sm last:rounded-b-xl last:border-none"
              onClick={() => {
                onChange(item.value);
                setIsOpen(false);
              }}
            >
              <span className="bg-ob-blue-3 flex max-w-max items-center justify-center rounded-full p-[3px]">
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
