import { Component, Input, OnInit } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../../interfaces/Proyecto';
import { Habilidad } from '../../../interfaces/Habilidad';
import { RouterLink } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-videojuegos',
  imports: [SafeUrlPipe, CommonModule, RouterLink],
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.css'
})
export class VideojuegosComponent implements OnInit {
  juegos: Proyecto[] = [];
  habilidades: Habilidad[] = [];
  @Input() maxLength: number = 250;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Proyecto[]>('assets/data/proyectos.json')
      .subscribe(data => {
        const filtrados  = data.filter(p => p.categoria === 'videojuego');
        this.juegos = filtrados
          .sort((a, b) => b.id - a.id) // Ordenar de mayor a menor ID
          .map(juego => {
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

    this.http.get<Habilidad[]>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data;
      });
  }

  cambiarSlide(juego: Proyecto, direccion: number) {
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
