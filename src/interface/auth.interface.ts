export interface UserContextData {
  user: ResponseUser;
  token: string;
}

export interface ResponseUser {
  userId: number;
  user: string;
  password: string;
  personal: Personal;
  role: Role;
}

export interface Personal {
  personalId: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  fechaNacimiento: string;
  sexo: string;
  telefono: string;
  dni: string;
  codigoColegio: string;
  estado: boolean;
}

export interface Role {
  roleId: number;
  roleName: string;
}
