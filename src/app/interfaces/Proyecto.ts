export interface Proyecto {
  id: number;
  categoria: 'videojuego' | 'web';
  titulo: string;
  descripcion: string[];
  tecnologias: {
    nombre: string;
    icono: string;
  }[];
  imagenes: string[];
  videoUrl?: string;
  enlaceCodigo: string;
  enlaceDescarga?: string;
  enlaceDemo?: string;
  destacado?: boolean;
  medios?: string[];
  currentSlide?: number;
  expandido?: boolean;
  
  rol?: string;
  lugar?: string;
  colaboradores?: string[];
  retos?: string[];
  logros?: string[];
  problema?: string;
  solucion?: string;
}
