import { Component, OnInit  } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe'; // ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Habilidades {
  nombre: string;
  icono: string;
}

interface Web {
  titulo: string;
  videoUrl: string;
  descripcion: string;
  tecnologias: {
    nombre: string;
    icono: string;
  }[];
  imagenes: string[];
  enlaceCodigo: string;
  enlaceDemo?: string; // opcional
}

@Component({
  standalone: true,
  selector: 'app-dev',
  imports: [/*SafeUrlPipe,*/ CommonModule],
  templateUrl: './dev.component.html',
  styleUrl: './dev.component.css'
})
export class DevComponent  implements OnInit {
  webs: Web[] = [];
  habilidades: Habilidades[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Web[]>('assets/data/web.json').subscribe(
      (data) => {
        this.webs = data;
      },
      (error) => {
        console.error('Error cargando proyectos:', error);
      }
    );
    this.http.get<Habilidades[]>('assets/data/habilidades.json').subscribe(
      (data) => {
        this.habilidades = data;
      },
      (error) => {
        console.error('Error cargando habilidades:', error);
      }
    );
  }
}
