import {
  ResponsePersonal,
  ResponsePosta,
  TipoPersonal,
  Turno,
} from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { redirect } from 'next/navigation';

import { getToken } from '@/utils/getToken';
import EditarPersonal from './MainSection';

export default async function MainSectionPersonal({ params }: { params: Promise<{ id: string }> }) {
  const token = await getToken();
  const { id } = await params;

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

  const resPersonal = await fetcher<ResponsePersonal>(`/personal/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (!resTipo || !resTurno || !resPosta || !resPersonal) {
    redirect('/mantenimiento');
  }

  return (
    <EditarPersonal
      tipos={resTipo.data}
      turnos={resTurno.data}
      postas={resPosta.data}
      personal={resPersonal.data}
    />
  );
}
