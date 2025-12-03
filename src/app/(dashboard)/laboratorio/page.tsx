import { getToken } from '@/utils/getToken';
import { env } from '@/config/env';
import { Response, ResponsePruebaLaboratorio } from '@/interface/response.interface';
import LaboratorioView from '@/modules/laboratorio/components/LaboratorioView';
import axios from 'axios';
import { redirect } from 'next/navigation';

export default async function LaboratorioPage({
  searchParams,
}: {
  searchParams: { page?: string; limit?: string };
}) {
  const token = await getToken();
  if (!token) {
    redirect('/auth/login');
  }

  const page = searchParams.page || '1';
  const limit = searchParams.limit || '10';

  try {
    const res = await axios.get<Response<ResponsePruebaLaboratorio[]>>(
      `${env.url_api}/prueba-laboratorio?limit=${limit}&page=${page}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    return <LaboratorioView data={res.data.data} />;
  } catch (error) {
    console.error('Error fetching laboratorio data:', error);
    return (
      <div className="flex h-screen items-center justify-center text-white">
        Error al cargar los datos de laboratorio.
      </div>
    );
  }
}
