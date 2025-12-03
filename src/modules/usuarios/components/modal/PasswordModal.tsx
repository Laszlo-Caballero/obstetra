'use client';
import Button from '@/components/ui/button/Button';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import Input from '@/components/ui/input/input';
import React, { useState, useEffect } from 'react';
import { LuLock, LuX, LuCheck, LuRefreshCw } from 'react-icons/lu';
import Badge from '@/components/ui/badge/Badge';
import cx from '@/libs/cx';

interface PasswordModalProps {
  onClose: () => void;
  onConfirm: (password: string) => void;
}

export default function PasswordModal({ onClose, onConfirm }: PasswordModalProps) {
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [requirements, setRequirements] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    symbol: false,
    noSpaces: false,
  });

  useEffect(() => {
    setRequirements({
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /[0-9]/.test(password),
      symbol: /[!@#$%^&*(),.?":{}|<>]/.test(password),
      noSpaces: !/\s/.test(password) && !/[áéíóúÁÉÍÓÚ]/.test(password),
    });
  }, [password]);

  const isValid =
    Object.values(requirements).every(Boolean) && password === confirmPassword && password !== '';

  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Confirmar contraseña">
          <span className="border-ob-teal bg-ob-blue-3 flex size-7 items-center justify-center rounded-xl border-2">
            <LuLock className="text-ob-teal" />
          </span>
        </ModalTitle>
        <CloseButton onClick={onClose}>
          <LuX size={18} className="text-ob-white" />
          Cerrar
        </CloseButton>
      </ModalHeader>
      <ModalContent className="gap-4">
        <p className="text-ob-gray-2 text-sm">
          Por seguridad, ingresa y confirma tu contraseña. Revisa los requisitos antes de continuar.
        </p>

        <div className="flex flex-col gap-3">
          <Input
            label="Contraseña"
            type="password"
            placeholder="********"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={{ label: 'text-ob-white text-sm' }}
            icon={<LuLock />}
          />
          <Input
            label="Confirmar contraseña"
            type="password"
            placeholder="********"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className={{ label: 'text-ob-white text-sm' }}
            icon={<LuLock />}
          />
        </div>

        <div className="bg-ob-black-8 border-ob-gray-4 flex flex-col gap-2 rounded-xl border p-4">
          <RequirementBadge met={requirements.length} label="Mínimo 8 caracteres" />
          <RequirementBadge met={requirements.uppercase} label="Al menos 1 mayúscula (A-Z)" />
          <RequirementBadge met={requirements.lowercase} label="Al menos 1 minúscula (a-z)" />
          <RequirementBadge met={requirements.number} label="Al menos 1 número (0-9)" />
          <RequirementBadge met={requirements.symbol} label="Al menos 1 símbolo (!@#$%&*)" />
          <RequirementBadge
            met={requirements.noSpaces}
            label="Sin espacios ni caracteres acentuados"
            type="warning"
          />
        </div>

        <div className="text-ob-gray-2 flex items-start gap-2 text-xs">
          <span className="mt-0.5">ℹ️</span>
          <p>Tu sesión permanecerá activa; solo verificamos tu identidad para esta acción.</p>
        </div>
      </ModalContent>
      <ModalFooter>
        <ContainerButton>
          <Button className="border-ob-gray text-ob-white border bg-transparent" onClick={onClose}>
            <LuRefreshCw className="mr-2" />
            Cancelar
          </Button>
          <Button
            className="bg-ob-teal text-ob-black disabled:opacity-50"
            disabled={!isValid}
            onClick={() => onConfirm(password)}
          >
            <LuCheck className="mr-2" />
            Confirmar
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}

function RequirementBadge({
  met,
  label,
  type = 'success',
}: {
  met: boolean;
  label: string;
  type?: 'success' | 'warning';
}) {
  const colorClass = met
    ? 'bg-ob-teal text-ob-black'
    : type === 'warning'
      ? 'bg-orange-500 text-white'
      : 'bg-ob-teal text-ob-black opacity-20'; // Dimmed if not met, or maybe just gray?

  // Actually looking at the image, they are badges.
  // Let's try to match the style.
  // Met: Green badge "Req" + Text
  // Not Met: Gray/Dimmed? The image shows all met except last one which is orange "Opc".
  // Wait, the image shows "Req" in green box, and text white.

  return (
    <div className="text-ob-white flex items-center gap-2 text-sm">
      <span
        className={cx(
          'rounded px-1.5 py-0.5 text-[10px] font-bold uppercase',
          met
            ? 'bg-ob-teal text-ob-black'
            : type === 'warning'
              ? 'bg-orange-500 text-white'
              : 'bg-gray-600 text-gray-300',
        )}
      >
        {type === 'warning' ? 'Opc' : 'Req'}
      </span>
      <span className={cx(met ? 'text-ob-white' : 'text-ob-gray-2')}>{label}</span>
    </div>
  );
}
