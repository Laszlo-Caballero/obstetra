import { SVGProps } from 'react';

export type Options = {
  label: string;
  value: string;
};
export type IconProps = SVGProps<SVGElement> & {
  size?: number;
};
