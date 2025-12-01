'use client';
import cx from '@/libs/cx';
import { useId } from 'react';
import { LuSearch } from 'react-icons/lu';

interface SearchProps {
  placeholder?: string;
  onSearch?: (query: string) => void;
  value?: string;
  className?: {
    container?: string;
  };
}

export default function Search({ placeholder, onSearch, className, value }: SearchProps) {
  const id = useId();

  return (
    <div
      className={cx(
        'border-ob-white-3 dark:border-ob-gray flex h-10 w-full gap-x-2 rounded-lg border px-[13px] py-[11px]',
        className?.container,
      )}
    >
      <label htmlFor={id}>
        <LuSearch className="text-ob-black-4 size-[18px] dark:text-white" />
      </label>

      <input
        id={id}
        type="text"
        placeholder={placeholder}
        onChange={(e) => onSearch?.(e.target.value)}
        className="text-ob-black-4 h-full w-full bg-transparent outline-0 dark:text-white"
        value={value}
      />
    </div>
  );
}
