import React from "react";
import { PiWarning } from "react-icons/pi";
import Button from "../../button/Button";
import { LuX } from "react-icons/lu";

export default function ToastWarning() {
  return (
    <div className="flex items-center justify-around rounded-3xl px-3 py-2.5 bg-ob-orange w-[360px] h-[73px] ">
      <span className="flex items-center gap-x-2.5 text-ob-black">
        <PiWarning size={26} />
        <span>
          <h3 className="text-sm font-medium">Archivo Grande</h3>
          <p className=" text-[13px]">El Excel Supera el Tamaño recomendado.</p>
        </span>
      </span>
      <div className="flex items-center gap-x-2">
        <Button className="bg-ob-orange py-1.5 px-2 border border-ob-orange-2 text-ob-black">
          Detalles
        </Button>
        <Button className="p-1.5 bg-ob-orange border border-ob-orange-2">
          <LuX size={18} className="text-ob-black" />
        </Button>
      </div>
    </div>
  );
}
