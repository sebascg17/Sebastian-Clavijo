import { Component, Input, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink, RouterModule } from '@angular/router';
import { Proyecto } from '../../../interfaces/Proyecto';
import { Habilidad } from '../../../interfaces/Habilidad';

@Component({
  selector: 'app-portafolio',
  standalone: true,
  imports: [SafeUrlPipe, CommonModule, MatCardModule, RouterLink, RouterModule],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  @Input() maxLength: number = 250;
  destacados: Proyecto[] = [];
  habilidades: Habilidad[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDestacados();
  }

  cargarDestacados() {
    this.http.get<Proyecto[]>('assets/data/proyectos.json').subscribe(proyectos => {
      this.destacados = proyectos
        .filter(p => p.destacado)
        .sort((a, b) => b.id - a.id) // Ordenar de mayor a menor ID
        .map(p => {
          const videoUrl = p.videoUrl ? this.convertirYoutubeEmbed(p.videoUrl) : undefined;
          return {
            ...p,
            videoUrl,
            expandido: false,
            currentSlide: 0,
            medios: videoUrl ? [videoUrl, ...p.imagenes] : [...p.imagenes]
          };
        });
    });

    this.http.get<Habilidad[]>('assets/data/habilidades.json').subscribe(data => {
      this.habilidades = data;
    });
  }

  cambiarSlide(proyecto: Proyecto, direccion: number) {
    const total = proyecto.medios?.length ?? 0;
    if (total === 0) return;
    proyecto.currentSlide = (proyecto.currentSlide! + direccion + total) % total;
  }

  esImagen(url: string): boolean {
    return /\.(jpg|jpeg|png|gif|webp)$/i.test(url);
  }

  esVideo(url?: string): boolean {
    if (!url) return false;
    return url.includes('youtube.com') || url.includes('youtu.be');
  }

  convertirYoutubeEmbed(url: string): string {
    const regex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/;
    const match = url.match(regex);
    return match && match[1] ? `https://www.youtube.com/embed/${match[1]}` : url;
  }
}
