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
  nombre: string;
  direccion: string;
  ipress: string;
  lat: string;
  lng: string;
  capacidad: number;
  estado: boolean;
  region: Region;
}

export interface Region {
  regionId: number;
  nombre: string;
}
