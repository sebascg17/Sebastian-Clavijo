import { Component, OnInit  } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Habilidades {
  nombre: string;
  icono: string;
}

interface Web {  
  titulo: string;
  descripcion: string[];
  videoUrl?: string;
  imagenes: string[];
  tecnologias: {
    nombre: string;
    icono: string;
  }[];
  enlaceCodigo: string;
  enlaceDemo?: string;
  currentSlide?: number;
  medios?: string[];
  expandido?: boolean;
}

@Component({
  standalone: true,
  selector: 'app-dev',
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent implements OnInit {
  webs: Web[] = [];
  habilidades: Habilidades[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Web[]>('assets/data/web.json')
      .subscribe(data => {
        this.webs = data.map(web => {
          let videoUrl = web.videoUrl;
          if (videoUrl) {
            videoUrl = this.convertirYoutubeEmbed(videoUrl);
          }
          return {
            ...web,
            videoUrl,
            expandido: false,
            currentSlide: 0,
            medios: videoUrl ? [videoUrl, ...web.imagenes] : [...web.imagenes]
          }
        });
      });

    this.http.get<Habilidades[]>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data;
      });    
  }

  cambiarSlide(web: Web, direccion: number) {
    const total = web.medios?.length ?? 0;
    if (total === 0) return;
    web.currentSlide = (web.currentSlide! + direccion + total) % total;
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
