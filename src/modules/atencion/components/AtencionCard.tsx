import { ResponseCita } from '@/interface/response.interface';
import { LuClock, LuFileText, LuHistory, LuPhone, LuSend, LuTrash2, LuUser } from 'react-icons/lu';
import { MdOutlineStickyNote2 } from 'react-icons/md';
import { IoCheckmarkDoneCircleOutline } from 'react-icons/io5';
import Button from '@/components/ui/button/Button';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import cx from '@/libs/cx';
import { useState } from 'react';
import ModalEliminarCita from '@/modules/citas/modal/ModalEliminarCita';

interface AtencionCardProps {
  cita: ResponseCita;
}

export default function AtencionCard({ cita }: AtencionCardProps) {
  const isCompleted = cita.estado === 'Completado';
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  return (
    <div className="bg-ob-black-2 border-ob-white-3 dark:border-ob-gray flex flex-col gap-y-3 rounded-xl border p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-x-3">
          <div className="bg-ob-teal flex size-10 items-center justify-center rounded-full text-white">
            {cita.paciente.sexo === 'Femenino' ? <LuUser /> : <LuUser />}
          </div>
          <div className="flex flex-col">
            <span className="text-ob-white font-medium">
              {cita.paciente.nombres} {cita.paciente.apellido_paterno}
            </span>
            <span className="text-ob-gray-2 text-sm">
              {new Date(cita.fecha).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}{' '}
              - {cita.programa.nombre}
            </span>
          </div>
        </div>
        <div className="bg-ob-teal/10 text-ob-teal flex items-center gap-x-1 rounded-full px-2 py-1 text-xs font-medium">
          <LuClock size={14} />
          <span>{cita.turno.horaInicio}</span>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2 text-sm">
        <div className="text-ob-gray-2 flex items-center gap-x-2">
          <span className="text-ob-gray-3">#</span>
          <span>CIT-{cita.citaId}</span>
        </div>
        <div className="text-ob-gray-2 flex items-center gap-x-2">
          <LuPhone size={14} />
          <span>{cita.paciente.telefono}</span>
        </div>
        <div className="text-ob-gray-2 flex items-center gap-x-2">
          <LuFileText size={14} />
          <span>Hoy</span>
        </div>
        <div className="text-ob-gray-2 flex items-center gap-x-2">
          <LuHistory size={14} />
          <span>Historia clin. {cita.paciente.dni}</span>
        </div>
      </div>

      <div className="border-t-ob-white-3 dark:border-ob-gray flex items-center justify-between border-t pt-3">
        {isCompleted ? (
          <>
            <Button className="bg-ob-teal/10 text-ob-teal hover:bg-ob-teal/20 w-full justify-center">
              <IoCheckmarkDoneCircleOutline size={18} />
              Cerrar
            </Button>
            <Button className="text-ob-gray-2 hover:text-ob-white w-full justify-center bg-transparent">
              <LuSend size={18} />
              Enviar
            </Button>
          </>
        ) : (
          <>
            <ButtonLink
              href={`/atencion/${cita.citaId}`}
              className="bg-ob-blue/10 text-ob-blue hover:bg-ob-blue/20 w-full justify-center"
            >
              Iniciar
            </ButtonLink>
            <Button className="text-ob-gray-2 hover:text-ob-white w-full justify-center bg-transparent">
              <MdOutlineStickyNote2 size={18} />
              Notas
            </Button>
            <Button
              className="text-ob-red-5 w-full justify-center bg-transparent hover:bg-red-500/10 hover:text-red-600"
              onClick={() => setShowDeleteModal(true)}
            >
              <LuTrash2 size={18} />
              Eliminar
            </Button>
          </>
        )}
      </div>

      {showDeleteModal && (
        <ModalEliminarCita
          cita={cita}
          onClose={() => setShowDeleteModal(false)}
          onSuccess={() => {
            // Optional: trigger refetch if needed, but for now just close
            // The parent page handles refetching via context or prop if we passed it,
            // but here we might need to rely on the parent re-rendering or passing a callback.
            // For now, let's just close. Ideally we should pass a refresh callback.
            window.location.reload(); // Simple refresh for now as we don't have the refetch prop here
          }}
        />
      )}
    </div>
  );
}
