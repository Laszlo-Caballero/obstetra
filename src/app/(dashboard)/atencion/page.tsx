import React from 'react';
import { getToken } from '@/utils/getToken';
import { env } from '@/config/env';
import { Response, ResponseCita } from '@/interface/response.interface';
import AtencionView from '@/modules/atencion/components/AtencionView';

export default async function AtencionPage() {
  const token = await getToken();

  const res = await fetch(`${env.url_api}/cita/personal/hoy`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: 'no-store', // Ensure fresh data on every request
  });

  const data: Response<ResponseCita[]> = await res.json();

  return <AtencionView initialCitas={data.data || []} />;
}
