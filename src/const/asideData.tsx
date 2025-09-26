import { AsideProps } from '@/interface/aside';
import { SiDatabricks } from 'react-icons/si';
import { LuCalendar, LuPersonStanding, LuStethoscope } from 'react-icons/lu';
import { LuBuilding2 } from 'react-icons/lu';
import { MdOutlineQueuePlayNext } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { IoMdPhotos } from 'react-icons/io';

export const asideData: AsideProps[] = [
  {
    icon: <SiDatabricks />,
    title: 'Programas',
    href: '/programas',
    description: 'Administrar programas',
  },
  {
    icon: <LuStethoscope />,
    title: 'Obstetras',
    href: '/obstetras',
    description: 'Lista de obstetras',
  },
  {
    icon: <LuBuilding2 />,
    title: 'Postas',
    href: '/posta',
    description: 'Lista de postas',
  },
  {
    icon: <LuCalendar />,
    title: 'Citas',
    href: '/citas',
    description: 'Gestión de citas médicas',
  },
  {
    icon: <LuPersonStanding />,
    title: 'Pacientes',
    href: '/paciente',
    description: 'Registro y control de pacientes',
  },
  {
    icon: <MdOutlineQueuePlayNext />,
    title: 'Atenciones',
    href: '/atencion',
    description: 'Historial de atenciones médicas',
  },
  {
    icon: <GiMedicines />,
    title: 'Medicina',
    href: '/medicina',
    description: 'Control de medicinas disponibles',
  },
  {
    icon: <IoMdPhotos />,
    title: 'Galeria',
    href: '/galeria',
    description: 'Visualizar galería de imágenes',
  },
];
