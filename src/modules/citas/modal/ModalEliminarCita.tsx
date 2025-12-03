'use client';
import Modal from '@/components/ui/modal/Modal';
import ModalHeader from '@/components/ui/modal/modal-header/ModalHeader';
import ModalTitle from '@/components/ui/modal/modal-title/ModalTitle';
import CloseButton from '@/components/ui/modal/close-button/CloseButton';
import ModalContent from '@/components/ui/modal/modal-content/ModalContent';
import ModalFooter from '@/components/ui/modal/modal-footer/ModalFooter';
import Button from '@/components/ui/button/Button';
import { LuTrash2, LuEye, LuX, LuCalendar, LuUser } from 'react-icons/lu';
import { useMutation } from '@/hooks/useMutation';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { Response, ResponseCita } from '@/interface/response.interface';
import { parseDate } from '@/libs/parseDate';
import { format } from 'date-fns';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Badge from '@/components/ui/badge/Badge';
import { IoAlertCircle } from 'react-icons/io5';
import { useAuth } from '@/components/context/AuthContext';
import { env } from '@/config/env';

interface ModalEliminarCitaProps {
  onClose: () => void;
  cita: ResponseCita;
  onSuccess?: (data: Response<ResponseCita[]>) => void;
}

interface FormValues {
  razon: string;
  estado: string;
}

export default function ModalEliminarCita({ onClose, cita, onSuccess }: ModalEliminarCitaProps) {
  const { register, handleSubmit, watch, setValue } = useForm<FormValues>({
    defaultValues: {
      estado: 'cancelado', // Default to cancelado as per "Eliminar" context
      razon: '',
    },
  });

  const estado = watch('estado');
  const { token } = useAuth();

  const { mutate, isLoading } = useMutation({
    mutationFn: async (data: FormValues) => {
      const res = await fetch(`${env.url_api}/cita/${cita.citaId}`, {
        method: 'DELETE',
        body: JSON.stringify({ razon: data.razon }),
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!res.ok) {
        throw new Error('Error al desactivar la cita');
      }
      return res.json() as Promise<Response<ResponseCita[]>>;
    },
    onSuccess: (data) => {
      toast.success('Cita cancelada correctamente');
      onSuccess?.(data);
      onClose();
    },
    onError: () => {
      toast.error('Error al desactivar la cita');
    },
  });

  const onSubmit = (data: FormValues) => {
    mutate(data);
  };

  return (
    <Modal onClose={onClose}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <ModalHeader>
          <div className="flex flex-col gap-1">
            <ModalTitle title="Actualizar estado de la cita">
              <span className="bg-ob-blue-3 border-ob-teal flex size-7 items-center justify-center rounded-xl border-2">
                <LuTrash2 className="text-ob-teal" />
              </span>
            </ModalTitle>
            <p className="text-ob-gray-2 ml-10 text-xs">
              Cambia el estado o desactiva la cita. Desactivar es irreversible.
            </p>
          </div>
        </ModalHeader>

        <ModalContent className="flex-col gap-4">
          {/* Cita Info Card */}
          <div className="bg-ob-black-2 border-ob-gray-4 rounded-xl border p-4">
            <div className="mb-2 flex items-center gap-2">
              <LuCalendar className="text-ob-gray-2" />
              <span className="text-ob-white text-sm font-medium">
                Cita #A-{cita.citaId} — {parseDate(cita.fecha)},{' '}
                {format(new Date(cita.fecha), 'HH:mm')}
              </span>
            </div>
            <div className="flex flex-col gap-2 pl-6">
              <div className="flex items-center gap-2">
                <div className="bg-ob-gray-4 size-6 overflow-hidden rounded-full">
                  {/* Placeholder avatar */}
                  <div className="bg-ob-teal h-full w-full opacity-50"></div>
                </div>
                <span className="text-ob-white text-sm font-medium">
                  {cita.paciente.nombres} {cita.paciente.apellido_paterno}
                </span>
                <Badge className="bg-ob-black-3 text-ob-gray-2 border-ob-gray-4 border text-[10px]">
                  Control prenatal
                </Badge>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-ob-gray-2 text-xs">Obstetra</span>
                <div className="bg-ob-gray-4 size-4 overflow-hidden rounded-full">
                  {/* Placeholder avatar */}
                  <div className="bg-ob-blue h-full w-full opacity-50"></div>
                </div>
                <span className="text-ob-white text-xs font-medium">
                  Dra. {cita.personal.apellidoPaterno}
                </span>
              </div>
            </div>
          </div>

          {/* Estado Selector */}
          <div className="flex flex-col gap-2">
            <label className="text-ob-gray-2 text-xs font-medium">Estado de la cita</label>
            <select
              {...register('estado')}
              className="bg-ob-black-2 border-ob-gray-4 text-ob-white focus:border-ob-teal rounded-lg p-2 text-sm capitalize focus:outline-none"
            >
              <option value="cancelado">Cancelado</option>
            </select>
            <div className="mt-1 flex gap-2">
              {['pendiente', 'completado', 'cancelado'].map((status) => (
                <span
                  key={status}
                  className={`rounded-full px-2 py-0.5 text-[10px] capitalize ${estado === status ? (status === 'cancelado' ? 'bg-red-500 text-white' : 'bg-ob-teal text-black') : 'text-ob-gray-2 bg-ob-black-3'}`}
                >
                  {status}
                </span>
              ))}
            </div>
          </div>

          {/* Warning */}
          {estado === 'cancelado' && (
            <div className="bg-ob-blue-3 border-ob-blue flex gap-3 rounded-lg border p-3">
              <IoAlertCircle className="text-ob-lightblue mt-0.5 shrink-0" />
              <div className="flex flex-col">
                <span className="text-ob-lightblue text-sm font-bold">
                  Advertencia: cancelar es irreversible
                </span>
                <span className="text-ob-lightblue text-xs">
                  Cambiar a "Cancelado" elimina la cita del flujo activo y no se puede recuperar.
                </span>
              </div>
            </div>
          )}

          {/* Razon */}
          <div className="flex flex-col gap-2">
            <label className="text-ob-gray-2 text-xs font-medium">Motivo o nota (opcional)</label>
            <textarea
              {...register('razon')}
              placeholder="Añadir una nota para el historial..."
              className="bg-ob-black-2 border-ob-gray-4 text-ob-white focus:border-ob-teal h-24 resize-none rounded-lg p-3 text-sm focus:outline-none"
            />
          </div>
        </ModalContent>

        <ModalFooter>
          <div className="mr-auto flex items-center gap-2">
            <IoAlertCircle className="text-ob-gray-2" />
            <span className="text-ob-gray-2 text-xs">Acción permanente al cancelar</span>
          </div>
          <Button
            type="button"
            onClick={onClose}
            className="bg-ob-black-3 border-ob-gray-4 text-ob-white border"
          >
            <LuX className="mr-2" /> Cancelar
          </Button>
          <Button type="button" className="bg-ob-black-3 border-ob-gray-4 text-ob-white border">
            <LuEye className="mr-2" /> Ver detalles
          </Button>
          <Button type="submit" className="bg-red-500 text-white hover:bg-red-600">
            Guardar cambios
          </Button>
        </ModalFooter>
      </form>
    </Modal>
  );
}
