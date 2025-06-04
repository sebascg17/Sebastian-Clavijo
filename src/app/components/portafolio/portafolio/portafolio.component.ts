import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SafeUrlPipe } from '../safe-url.pipe'; // ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common';

interface Proyecto {
  tipo: 'videojuego' | 'web';
  titulo: string;
  videoUrl: string;
  descripcion: string;
  tecnologias: {
    nombre: string;
    icono: string;
  }[];
  imagenes: string[];
  enlaceCodigo: string;
  enlaceDemo?: string;
}

@Component({
  selector: 'app-portafolio',
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './portafolio.component.html',
  styleUrls: ['./portafolio.component.css']
})
export class PortafolioComponent implements OnInit {
  destacados: Proyecto[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarDestacados();
  }

  cargarDestacados() {
    this.http.get<any[]>('assets/data/videojuegos.json').subscribe(juegos => {
      const destacadosJuegos = juegos
        .filter(j => j.destacado)
        .map(j => ({ ...j, tipo: 'videojuego' }));

      this.http.get<any[]>('assets/data/web.json').subscribe(webs => {
        const destacadosWeb = webs
          .filter(w => w.destacado)
          .map(w => ({ ...w, tipo: 'web' }));

        this.destacados = [...destacadosJuegos, ...destacadosWeb];
      });
    });
  }
}
