import React from "react";
import { LuCircleCheckBig, LuX } from "react-icons/lu";
import Button from "../../button/Button";

export default function ToastSave() {
  return (
    <div className="flex items-center justify-around rounded-3xl px-3 py-2.5 bg-ob-teal-3 w-[360px] h-[73px] ">
      <span className="flex items-center gap-x-2.5 text-ob-white">
        <LuCircleCheckBig size={24} />
        <span>
          <h3 className="text-sm font-medium">Cambios Guardados</h3>
          <p className=" text-[13px]">La Medicina se creo Correctamente</p>
        </span>
      </span>
      <div className="flex items-center gap-x-2">
        <Button className="bg-ob-teal-3 py-1.5 px-2 border border-ob-teal-4 text-ob-white">
          Deshacer
        </Button>
        <Button className="p-1.5 bg-ob-teal-3 border border-ob-teal-4">
          <LuX size={18} className="text-ob-white" />
        </Button>
      </div>
    </div>
  );
}
