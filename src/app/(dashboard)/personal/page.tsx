import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import { ResponsePersonal, ResponsePosta, TipoPersonal } from '@/interface/response.interface';
import { fetcher } from '@/libs/fetch';
import FiltrosPersonal from '@/modules/personal/Filtros/FiltrosPersonal';
import SearchPersonal from '@/modules/personal/Filtros/SearchPersonal';
import TablaPersonal from '@/modules/personal/Tabla/TablaPersonal';
import { getToken } from '@/utils/getToken';
import { GoHome } from 'react-icons/go';
import { LuIdCard, LuPlus } from 'react-icons/lu';

export default async function PersonalPage() {
  const token = await getToken();

  const data = await fetcher<ResponsePersonal[]>('personal');

  const tipos = await fetcher<TipoPersonal[]>('tipo-personal', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const postas = await fetcher<ResponsePosta[]>('posta');

  return (
    <div className="flex w-full flex-col gap-y-4 p-5">
      <Breadcrums
        items={[
          {
            title: 'Inicio',
            icon: <GoHome />,
            href: '/',
          },
          {
            title: 'Personal',
            href: '/personal',
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <Title
          title="Personal Médico"
          description="Registra nuevo personal y consulta historiales"
          icon={<LuIdCard size={18} />}
        />
        <ButtonLink className="text-ob-black bg-ob-teal" href="/personal/crear">
          <LuPlus size={18} />
          Registrar Personal
        </ButtonLink>
      </section>

      <InfoContainer className="bg-ob-black-6">
        <div className="flex items-center gap-x-2">
          <SearchPersonal />
          <FiltrosPersonal tipos={tipos?.data} postas={postas?.data} />
        </div>
        <TablaPersonal
          data={data?.data || []}
          total={data?.metadata?.totalItems}
          totalPage={data?.metadata?.totalPages}
          limit={10}
        />
      </InfoContainer>
    </div>
  );
}
