'use client';
import AsideIcon from '@/components/ui/aside-icon/AsideIcon';
import { asideData } from '@/const/asideData';
import { LuHeartPulse } from 'react-icons/lu';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useAuth } from '@/components/context/AuthContext';
import { RolesEnum } from '@/enum/roles';

export default function Aside() {
  const { user } = useAuth();

  return (
    <aside className="bg-ob-black border-ob-gray sticky top-0 flex h-screen w-[88px] flex-col items-center border-r px-[9px] py-3">
      <div className="flex w-full justify-center py-1.5">
        <span className="border-ob-blue flex size-[40px] justify-center rounded-xl border-2 p-2.5">
          <LuHeartPulse className="text-ob-white size-5" />
        </span>
      </div>

      <div className="flex flex-col items-center gap-y-1.5 overflow-y-auto py-3">
        <p className="text-ob-gray-2 mb-1.5 text-xs">Modulos</p>

        {asideData.map((item, i) => {
          return <AsideIcon key={i} {...item} />;
        })}
      </div>

      <div className="mt-auto w-full">
        <AsideIcon
          icon={<AiOutlineQuestionCircle />}
          title="Ayuda"
          href={
            user?.role.roleName === RolesEnum.Administrador
              ? '/ayuda/administrar'
              : '/ayuda/consulta'
          }
        />
      </div>
    </aside>
  );
}
