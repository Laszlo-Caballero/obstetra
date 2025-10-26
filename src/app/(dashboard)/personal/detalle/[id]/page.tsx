import { ResponsePersonal } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { redirect } from 'next/navigation';
import React from 'react';
import DetallePersonal from './MainSection';

export default async function DetallePersonalPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const resPersonal = await fetcher<ResponsePersonal>(`/personal/${id}`);

  if (!resPersonal) {
    redirect('/mantenimiento');
  }
  return <DetallePersonal data={resPersonal.data} />;
}
