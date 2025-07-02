import { Component, Input, OnInit  } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../../interfaces/Proyecto';
import { Habilidad } from '../../../interfaces/Habilidad';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-dev',
  imports: [SafeUrlPipe, CommonModule, RouterLink],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent implements OnInit {
  webs: Proyecto[] = [];
  habilidades: Habilidad[] = [];
  @Input() maxLength: number = 250; 

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Proyecto[]>('assets/data/proyectos.json')
      .subscribe(data => {
        const filtrados  = data.filter(p => p.categoria === 'web');
        this.webs = filtrados
          .sort((a, b) => b.id - a.id) // Ordenar de mayor a menor ID
          .map(web => {
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

    this.http.get<Habilidad[]>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data;
      });    
  }

  cambiarSlide(web: Proyecto, direccion: number) {
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
