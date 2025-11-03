import { AsideProps } from '@/interface/aside';
import { SiDatabricks } from 'react-icons/si';
import {
  LuCalendar,
  LuCalendarCheck2,
  LuGoal,
  LuPersonStanding,
  LuStethoscope,
} from 'react-icons/lu';
import { LuBuilding2 } from 'react-icons/lu';
import { MdOutlineQueuePlayNext } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { IoMdPhotos } from 'react-icons/io';
import { TbCategoryPlus } from 'react-icons/tb';
import { IoGift } from 'react-icons/io5';
import { BiHome } from 'react-icons/bi';
import { LuSpellCheck2 } from 'react-icons/lu';
import { TbClock24 } from 'react-icons/tb';

export const asideData: AsideProps[] = [
  {
    icon: <BiHome />,
    title: 'Inicio',
    href: '/',
    description: 'Página principal',
    subItems: [],
  },
  {
    icon: <SiDatabricks />,
    title: 'Programas',
    href: '/programas',
    description: 'Administrar programas',
    subItems: [],
  },
  {
    icon: <LuCalendarCheck2 />,
    title: 'Calendario',
    description: 'Vista de calendario',
    href: '/calendario',
    subItems: [],
  },
  {
    icon: <LuGoal />,
    title: 'Metas',
    description: 'Gestión de metas',
    href: '/metas',
    subItems: [],
  },
  {
    icon: <LuStethoscope />,
    title: 'Personal Médico',
    href: '/personal',
    description: 'Lista de personal médico',
    subItems: [
      {
        icon: <TbClock24 />,
        title: 'Turnos',
        href: '/personal/turnos',
        description: 'Gestión de turnos médicos',
        subItems: [],
      },
      {
        icon: <LuPersonStanding />,
        title: 'Tipo de Personal',
        href: '/personal/tipo-personal',
        description: 'Gestión de tipos de personal médico',
        subItems: [],
      },
    ],
  },
  {
    icon: <LuBuilding2 />,
    title: 'Postas',
    href: '/posta',
    description: 'Lista de postas',
    subItems: [],
  },
  {
    icon: <LuCalendar />,
    title: 'Citas',
    href: '/citas',
    description: 'Gestión de citas médicas',
    subItems: [],
  },
  {
    icon: <LuPersonStanding />,
    title: 'Pacientes',
    href: '/paciente',
    description: 'Registro y control de pacientes',
    subItems: [],
  },
  {
    icon: <MdOutlineQueuePlayNext />,
    title: 'Atenciones',
    href: '/atencion',
    description: 'Historial de atenciones médicas',
    subItems: [],
  },
  {
    icon: <GiMedicines />,
    title: 'Medicina',
    href: '/medicina',
    description: 'Control de medicinas disponibles',
    subItems: [
      {
        icon: <TbCategoryPlus />,
        title: 'Categorías',
        href: '/medicina/categorias',
        description: 'Gestión de categorías',
        subItems: [],
      },
      {
        icon: <IoGift />,
        title: 'Presentaciones',
        href: '/medicina/presentaciones',
        description: 'Gestión de presentaciones',
        subItems: [],
      },
    ],
  },
  {
    icon: <IoMdPhotos />,
    title: 'Galeria',
    href: '/galeria',
    description: 'Visualizar galería de imágenes',
    subItems: [],
  },
  {
    icon: <LuSpellCheck2 />,
    title: 'CMS',
    href: '/cms',
    description: 'Gestión de contenido del sitio',
    subItems: [],
  },
];
