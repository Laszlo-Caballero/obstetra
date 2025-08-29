import AsideIcon from "@/components/ui/aside-icon/AsideIcon";
import { asideData } from "@/const/asideData";
import { LuHeartPulse } from "react-icons/lu";

export default function Aside() {
  return (
    <aside className="flex h-screen w-[88px] py-3 px-[9px] items-center flex-col bg-ob-black border-r border-ob-gray">
      <div className="py-1.5 w-full flex justify-center">
        <span className="p-2.5 border-2 size-[40px] border-ob-blue flex justify-center rounded-xl">
          <LuHeartPulse className="size-5 text-ob-white" />
        </span>
      </div>

      <div className="flex flex-col items-center py-3 gap-y-1.5">
        <p className="text-xs text-ob-gray-2 mb-1.5">Modulos</p>

        {asideData.map((item, i) => {
          return <AsideIcon key={i} {...item} />;
        })}
      </div>
    </aside>
  );
}
