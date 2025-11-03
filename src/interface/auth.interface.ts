import { RolesEnum } from '@/enum/roles';

export interface ResponseAuth {
  message: string;
  status: boolean;
  role: string;
}

export interface UserContextData {
  userId: number;
  user: string;
  password: string;
  personal: Personal;
  role: Role;
  // token: string;
  recurso: Recurso;
  code_otp: string;
}

export interface Personal {
  personalId: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  correo: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  dni: string;
  codigoColegio: string;
  estado: boolean;
  posta: Posta;
}

export interface Posta {
  postaId: number;
  ruc: string;
  nombre: string;
  direccion: string;
  ipress: string;
  lat: string;
  lng: string;
  altitud: string;
  capacidad: number;
  fechaInicioActividad: string;
  fechaCreacion: string;
  estado: boolean;
}

export interface Role {
  roleId: number;
  roleName: RolesEnum;
}

export interface Recurso {
  recursoId: number;
  nombre: string;
  extension: string;
  url: string;
  fechaSubida: string;
}
