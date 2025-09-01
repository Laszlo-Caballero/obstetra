import { AsideProps } from "@/interface/aside";
import { SiDatabricks } from "react-icons/si";
import { LuStethoscope } from "react-icons/lu";
import { LuBuilding2 } from "react-icons/lu";
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
];
