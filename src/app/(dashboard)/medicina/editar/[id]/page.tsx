import {
  ResponseCategoria,
  ResponseMedicina,
  ResponsePresentacion,
} from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import { redirect } from 'next/navigation';
import EditMedicina from './MainSection';

export default async function EditMedicinaPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;

  const resCategoria = await fetcher<ResponseCategoria[]>('/farmacia/categoria/raw-categorias');

  const resPresentacion = await fetcher<ResponsePresentacion[]>(
    '/farmacia/presentacion/raw-presentaciones',
  );

  const resMedicina = await fetcher<ResponseMedicina>(`/farmacia/medicina/${id}`);

  if (!resCategoria || !resPresentacion || !resMedicina) {
    redirect('/mantenimiento');
  }
  return (
    <EditMedicina
      categorias={resCategoria.data}
      presentaciones={resPresentacion.data}
      preloadedData={resMedicina.data}
    />
  );
}
