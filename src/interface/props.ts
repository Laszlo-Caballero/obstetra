import { ReactNode, SVGProps } from "react";

export type Options = {
  label: ReactNode;
  value: string;
};
export type IconProps = SVGProps<SVGElement> & {
  size?: number;
};
