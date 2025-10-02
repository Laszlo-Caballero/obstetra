import Badge from '@/components/ui/badge/Badge';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ContainerButton from '@/components/ui/modal/container-button/ContainerButton';
import Modal from '@/components/ui/modal/Modal';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import { env } from '@/config/env';
import { ResponseMedicina } from '@/interface/response.interface';
import cx from '@/libs/cx';
import Image from 'next/image';
import { LuPill, LuX } from 'react-icons/lu';
import { TbEdit } from 'react-icons/tb';

interface ModalDetallesProps {
  onClose: () => void;
  data: ResponseMedicina;
}

export default function ModalDetalles({ onClose, data }: ModalDetallesProps) {
  return (
    <Modal onClose={onClose}>
      <ModalHeader>
        <div className="flex items-center gap-x-2">
          <ModalTitle title={data.nombre} badge={`Codigo: ${data.codigo}`}>
            <LuPill size={20} />
          </ModalTitle>
          <Badge className={cx('text-ob-white', data.estado ? 'bg-ob-green' : 'bg-ob-red')}>
            {data.estado ? 'Activo' : 'Inactivo'}
          </Badge>
        </div>
        <CloseButton>
          <LuX size={18} className="text-ob-white" />
        </CloseButton>
      </ModalHeader>
      <div className="flex flex-col gap-y-3 p-4">
        <section className="border-ob-gray-4 grid grid-cols-4 gap-x-4 border-b pb-4">
          <Image
            src={`${env.api_images}${data.recurso?.url}`}
            alt={data.nombre}
            width={158}
            height={118}
            className="border-ob-gray-4 rounded-xl border object-cover"
          />
          <span className="border-ob-gray-4 bg-ob-blue-3 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
            <span className="text-ob-gray-2 text-sm font-bold">Categoria</span>
            <span className="text-ob-white text-sm">{data.categoria?.nombre}</span>
          </span>
          <span className="border-ob-gray-4 bg-ob-blue-3 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
            <span className="text-ob-gray-2 text-sm font-bold">Presentacion</span>
            <span className="text-ob-white text-sm">{data.presentacion?.nombre}</span>
          </span>
          <span className="border-ob-gray-4 bg-ob-blue-3 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
            <span className="text-ob-gray-2 text-sm font-bold">Fecha de Creacion</span>
            <span className="text-ob-white text-sm">{data.fechaCreacion}</span>
          </span>
        </section>

        <section className="border-ob-gray-4 flex flex-col gap-y-4 border-b py-4">
          <h2 className="text-lg font-semibold">Detalles</h2>

          <div className="grid grid-cols-3 gap-x-3">
            <span className="border-ob-gray-4 bg-ob-blue-3 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
              <span className="text-ob-gray-2 text-sm font-bold">Dosis</span>
              <span className="text-ob-white text-sm">{data.dosis}</span>
            </span>
            <span className="border-ob-gray-4 bg-ob-blue-3 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
              <span className="text-ob-gray-2 text-sm font-bold">Unidades</span>
              <span className="text-ob-white text-sm">{data.unidades}</span>
            </span>
            <span className="border-ob-gray-4 bg-ob-blue-3 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
              <span className="text-ob-gray-2 text-sm font-bold">Necesita Receta</span>
              <span className="text-ob-white text-sm">{data.necesitaReceta ? 'Sí' : 'No'}</span>
            </span>
          </div>

          <div className="grid grid-cols-2 gap-x-3">
            <span className="border-ob-gray-4 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
              <span className="text-ob-gray-2 text-sm font-bold">Stock Actual</span>
              <span className="text-ob-white text-sm">{data.stock}</span>
            </span>
            <span className="border-ob-gray-4 flex h-full w-full flex-col gap-y-1 rounded-xl border p-[13px]">
              <span className="text-ob-gray-2 text-sm font-bold">Stock Minimo</span>
              <span className="text-ob-white text-sm">{data.stockMinimo}</span>
            </span>
          </div>
        </section>

        <h2 className="text-lg font-semibold">Descripcion</h2>

        <p className="text-ob-gray-2 font-bold">
          {data.descripcion ? data.descripcion : 'No hay descripcion para esta medicina.'}
        </p>
      </div>
      <ModalFooter>
        <ContainerButton>
          <CloseButton onClick={onClose}>Cerrar</CloseButton>
          <ButtonLink
            href={`/medicina/editar/${data.medicinaId}`}
            className="bg-ob-teal font-semibold"
          >
            <TbEdit size={18} />
            Editar
          </ButtonLink>
        </ContainerButton>
      </ModalFooter>
    </Modal>
  );
}
