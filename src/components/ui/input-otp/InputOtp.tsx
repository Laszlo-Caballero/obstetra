'use client';

import cx from '@/libs/cx';
import { useRef, useState } from 'react';

interface InputOtpProps {
  length?: number;
  onChange?: (code: string) => void;
  className?: string;
  error?: string;
}

export default function InputOtp({ length = 6, onChange, className, error }: InputOtpProps) {
  const [otp, setOtp] = useState<string[]>(Array(length).fill(''));
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (value: string, index: number) => {
    if (/^[0-9]?$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < length - 1) {
        inputsRef.current[index + 1]?.focus();
      }

      onChange?.(newOtp.join(''));
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputsRef.current[index - 1]?.focus();
    }
  };

  return otp.map((val, idx) => (
    <input
      key={idx}
      ref={(el) => {
        inputsRef.current[idx] = el;
      }}
      type="text"
      inputMode="numeric"
      maxLength={1}
      value={val}
      onChange={(e) => handleChange(e.target.value, idx)}
      onKeyDown={(e) => handleKeyDown(e, idx)}
      className={cx(
        'border-ob-gray-4 bg-ob-black-8 max-w-[80px] rounded-xl border py-4 text-center outline-none',
        className,
        error ? 'border-ob-red' : 'focus:border-ob-blue',
      )}
    />
  ));
}
