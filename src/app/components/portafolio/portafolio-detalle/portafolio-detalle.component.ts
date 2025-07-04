import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../interfaces/Proyecto';
import { SafeUrlPipe } from '../safe-url.pipe';
import { Location } from '@angular/common';;


@Component({
  selector: 'app-portafolio-detalle',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './portafolio-detalle.component.html',
  styleUrls: ['./portafolio-detalle.component.css']
})
export class PortafolioDetalleComponent implements OnInit {
  proyecto: Proyecto | null = null;


  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {}

  ngOnInit(): void {
  const id = Number(this.route.snapshot.paramMap.get('id'));

  this.http.get<Proyecto[]>('assets/data/proyectos.json').subscribe(proyectos => {
    const encontrado = proyectos.find(p => p.id === id);

    if (encontrado) {
      const imagenes = encontrado.imagenes ?? []; // Previene errores por undefined
      const videoUrlOriginal = encontrado.videoUrl ?? '';
      const videoUrl = videoUrlOriginal ? this.convertirYoutubeEmbed(videoUrlOriginal) : undefined;

      this.proyecto = {
        ...encontrado,
        videoUrl,
        currentSlide: 0,
        medios: videoUrl ? [videoUrl, ...imagenes] : [...imagenes]
      };
    }
  });
}


  cambiarSlide(direccion: number) {
    if (!this.proyecto || !this.proyecto.medios) return;
    const total = this.proyecto.medios.length;
    this.proyecto.currentSlide = (this.proyecto.currentSlide! + direccion + total) % total;
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

  volver() {
    this.location.back();
  }

}
