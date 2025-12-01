import Button from '@/components/ui/button/Button';
import CardInfo from '@/components/ui/cardInfo/CardInfo';
import InfoContainer from '@/components/ui/info-container/InfoContainer';
import Title from '@/components/ui/title/Title';
import MetasArea from '@/modules/home/metas/MetasArea';
import MetasEmpleado from '@/modules/home/metas/MetasEmpleado';
import { FiRefreshCcw } from 'react-icons/fi';
import { GoGoal } from 'react-icons/go';
import { PiPulseBold } from 'react-icons/pi';

export default function Home() {
  return (
    <div className="flex w-full flex-col gap-y-4 p-5">
      <section className="flex items-center justify-between">
        <Title
          title="Resumen y Metas"
          description="Seguimiento de Metas menusales y anuales del empleado y de su área"
          icon={<GoGoal size={18} />}
        />
        <Button
          type="button"
          className="border-ob-white-3 dark:border-ob-gray-4 text-ob-black-4 border bg-transparent font-semibold dark:text-white"
        >
          <FiRefreshCcw size={18} />
          Actualizar
        </Button>
      </section>

      <InfoContainer>
        <span>KPI's rapidos</span>
        <div className="flex items-center gap-x-3">
          <CardInfo
            title="Citas Atendidad"
            description="128"
            icon={<PiPulseBold size={18} />}
            className={{ description: 'text-xl', main: 'w-full' }}
          />
          <CardInfo
            title="Citas Atendidad"
            description="128"
            className={{ description: 'text-xl', main: 'w-full' }}
            icon={<PiPulseBold size={18} />}
          />
          <CardInfo
            title="Citas Atendidad"
            description="128"
            className={{ description: 'text-xl', main: 'w-full' }}
            icon={<PiPulseBold size={18} />}
          />
        </div>
      </InfoContainer>

      <div className="grid grid-cols-2 gap-2">
        <MetasEmpleado />
        <MetasArea />
      </div>
    </div>
  );
}
