import Breadcrums from '@/components/ui/breadcrums/Breadcrums';
import ButtonLink from '@/components/ui/button-link/ButtonLink';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import { ResponseUser } from '@/interface/user.interface';
import { fetcher } from '@/libs/fetch';
import TablaUsuarios from '@/modules/usuarios/tabla/TablaUsuarios';
import { GoHome } from 'react-icons/go';
import { LuUsers, LuPlus } from 'react-icons/lu';
import { Response } from '@/interface/response.interface';
import { getToken } from '@/utils/getToken';

export default async function UsuariosPage() {
  const token = await getToken();
  const data = await fetcher<ResponseUser[]>('usuarios?limit=10&page=1', {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

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
            title: 'Usuarios',
            href: '/usuarios',
          },
        ]}
      />
      <section className="flex items-center justify-between">
        <Title
          title="Usuarios"
          description="Gestión de usuarios del sistema"
          icon={<LuUsers size={18} />}
        />
        <ButtonLink className="bg-ob-teal text-white" href="/usuarios/crear">
          <LuPlus size={18} />
          Crear Usuario
        </ButtonLink>
      </section>

      <InfoContainer className="dark:bg-ob-black-6 bg-white">
        <TablaUsuarios
          data={data?.data || []}
          total={data?.metadata?.totalItems}
          totalPage={data?.metadata?.totalPages}
          limit={10}
        />
      </InfoContainer>
    </div>
  );
}
