import { Component, Input, OnInit } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../../interfaces/Proyecto';
import { Habilidad } from '../../../interfaces/Habilidad';
import { RouterLink } from '@angular/router';
import { BaseProyectoComponent } from '../../shared/BaseProyectoComponent';

@Component({
  standalone: true,
  selector: 'app-videojuegos',
  imports: [SafeUrlPipe, CommonModule, RouterLink],
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.css'
})
export class VideojuegosComponent extends BaseProyectoComponent implements OnInit {
  juegos: Proyecto[] = [];
  habilidades: Habilidad[] = [];
  @Input() maxLength: number = 250;

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.http.get<Proyecto[]>('assets/data/proyectos.json')
      .subscribe(data => {
        const filtrados  = data.filter(p => p.categoria === 'videojuego');
        this.juegos = filtrados
          .sort((a, b) => b.id - a.id) // Ordenar de mayor a menor ID
          .map(juego => {
            let videoUrl = juego.videoUrl;
            if (videoUrl) {
              videoUrl = this.convertirVideoEmbed(videoUrl);
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
}
