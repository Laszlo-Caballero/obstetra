import React from "react";
import { LuShieldOff, LuX } from "react-icons/lu";
import Button from "../../button/Button";

export default function ToastFailed() {
  return (
    <div className="flex items-center justify-around rounded-3xl px-3 py-2.5 bg-ob-red-2 w-[360px] h-[73px] ">
      <span className="flex items-center gap-x-2.5 text-ob-white">
        <LuShieldOff size={26} />
        <span>
          <h3 className="text-sm font-medium">Recuperacion Fallida</h3>
          <p className=" text-[13px]">
            No pudimos enviar el correo de recuperación.
          </p>
        </span>
      </span>
      <div className="flex items-center gap-x-2">
        <Button className="bg-ob-red-2 py-1.5 px-2 border border-ob-red-3 text-ob-white">
          Reintentar
        </Button>
        <Button className="p-1.5 bg-ob-red-2 border border-ob-red-3">
          <LuX size={18} className="text-ob-white" />
        </Button>
      </div>
    </div>
  );
}
