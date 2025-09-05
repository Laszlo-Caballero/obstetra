import React from "react";
import Button from "@/components/ui/button/Button";
import Badge from "@/components/ui/badge/Badge";

import { IoDocumentTextOutline } from "react-icons/io5";
import { FiUpload, FiRotateCcw, FiUploadCloud } from "react-icons/fi";
import {
  LuZoomIn,
  LuZoomOut,
  LuArrowUpRight,
  LuInfo,
  LuStar,
  LuDownload,
  LuX,
} from "react-icons/lu";
import { FaClockRotateLeft } from "react-icons/fa6";
import { BiUpvote } from "react-icons/bi";
import { TfiReload } from "react-icons/tfi";
import { LiaGripLinesSolid } from "react-icons/lia";
import Search from "@/components/ui/search/Search";
import SmallCard from "@/components/ui/small-card/SmallCard";
import Modal from "@/components/ui/modal-v2/Modal";
import ModalHeader from "@/components/ui/modal-v2/modal-header/ModalHeader";
import ModalTitle from "@/components/ui/modal-v2/modal-title/ModalTitle";
import ModalFooter from "@/components/ui/modal-v2/modal-footer/ModalFooter";
import ContainerButton from "@/components/ui/modal-v2/container-button/ContainerButton";
import CloseButton from "@/components/ui/modal-v2/close-button/CloseButton";

export default function Documentacion() {
  return (
    <Modal>
      <ModalHeader>
        <ModalTitle title="Exporta Manuales en Pdf" badge="Documentacion">
          <IoDocumentTextOutline size={20} />
        </ModalTitle>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>

      <div className="flex">
        <div className="flex flex-col gap-y-3 border-r border-ob-gray">
          <section className="flex items-center gap-x-3 border-b border-ob-gray pb-3 p-4">
            <Button className="bg-transparent border border-ob-gray text-ob-white">
              <LuZoomIn size={18} />
              Zoom In
            </Button>
            <Button className="bg-transparent border border-ob-gray text-ob-white">
              <LuZoomOut size={18} />
              Zoom Out
            </Button>
            <Button className="bg-transparent border border-ob-gray text-ob-white">
              <FiRotateCcw size={18} />
              Descargar
            </Button>
            <Button className="bg-ob-teal">
              <FiUploadCloud size={18} />
              Subir Nueva Version
            </Button>
          </section>
          <div className="flex flex-col gap-y-3">
            <div className="flex items-center gap-x-3 px-4">
              <span className="text-sm text-ob-white">Tipo de Version</span>
              <div className="flex items-center text-ob-white rounded-xl border border-ob-gray text-sm bg-ob-black-4">
                <span className="flex items-center gap-x-1.5 border-r border-ob-gray py-2 px-2.5">
                  <BiUpvote size={18} />
                  Major
                </span>
                <span className="flex items-center gap-x-1.5 py-2 px-2.5">
                  <LuArrowUpRight size={18} />
                  Minor
                </span>
              </div>
              <Badge className="flex items-center gap-x-1.5 bg-ob-teal text-sm">
                <LuInfo size={18} />
                Cambios grandes vs pequeños
              </Badge>
            </div>
            <div className="bg-ob-blue-3 p-4 w-[637px] h-[452px]">
              <div className="flex items-center justify-center bg-ob-black-6 h-[420px]">
                <span className="text-ob-gray-2 text-sm">
                  Vista previa de PDF (página 1 de 12)
                </span>
              </div>
            </div>
          </div>
        </div>
        <aside className="flex flex-col gap-y-2.5">
          <div className="flex items-center justify-between px-4 py-2 border-b border-ob-gray p-4">
            <span className="flex items-center gap-x-2">
              <FaClockRotateLeft size={18} />
              Historial de versiones
            </span>
            <span className="border border-ob-gray px-3 py-2.5 rounded-md">
              <TfiReload size={18} />
            </span>
          </div>
          <div className="flex flex-col gap-y-2 p-4">
            <Search placeholder="Buscar Version"></Search>

            <div className="flex flex-col gap-y-2 pl-">
              <SmallCard
                title="v1.6 Actual"
                description="30 Ago 2025 "
                className={{ description: "" }}
                icon={<LuStar size={18} className="text-ob-white" />}
              >
                <Badge className="bg-ob-blue-2 text-sm">Actual</Badge>
              </SmallCard>
              <SmallCard
                title="v1.5"
                description="12 Ago 2025"
                icon={<LiaGripLinesSolid size={18} className="text-ob-white" />}
              >
                <Button className="bg-transparent border border-ob-gray rounded-md py-2.5 px-3 ">
                  <LuDownload size={18} className="text-ob-white" />
                </Button>
              </SmallCard>
              <SmallCard
                title="v1.4"
                description="25 Jul 2025 "
                icon={<LiaGripLinesSolid size={18} className="text-ob-white" />}
              >
                <Button className="bg-transparent border border-ob-gray rounded-md py-2.5 px-3 ">
                  <LuDownload size={18} className="text-ob-white" />
                </Button>
              </SmallCard>
              <SmallCard
                title="v1.3"
                description="02 Jul 2025 "
                icon={<LiaGripLinesSolid size={18} className="text-ob-white" />}
              >
                <Button className="bg-transparent border border-ob-gray rounded-md py-2.5 px-3 ">
                  <LuDownload size={18} className="text-ob-white" />
                </Button>
              </SmallCard>
            </div>
          </div>
        </aside>
      </div>

      <ModalFooter nota="Puedes cargar una nueva version sin perder el historial">
        <ContainerButton>
          <CloseButton>Cancelar</CloseButton>
          <Button className="font-semibold bg-ob-teal">
            <FiUpload size={18} />
            Subir Nueva Version
          </Button>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
