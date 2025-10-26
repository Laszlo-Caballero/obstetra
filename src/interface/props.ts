import { SVGProps } from 'react';

export type Options<T = string> = {
  label: string;
  value: T;
};
export type IconProps = SVGProps<SVGElement> & {
  size?: number;
};
