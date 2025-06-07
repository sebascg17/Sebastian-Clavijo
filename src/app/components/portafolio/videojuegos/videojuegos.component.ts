import { Component, OnInit } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe'; // Ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Habilidades {
  icono: string;
  nombre: string;
}

interface Juego {
  titulo: string;
  descripcion: string;
  videoUrl?: string;
  imagenes: string[];
  tecnologias: {
    nombre: string;
    icono: string;
  }[];
  enlaceCodigo: string;
  enlaceDescarga?: string;
  currentSlide?: number;
  medios?: string[]; // combinación de imágenes y video
  expandido?: boolean; // <-- agrega esta línea
}

@Component({
  standalone: true,
  selector: 'app-videojuegos',
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.css'
})
export class VideojuegosComponent implements OnInit {
  juegos: Juego[] = [];
  habilidades: Habilidades[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Juego[]>('assets/data/videojuegos.json')
      .subscribe(data => {
        this.juegos = data.map(juego => ({
          ...juego,
          expandido: false,
          currentSlide: 0,
          medios: juego.videoUrl ? [juego.videoUrl, ...juego.imagenes] : [...juego.imagenes]
        }));
      });

    this.http.get<Habilidades[]>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data;
      });    
  }

  cambiarSlide(juego: Juego, direccion: number) {
    const total = juego.medios?.length ?? 0;
    if (total === 0) return;

    juego.currentSlide = (juego.currentSlide! + direccion + total) % total;
  }

  esImagen(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  esVideo(url?: string): boolean {
    if (!url) return false;
    return url.includes("youtube.com") || url.includes("youtu.be");
  }

}
