import { Personal } from './auth.interface';

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
  stockMinimo: number;
  dosis: string;
  unidades: number;
  necesitaReceta: boolean;
  fechaCreacion: string;
  estado: boolean;
  categoria: Categoria;
  presentacion: Presentacion;
  recurso: Resource;
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

export interface ResponsePersona {
  dni: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
  nombres: string;
  fechaNacimiento: string;
  fechaInscripcion: string;
  fechaEmision: string;
  fechaCaducidad: string;
  ubigeoNacimiento: string;
  ubigeoDomicilio: string;
  direccion: string;
  sexo: string;
  estadoCivil: string;
  codigoFicha: string;
  madre: string;
  padre: string;
  departamento: string;
  provincia: string;
  distrito: string;
  estado: boolean;
}

export interface ResponseReniec {
  status: number;
  message: string;
  data: ResponsePersona;
}
export interface ResponseGaleria {
  folders: string[];
  files: string[];
}

export interface ResponseRegion {
  regionId: number;
  nombre: string;
}

export interface ResponseProvincia {
  provinciaId: number;
  nombre: string;
}

export interface ResponseDistrito {
  distritoId: number;
  nombre: string;
}
export interface ResponseDocumentacion {
  _id: string;
  version: number;
  resource: Resource;
  user: User;
  __v: number;
}

export interface Resource {
  nombre: string;
  extension: string;
  url: string;
  recursoId: number;
  fechaSubida: string;
}

export interface User {
  userId: number;
  nombre: string;
  apellidoPaterno: string;
  apellidoMaterno: string;
}

export interface ResponsePaciente {
  pacienteId: number;
  dni: string;
  nombres: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento: string;
  telefono: string;
  nota: string;
  direccion: string;
  sexo: string;
  departamento: string;
  provincia: string;
  distrito: string;
  estado: boolean;
  // citas: any[] //TODO:
}

export interface ResponsePresentacion {
  presentacionId: number;
  nombre: string;
  estado: boolean;
}

export interface ResponseCategoria {
  categoriaId: number;
  nombre: string;
  estado: boolean;
}

export interface ResponseBlogCategoria {
  _id: string;
  name: string;
  slug: string;
  iconName: string;
  blogCategoryId: number;
  __v: number;
}

export interface ResponseTipoPersonal {
  tipoPersonalId: number;
  nombre: string;
  estado: boolean;
}

export interface ResponseTurno {
  turnoId: number;
  horaInicio: string;
  horaFin: string;
  estado: boolean;
}

export interface ResponsePersonal {
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
  turno: Turno;
  posta: ResponsePosta[];
  tipoPersonal: TipoPersonal;
  personalId: number;
  nota: string;
}

export interface Turno {
  turnoId: number;
  horaInicio: string;
  horaFin: string;
  estado: boolean;
}

export interface TipoPersonal {
  tipoPersonalId: number;
  nombre: string;
  estado: boolean;
}

export interface ResponsePrograma {
  nombre: string;
  descripcion: string;
  estado: boolean;
  cupoMaximo: number;
  deribacion: boolean;
  responsable: ResponsePersonal;
  programaId: number;
}
