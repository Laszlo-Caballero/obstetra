import MapProvider from '@/modules/posta/components/map-provider/MapProvider';
import { PropsWithChildren } from 'react';

export default function DetalleLayout({ children }: PropsWithChildren) {
  return <MapProvider apiKey={process.env.NEXT_PUBLIC_API_KEY}>{children}</MapProvider>;
}
