import { ResponseCategoria, ResponsePresentacion } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import React from 'react';
import CreateMedicina from './MainSection';
import { redirect } from 'next/navigation';

export default async function MainSectionMedicina() {
  const resCategoria = await fetcher<ResponseCategoria[]>('/farmacia/categoria/raw-categorias');

  const resPresentacion = await fetcher<ResponsePresentacion[]>(
    '/farmacia/presentacion/raw-presentaciones',
  );

  if (!resCategoria || !resPresentacion) {
    redirect('/matenimiento');
  }

  return <CreateMedicina categorias={resCategoria.data} presentaciones={resPresentacion.data} />;
}
