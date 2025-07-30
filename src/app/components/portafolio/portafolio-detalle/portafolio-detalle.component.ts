import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { Proyecto } from '../../../interfaces/Proyecto';
import { SafeUrlPipe } from '../safe-url.pipe';
import { Location } from '@angular/common';
import { BaseProyectoComponent } from '../../shared/BaseProyectoComponent';

@Component({
  selector: 'app-portafolio-detalle',
  standalone: true,
  imports: [CommonModule, SafeUrlPipe],
  templateUrl: './portafolio-detalle.component.html',
  styleUrls: ['./portafolio-detalle.component.css']
})
export class PortafolioDetalleComponent extends BaseProyectoComponent implements OnInit {
  proyecto: Proyecto | null = null;

  constructor(private route: ActivatedRoute, private http: HttpClient, private location: Location) {
    super();
  }

  ngOnInit(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));

    this.http.get<Proyecto[]>('assets/data/proyectos.json').subscribe(proyectos => {
      const encontrado = proyectos.find(p => p.id === id);

      if (encontrado) {
        const imagenes = encontrado.imagenes ?? [];
        const videoUrlOriginal = encontrado.videoUrl ?? '';
        const videoUrl = videoUrlOriginal
          ? this.convertirVideoEmbed(videoUrlOriginal)
          : undefined;

        this.proyecto = {
          ...encontrado,
          videoUrl,
          currentSlide: 0,
          medios: videoUrl ? [videoUrl, ...imagenes] : [...imagenes]
        };
      }
    });
  }

  volver() {
    this.location.back();
  }
}
