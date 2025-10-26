import { ResponsePersonal } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import React from 'react';
import { redirect } from 'next/navigation';
import CreatePrograma from './MainSection';

export default async function MainSectionPrograma() {
  const resResponsable = await fetcher<ResponsePersonal[]>('/personal');

  if (!resResponsable) {
    redirect('/mantenimiento');
  }

  return <CreatePrograma responsables={resResponsable.data} />;
}
