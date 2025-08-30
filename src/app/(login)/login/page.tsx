import React from 'react'
import { LuHeartPulse } from "react-icons/lu";
import { LuShield } from "react-icons/lu";


export default function LoginPage() {
    return (
        <div className='flex justify-center items-center h-screen'>
            <main className='bg-ob-black-3 border-1 border-ob-gray rounded-3xl w-lg'>
                <div className='flex justify-between p-5 border-b border-ob-gray'>
                    <div className='flex items-center gap-x-3'>
                        <span className='bg-ob-black-2 p-2 rounded-lg'>
                            <LuHeartPulse size={18}/>
                        </span>
                        <p className='text-lg font-medium'> Portal Obstetrico</p>
                    </div>
                    <div className='flex justify-center items-center gap-x-2 bg-ob-black-5 rounded-full px-2'>
                        <span>
                            <LuShield className='text-ob-gray-2' size={14}/>
                        </span>
                        <p className='text-xs text-ob-gray-2'>
                            Acceso Seguro
                        </p>
                    </div>
                </div>
                <form className='flex flex-col gap-y-4 p-5'>
                    <div className='flex flex-col'>
                        <span className='text-lg font-medium text-ob-white'>Iniciar Sesion</span>
                        <p className='text-sm text-ob-gray-2'>Ingresa tu usuario, contraseña y la posta donde trabaja</p>
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label className='text-ob-gray-2 font-medium'>Usuario</label>
                        <input className='bg-ob-black-4 rounded-xl placeholder-ob-white py-2 px-3 border border-ob-gray' type="text" placeholder='tu.ususario@hospital.com' />
                    </div>
                    <div className='flex flex-col gap-y-1'>
                        <label className='text-ob-gray-2 font-medium'>Contraseña</label>
                        <input className='bg-ob-black-4 rounded-xl placeholder-ob-white py-2 px-3 border border-ob-gray' type="password" placeholder='**********' />
                    </div>
                    <div>
                        <label htmlFor="">Posta</label>
                        <input type="password"  />
                    </div>
                </form>
            </main>
        </div>
    ) 
}
