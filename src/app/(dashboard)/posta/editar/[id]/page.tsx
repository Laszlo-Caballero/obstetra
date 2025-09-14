import { ResponsePosta, ResponseRegion } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import React from 'react';
import MainSection from './MainSection';
import { redirect } from 'next/navigation';

export default async function UpdatePosta({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const res = await fetcher<ResponseRegion[]>('utils/regiones');

  const resPosta = await fetcher<ResponsePosta>(`posta/${id}`);

  if (!res || !resPosta) redirect('/404');

  return <MainSection regiones={res.data} defaultData={resPosta.data} />;
}
