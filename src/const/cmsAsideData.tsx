import { AsideProps } from '@/interface/aside';
import { GoHome } from 'react-icons/go';
import { RiCapsuleFill } from 'react-icons/ri';
interface CmsAsideProps {
  title: string;
  items: AsideProps[];
}

export const asideData: CmsAsideProps[] = [
  {
    title: 'Contenido',
    items: [
      {
        href: '/cms',
        icon: <GoHome />,
        title: 'Inicio',
        description: '',
        subItems: [],
      },
      {
        href: '/cms/citas',
        icon: <RiCapsuleFill />,
        title: 'Citas',
        description: '',
        subItems: [],
      },
    ],
  },
  {
    title: 'Dashboard',
    items: [
      {
        href: '/',
        icon: <GoHome />,
        title: 'Dashboard',
        description: 'Ver estadísticas y reportes',
        subItems: [],
      },
    ],
  },
];
