import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonModal from '@/components/ui/button-modal/ButtonModal';
import Title from '@/components/ui/title/Title';
import CrearPaciente from '@/modules/paciente/crear/CrearPaciente';
import { GoHome } from 'react-icons/go';
import { LuCalendarPlus2, LuPlus } from 'react-icons/lu';
import CitaCreateForm from '@/modules/citas/components/CitaCreateForm';

export default function CrearPage() {
  return (
    <div className="flex w-full flex-col gap-y-2 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Citas',
            href: '/citas',
          },
          {
            title: 'Crear',
            href: '/citas/crear',
          },
        ]}
      />

      <section className="flex items-center justify-between">
        <Title
          title="Registrar cita"
          description="Completa los datos del Paciente, Equpi y Programa"
          icon={<LuCalendarPlus2 size={16} />}
        />
        <ButtonModal className="bg-ob-blue-2" modal={<CrearPaciente />}>
          <LuPlus size={18} />
          Registrar Paciente
        </ButtonModal>
      </section>

      <CitaCreateForm />
    </div>
  );
}
