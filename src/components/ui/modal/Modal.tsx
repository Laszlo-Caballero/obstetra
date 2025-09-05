"use client";
import cx from "@/libs/cx";
import { motion } from "motion/react";
import { createContext, PropsWithChildren, useContext } from "react";

interface ModalProviderProps {
  onClose?: () => void;
}

const ModalContext = createContext<ModalProviderProps | undefined>(undefined);

interface ModalProps extends PropsWithChildren {
  onClose?: () => void;
  className?: {
    background?: string;
    container?: string;
  };
}

export default function Modal({ onClose, className, children }: ModalProps) {
  return (
    <ModalContext value={{ onClose }}>
      <motion.div
        className={cx(
          "fixed inset-0 z-[100] bg-black/50 flex items-center justify-center",
          className?.background
        )}
        onClick={onClose}
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        transition={{ duration: 0.2 }}
      >
        <div
          className={cx(
            "flex flex-col bg-ob-black-6 border border-ob-gray rounded-3xl min-w-[560px]",
            className?.container
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {children}
        </div>
      </motion.div>
    </ModalContext>
  );
}

export function useModal() {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
}
