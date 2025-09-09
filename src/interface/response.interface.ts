export interface Response<T> {
  status: number;
  message: string;
  data: T;
  metadata?: MetadataResponse;
}

export interface MetadataResponse {
  totalItems: number;
  totalPages: number;
  currentPage: number;
}

export interface ResponsePosta {
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
  region: Region;
  provincia: Provincia;
  distrito: Distrito;
}

export interface Region {
  regionId: number;
  nombre: string;
}

export interface Provincia {
  provinciaId: number;
  nombre: string;
}

export interface Distrito {
  distritoId: number;
  nombre: string;
}

export interface ResponseConsulta {
  consultaId: number;
  asunto: string;
  descripcion: string;
  correo: string;
  telefono: string;
  estado: boolean;
  modulo: Modulo;
  prioridad: Prioridad;
  tipo: Tipo;
  user: User;
}

export interface Modulo {
  moduloId: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface Prioridad {
  prioridadId: number;
  nombre: string;
  estado: boolean;
}

export interface Tipo {
  tipoId: number;
  nombre: string;
  descripcion: string;
  estado: boolean;
}

export interface User {
  userId: number;
  user: string;
  password: string;
}

export interface ResponseMedicina {
  medicinaId: number;
  nombre: string;
  descripcion: string;
  codigo: string;
  stock: number;
  fechaCreacion: string;
  estado: boolean;
  categoria: Categoria;
  presentacion: Presentacion;
}

export interface Categoria {
  categoriaId: number;
  nombre: string;
  estado: boolean;
}

export interface Presentacion {
  presentacionId: number;
  nombre: string;
  estado: boolean;
}
