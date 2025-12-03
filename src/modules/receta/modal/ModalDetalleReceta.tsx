'use client';
import Modal from '@/components/ui/modal/Modal';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import {
  LuFileText,
  LuX,
  LuPrinter,
  LuDownload,
  LuUser,
  LuCalendar,
  LuClock,
  LuHash,
} from 'react-icons/lu';
import Button from '@/components/ui/button/Button';
import { useQuery } from '@/hooks/useQuery';
import axios from 'axios';
import { Response, ResponseReceta } from '@/interface/response.interface';
import { parseDate } from '@/libs/parseDate';
import Badge from '@/components/ui/badge/Badge';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import { format } from 'date-fns';
import { BiCheckCircle } from 'react-icons/bi';

interface ModalDetalleRecetaProps {
  onClose: () => void;
  recetaId: number;
}

export default function ModalDetalleReceta({ onClose, recetaId }: ModalDetalleRecetaProps) {
  const { data: receta, isLoading } = useQuery({
    queryFn: async () => {
      const res = await axios.get<Response<ResponseReceta>>(
        `${process.env.NEXT_PUBLIC_API_URL}/receta/${recetaId}`,
      );
      return res.data.data;
    },
  });

  if (isLoading || !receta) {
    return null; // Or a loader
  }

  const { cita, recetaMedicinas } = receta;
  const { personal } = cita;

  return (
    <Modal
      onClose={onClose}
      className={{
        container: 'min-w-1/2',
      }}
    >
      <ModalHeader>
        <div className="flex flex-col">
          <ModalTitle title={`Detalle de receta RX-${receta.recetaId}`}>
            <span className="border-ob-teal bg-ob-blue-3 flex size-7 items-center justify-center rounded-xl border-2">
              <LuFileText className="text-ob-teal" />
            </span>
          </ModalTitle>
          <span className="text-ob-gray-2 ml-10 text-xs">
            Emitida el {parseDate(cita.fecha)} • Dra. {personal.apellidoPaterno}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <Button className="border-ob-gray text-ob-white h-8 border bg-transparent text-xs">
            <LuPrinter className="mr-2" />
            Imprimir
          </Button>
          <Button className="border-ob-gray text-ob-white h-8 border bg-transparent text-xs">
            <LuDownload className="mr-2" />
            Descargar PDF
          </Button>
          <CloseButton onClick={onClose}>
            <LuX size={18} className="text-ob-white" />
          </CloseButton>
        </div>
      </ModalHeader>
      <ModalContent className="flex-row gap-4">
        {/* Left Column */}
        <div className="flex w-2/3 flex-col gap-4">
          {/* Patient Info - Placeholder as data is missing in JSON */}
          <InfoContainer className="bg-ob-black-4 border-ob-gray-4">
            <h3 className="text-ob-white mb-3 font-medium">Paciente</h3>
            <div className="grid grid-cols-1 gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <LuUser /> Nombre
                </span>
                <span className="text-ob-white font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <LuHash /> DNI
                </span>
                <span className="text-ob-white font-medium">--</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <LuCalendar /> Edad
                </span>
                <span className="text-ob-white font-medium">--</span>
              </div>
            </div>
          </InfoContainer>

          {/* Farmacos */}
          <InfoContainer className="bg-ob-black-4 border-ob-gray-4">
            <h3 className="text-ob-white mb-3 font-medium">Fármacos indicados</h3>
            <div className="flex flex-col gap-3">
              {recetaMedicinas.map((item) => (
                <div
                  key={item.recetamedicinaId}
                  className="border-ob-gray-4 border-b pb-3 last:border-0"
                >
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="text-ob-white font-bold">
                        {item.medicina.nombre} {item.medicina.dosis}
                      </p>
                      <p className="text-ob-gray-2 mt-1 text-xs">
                        Dosis: {item.dosis} • {item.indicacion}
                      </p>
                    </div>
                    <Badge className="bg-ob-black-3 text-ob-gray-2 border-ob-gray-4 border">
                      Via oral
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </InfoContainer>

          {/* Indicaciones Adicionales */}
          <InfoContainer className="bg-ob-black-4 border-ob-gray-4">
            <h3 className="text-ob-white mb-3 font-medium">Indicaciones adicionales</h3>
            <p className="text-ob-gray-2 text-sm">{cita.nota || 'Sin indicaciones adicionales.'}</p>
          </InfoContainer>
        </div>

        {/* Right Column */}
        <div className="flex w-1/3 flex-col gap-4">
          {/* Detalles de emision */}
          <InfoContainer className="bg-ob-black-4 border-ob-gray-4">
            <h3 className="text-ob-white mb-3 font-medium">Detalles de emisión</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <LuUser /> Obstetra
                </span>
                <span className="text-ob-white text-right">Dra. {personal.apellidoPaterno}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <LuCalendar /> Fecha
                </span>
                <span className="text-ob-white text-right">{parseDate(cita.fecha)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <LuClock /> Hora
                </span>
                <span className="text-ob-white text-right">
                  {format(new Date(cita.fecha), 'HH:mm')}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <LuHash /> ID
                </span>
                <span className="text-ob-white text-right">RX-{receta.recetaId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-ob-gray-2 flex items-center gap-2">
                  <BiCheckCircle /> Estado
                </span>
                <span className="text-ob-teal flex items-center gap-1 text-xs">
                  <BiCheckCircle size={12} /> Emitida
                </span>
              </div>
            </div>
          </InfoContainer>

          {/* Archivos */}
          <InfoContainer className="bg-ob-black-4 border-ob-gray-4">
            <h3 className="text-ob-white mb-3 font-medium">Archivos</h3>
            <div className="flex flex-col gap-2">
              <div className="border-ob-gray-4 bg-ob-black-2 flex items-center justify-between rounded-lg border p-2">
                <div className="flex flex-col">
                  <span className="text-ob-white text-sm font-medium">
                    Receta_RX-{receta.recetaId}.pdf
                  </span>
                  <span className="text-ob-gray-2 text-[10px]">PDF • 214 KB</span>
                </div>
                <Button className="bg-ob-black-3 border-ob-gray-4 text-ob-white h-7 border text-xs">
                  <LuDownload className="mr-1" /> Descargar
                </Button>
              </div>
            </div>
          </InfoContainer>

          {/* Historial */}
          <InfoContainer className="bg-ob-black-4 border-ob-gray-4">
            <h3 className="text-ob-white mb-3 font-medium">Historial</h3>
            <div className="relative flex flex-col gap-4 pl-2">
              {/* Timeline item 1 */}
              <div className="relative flex gap-3">
                <div className="bg-ob-teal absolute top-1.5 left-0 z-10 h-2 w-2 rounded-full"></div>
                <div className="bg-ob-gray-4 absolute top-2 left-[3px] h-full w-[1px]"></div>
                <div className="flex w-full flex-col pl-4">
                  <div className="flex items-center justify-between">
                    <span className="text-ob-white text-sm font-medium">Receta creada</span>
                    <Badge className="bg-ob-black-3 text-ob-teal text-[10px]">Nuevo</Badge>
                  </div>
                  <span className="text-ob-gray-2 text-[10px]">
                    {parseDate(cita.fecha)}, {format(new Date(cita.fecha), 'HH:mm')} • Por Dra.{' '}
                    {personal.apellidoPaterno}
                  </span>
                </div>
              </div>
            </div>
          </InfoContainer>
        </div>
      </ModalContent>
    </Modal>
  );
}
