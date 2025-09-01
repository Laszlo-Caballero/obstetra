import React from "react";
import { LuHeartPulse } from "react-icons/lu";
import { LuShield } from "react-icons/lu";
import { PiSignInBold } from "react-icons/pi";
import { FiHelpCircle } from "react-icons/fi";
import { RiInformationLine } from "react-icons/ri";

export default function LoginPage() {
    return (
        <div className="flex justify-center items-center h-screen font-inter">
        <main className="bg-ob-black-3 border-1 border-ob-gray rounded-3xl w-[520px]">
            <div className="flex justify-between p-5 border-b border-ob-gray">
            <div className="flex items-center gap-x-3">
                <span className="bg-ob-black-2 p-2 rounded-lg">
                <LuHeartPulse size={18} />
                </span>
                <p className="text-lg font-medium"> Portal Obstetrico</p>
            </div>
            <div className="flex justify-center items-center gap-x-2 bg-ob-black-5 rounded-full px-2">
                <span>
                <LuShield className="text-ob-gray-2" size={14} />
                </span>
                <p className="text-xs text-ob-gray-2">Acceso Seguro</p>
            </div>
            </div>
            <form className="flex flex-col gap-y-4 p-5">
            <div className="flex flex-col">
                <span className="font-medium text-ob-white">Iniciar Sesion</span>
                <p className="text-sm text-ob-gray-2">
                Ingresa tu usuario, contraseña y la posta donde trabaja
                </p>
            </div>
            <div className="flex flex-col gap-y-1">
                <label className="text-ob-gray-2 font-medium" htmlFor="username">Usuario</label>
                <input
                className="bg-ob-black-4 rounded-xl font-medium text-sm placeholder-ob-white py-2 px-3 border border-ob-gray"
                type="text"
                placeholder="tu.ususario@hospital.com"
                id="username"
                />
            </div>
            <div className="flex flex-col gap-y-1">
                <label className="text-ob-gray-2 font-medium" htmlFor="password">Contraseña</label>
                <input
                className="bg-ob-black-4 rounded-xl font-medium text-sm placeholder-ob-white py-2 px-3 border border-ob-gray"
                type="password"
                placeholder="••••••••"
                id="password"
                />
            </div>
            <div>
                <label className="text-ob-gray-2 font-medium">Posta</label>
            </div>
            <div className="flex gap-x-3 text-sm">
                <button className="flex items-center justify-center w-[372px] bg-ob-blue p-2.5 rounded-md gap-x-2">
                    <span>
                        <PiSignInBold size={18} />
                    </span>
                    <p>
                        Entrar
                    </p>
                </button>
                <button className="flex items-center justify-center w-[94px] border border-ob-gray rounded-md gap-x-2">
                    <span>
                        <FiHelpCircle size={18} />
                    </span>
                    <p>
                        Ayuda
                    </p>
                </button>
            </div>
            </form>
            <div className="p-4 border-t border-ob-gray">
                <div className="flex items-center justify-center gap-x-2">
                    <span>
                        <RiInformationLine className="text-ob-gray-2" size={16} />
                    </span>
                    <p className="text-sm text-ob-gray-2">
                        ¿Olvidaste tu contraseña? Contacta al Administrador
                    </p>
                </div>
            </div>
        </main>
        </div>
    );
}
