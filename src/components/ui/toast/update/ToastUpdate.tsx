import React from "react";
import { LuInfo, LuX } from "react-icons/lu";
import Button from "../../button/Button";

export default function ToastUpdate() {
  return (
    <div className="flex items-center justify-around rounded-3xl px-3 py-2.5 font-semibold bg-ob-black-9 w-[360px] h-[57px] border border-ob-gray">
      <span className="flex items-center gap-x-2.5 text-ob-white">
        <LuInfo size={18} />
        <span>
          <h3 className="text-sm">Consultas Actualizadas</h3>
          <p className="text-ob-gray-2 text-[13px]">
            Se Cambio el estado de 3 consultas
          </p>
        </span>
      </span>
      <Button className="p-1.5 bg-ob-black-9 border border-ob-gray">
        <LuX size={18} className="text-white" />
      </Button>
    </div>
  );
}
