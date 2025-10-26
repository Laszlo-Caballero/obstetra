import { ResponsePersonal, ResponsePrograma } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { redirect } from 'next/navigation';
import React from 'react';
import EditPrograma from './MainSection';

export default async function EditarProgramaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const resResponsable = await fetcher<ResponsePersonal[]>('/personal');

  const resPrograma = await fetcher<ResponsePrograma>(`/programa/${id}`);

  if (!resResponsable || !resPrograma) {
    redirect('/mantenimiento');
  }

  return <EditPrograma responsables={resResponsable.data} preloadedData={resPrograma.data} />;
}
