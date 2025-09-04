export interface Response<T> {
  status: number;
  message: string;
  data: T;
  metadata?: {
    totalItems: number;
    totalPages: number;
    currentPage: number;
  };
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
