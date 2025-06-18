import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

interface Habilidades {
  icono: string;
  nombre: string;
}

interface Proyecto {
  tipo: 'videojuego' | 'web';
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
  currentSlide?: number;
  medios?: string[];
  expandido?: boolean;
}

@Component({
  selector: 'app-portafolio',
  imports: [SafeUrlPipe, CommonModule, MatCardModule, RouterLink],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  destacados: Proyecto[] = [];
  habilidades: Habilidades[] = [];
  @Input() maxLength: number = 250; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDestacados();
  }

  cargarDestacados() {
    this.http.get<any[]>('assets/data/videojuegos.json').subscribe(juegos => {
      const destacadosJuegos = juegos
        .filter(j => j.destacado)
        .map(j => {
          let videoUrl = j.videoUrl;
          if (videoUrl) {
            videoUrl = this.convertirYoutubeEmbed(videoUrl);
          }
          return {
            ...j,
            tipo: 'videojuego',
            videoUrl,
            expandido: false,
            currentSlide: 0,
            medios: videoUrl ? [videoUrl, ...j.imagenes] : [...j.imagenes]
          };
        });

      this.http.get<any[]>('assets/data/web.json').subscribe(webs => {
        const destacadosWeb = webs
          .filter(w => w.destacado)
          .map(w => {
            let videoUrl = w.videoUrl;
            if (videoUrl) {
              videoUrl = this.convertirYoutubeEmbed(videoUrl);
            }
            return {
              ...w,
              tipo: 'web',
              videoUrl,
              expandido: false,
              currentSlide: 0,
              medios: videoUrl ? [videoUrl, ...w.imagenes] : [...w.imagenes]
            };
          });

        this.destacados = [...destacadosJuegos, ...destacadosWeb];
      });
    });

    this.http.get<Habilidades[]>('assets/data/habilidades.json').subscribe(data => {
      this.habilidades = data;
    });
  }

  cambiarSlide(destacado: Proyecto, direccion: number) {
    const total = destacado.medios?.length ?? 0;
    if (total === 0) return;
    destacado.currentSlide = (destacado.currentSlide! + direccion + total) % total;
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
