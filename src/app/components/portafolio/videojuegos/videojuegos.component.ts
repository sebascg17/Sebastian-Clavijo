import { Component, OnInit } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe';
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
  medios?: string[];
  expandido?: boolean;
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
        this.juegos = data.map(juego => {
          let videoUrl = juego.videoUrl;
          if (videoUrl) {
            videoUrl = this.convertirYoutubeEmbed(videoUrl);
          }
          return {
            ...juego,
            videoUrl: videoUrl,
            expandido: false,
            currentSlide: 0,
            medios: videoUrl ? [videoUrl, ...juego.imagenes] : [...juego.imagenes]
          };
        });
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

  convertirYoutubeEmbed(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  }
}
