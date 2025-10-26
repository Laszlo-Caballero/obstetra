import { ResponsePosta, TipoPersonal, Turno } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { redirect } from 'next/navigation';

import React from 'react';
import CreatePersonal from './MainSection';

export default async function MainSectionPersonal() {
  const resTurno = await fetcher<Turno[]>('/turnos');
  const resTipo = await fetcher<TipoPersonal[]>('/tipo-personal');
  const resPosta = await fetcher<ResponsePosta[]>('/posta');

  if (!resTipo || !resTurno || !resPosta) {
    redirect('/mantenimiento');
  }

  return <CreatePersonal tipos={resTipo.data} turnos={resTurno.data} postas={resPosta.data} />;
}
