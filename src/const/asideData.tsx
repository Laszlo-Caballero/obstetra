import { AsideProps } from "@/interface/aside";
import { SiDatabricks } from "react-icons/si";
import { LuCalendar, LuPersonStanding, LuStethoscope } from "react-icons/lu";
import { LuBuilding2 } from "react-icons/lu";
import { MdOutlineQueuePlayNext } from "react-icons/md";
import { GiMedicines } from "react-icons/gi";
import { IoMdPhotos } from "react-icons/io";
export const asideData: AsideProps[] = [
  {
    icon: <SiDatabricks />,
    title: "Programas",
    href: "/programas",
  },
  {
    icon: <LuStethoscope />,
    title: "Obstetras",
    href: "/obstetras",
  },
  {
    icon: <LuBuilding2 />,
    title: "Postas",
    href: "/posta",
  },
  {
    icon: <LuCalendar />,
    title: "Citas",
    href: "/citas",
  },
  {
    icon: <LuPersonStanding />,
    title: "Pacientes",
    href: "/paciente",
  },
  {
    icon: <MdOutlineQueuePlayNext />,
    title: "Atenciones",
    href: "/atencion",
  },
  {
    icon: <GiMedicines />,
    title: "Medicina",
    href: "/medicina",
  },
  {
    icon: <IoMdPhotos />,
    title: "Galeria",
    href: "/galeria",
  },
];
