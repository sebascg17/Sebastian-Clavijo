import { Component, Input, OnInit  } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Proyecto } from '../../../interfaces/Proyecto';
import { Habilidad } from '../../../interfaces/Habilidad';
import { RouterLink } from '@angular/router';
import { BaseProyectoComponent } from '../../shared/BaseProyectoComponent';

@Component({
  standalone: true,
  selector: 'app-dev',
  imports: [SafeUrlPipe, CommonModule, RouterLink],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent extends BaseProyectoComponent implements OnInit {
  webs: Proyecto[] = [];
  habilidades: Habilidad[] = [];
  @Input() maxLength: number = 250; 

  constructor(private http: HttpClient) {
    super();
  }

  ngOnInit(): void {
    this.http.get<Proyecto[]>('assets/data/proyectos.json')
      .subscribe(data => {
        const filtrados  = data.filter(p => p.categoria === 'web');
        this.webs = filtrados
          .sort((a, b) => b.id - a.id) // Ordenar de mayor a menor ID
          .map(web => {
            let videoUrl = web.videoUrl;
            if (videoUrl) {
              videoUrl = this.convertirVideoEmbed(videoUrl);
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

}
