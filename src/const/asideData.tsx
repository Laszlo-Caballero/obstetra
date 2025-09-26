import { AsideProps } from '@/interface/aside';
import { SiDatabricks } from 'react-icons/si';
import { LuCalendar, LuPersonStanding, LuStethoscope } from 'react-icons/lu';
import { LuBuilding2 } from 'react-icons/lu';
import { MdOutlineQueuePlayNext } from 'react-icons/md';
import { GiMedicines } from 'react-icons/gi';
import { IoMdPhotos } from 'react-icons/io';
import { TbCategoryPlus } from 'react-icons/tb';

export const asideData: AsideProps[] = [
  {
    icon: <SiDatabricks />,
    title: 'Programas',
    href: '/programas',
    description: 'Administrar programas',
    subItems: [],
  },
  {
    icon: <LuStethoscope />,
    title: 'Obstetras',
    href: '/obstetras',
    description: 'Lista de obstetras',
    subItems: [],
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
        description: 'Gestión de categorías de medicinas',
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
];
