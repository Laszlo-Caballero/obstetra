import Modal from "@/components/ui/modal-v2/Modal";
import ModalHeader from "@/components/ui/modal-v2/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal-v2/modal-title/ModalTitle";
import React from "react";
import { LuUpload } from "react-icons/lu";

interface ModalImportProps {
  onClose?: () => void;
}

export default function ModalImport({ onClose }: ModalImportProps) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <ModalTitle title="Subir archivo (solo Excel)">
          <span className="block size-2 bg-ob-blue-3">
            <LuUpload />
          </span>
        </ModalTitle>
      </ModalHeader>
    </Modal>
  );
}
