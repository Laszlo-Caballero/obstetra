import { fetcher } from '@/libs/fetch';
import { Modulo, Prioridad, Tipo } from '@/interface/response.interface';
import { redirect } from 'next/navigation';
import CreateConsulta from './MainSection';

export default async function MainSectionConsulta() {
  const resModulo = await fetcher<Modulo[]>('/ayuda/modulo');
  const resPrioridad = await fetcher<Prioridad[]>('/ayuda/prioridad');
  const resTipo = await fetcher<Tipo[]>('/ayuda/tipo-consulta');

  if (!resModulo || !resPrioridad || !resTipo) {
    redirect('/mantenimiento');
  }

  return (
    <CreateConsulta modulos={resModulo.data} prioridades={resPrioridad.data} tipos={resTipo.data} />
  );
}
