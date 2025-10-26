import { ResponsePosta, TipoPersonal, Turno } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { redirect } from 'next/navigation';

import React from 'react';
import CreatePersonal from './MainSection';
import { getToken } from '@/utils/getToken';

export default async function MainSectionPersonal() {
  const token = await getToken();

  const resTurno = await fetcher<Turno[]>('/turnos', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resTipo = await fetcher<TipoPersonal[]>('/tipo-personal', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  const resPosta = await fetcher<ResponsePosta[]>('/posta', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resTipo || !resTurno || !resPosta) {
    redirect('/mantenimiento');
  }

  return <CreatePersonal tipos={resTipo.data} turnos={resTurno.data} postas={resPosta.data} />;
}
