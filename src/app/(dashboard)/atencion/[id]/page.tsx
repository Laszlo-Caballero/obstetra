import React from 'react';
import { getToken } from '@/utils/getToken';
import { env } from '@/config/env';
import { Response, ResponseCita } from '@/interface/response.interface';
import ConsultaView from '@/modules/atencion/components/ConsultaView';
import { notFound } from 'next/navigation';

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function ConsultaPage({ params }: PageProps) {
  const { id } = await params;
  const token = await getToken();

  try {
    const res = await fetch(`${env.url_api}/cita/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: 'no-store',
    });

    if (!res.ok) {
      if (res.status === 404) notFound();
      throw new Error('Error fetching cita');
    }

    const data: Response<ResponseCita> = await res.json();

    return <ConsultaView cita={data.data} />;
  } catch (error) {
    console.error(error);
    return <div>Error al cargar la consulta</div>;
  }
}
