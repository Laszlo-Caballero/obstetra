'use client';
import AsideIcon from '@/components/ui/aside-icon/AsideIcon';
import { asideData } from '@/const/asideData';
import { LuHeartPulse } from 'react-icons/lu';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { useAuth } from '@/components/context/AuthContext';
import { RolesEnum } from '@/enum/roles';
import { useState } from 'react';
import cx from '@/libs/cx';
import { AnimatePresence, motion } from 'motion/react';

export default function Aside() {
  const { user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.aside
      className={cx(
        'bg-ob-black border-ob-gray sticky top-0 flex h-screen w-[88px] cursor-pointer flex-col items-center border-r px-[9px] py-3',
        isOpen && 'w-[300px] items-start',
      )}
      layout
      animate={{ width: isOpen ? 300 : 88 }}
    >
      <motion.div
        className={cx(
          'flex w-full justify-center overflow-hidden py-1.5',
          isOpen && 'border-ob-blue items-center justify-start gap-x-2 rounded-lg border p-2',
        )}
        onClick={() => setIsOpen(!isOpen)}
      >
        <span
          className={cx('border-ob-blue flex size-[40px] justify-center rounded-xl border-2 p-2.5')}
        >
          <LuHeartPulse className="text-ob-white size-5" />
        </span>

        <AnimatePresence>
          {isOpen && (
            <div>
              <span className="text-ob-white text-lg font-medium text-nowrap">
                Portal Obstetrico
              </span>
              <p className="text-ob-gray-2 text-sm">Versión 1.0</p>
            </div>
          )}
        </AnimatePresence>
      </motion.div>

      <div
        className={cx(
          'flex w-full flex-col items-center gap-y-1.5 overflow-y-auto py-3',
          isOpen && 'w-full items-start',
        )}
      >
        <p className={cx('text-ob-gray-2 mb-1.5 text-xs', isOpen && 'px-2 font-medium')}>Modulos</p>

        {asideData.map((item, i) => {
          return <AsideIcon key={i} {...item} isOpen={isOpen} />;
        })}
      </div>

      <div className="border-ob-gray-4 mt-auto w-full border-t">
        <AsideIcon
          subItems={[]}
          icon={<AiOutlineQuestionCircle />}
          title="Ayuda"
          description="Centro de ayuda y soporte"
          isOpen={isOpen}
          href={
            user?.role.roleName === RolesEnum.Administrador
              ? '/ayuda/administrar'
              : '/ayuda/consulta'
          }
        />
      </div>
    </motion.aside>
  );
}
