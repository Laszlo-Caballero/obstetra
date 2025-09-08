export interface ResponseUser {
  userId: number;
  user: string;
  password: string;
  personal: Personal;
  role: Role;
  recurso: Recurso;
}

export interface Personal {
  personalId: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  correo: string;
  sexo: string;
  telefono: string;
  dni: string;
  codigoColegio: string;
  estado: boolean;
  posta: Posta[];
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
  roleName: string;
}

export interface Recurso {
  recursoId: number;
  nombre: string;
  extension: string;
  url: string;
  fechaSubida: string;
}
