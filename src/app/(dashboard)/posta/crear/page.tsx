import { ResponseRegion } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import React from 'react';
import MainSection from './MainSection';
import { redirect } from 'next/navigation';

export default async function CreatePosta() {
  const res = await fetcher<ResponseRegion[]>('utils/regiones');

  if (!res) redirect('/404');

  return <MainSection regiones={res.data} />;
}
