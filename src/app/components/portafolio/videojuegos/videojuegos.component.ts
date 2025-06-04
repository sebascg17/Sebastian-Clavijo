import { Component, OnInit  } from '@angular/core';
import { SafeUrlPipe } from '../safe-url.pipe'; // ajusta la ruta según tu estructura
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Juego {
  titulo: string;
  descripcion: string;
  videoUrl: string;
  imagenes: string[];
  tecnologias: {
    nombre: string;
    icono: string;
  }[];
  enlaceCodigo: string;
  enlaceDescarga: string;
}

@Component({
  standalone: true,
  selector: 'app-videojuegos',
  imports: [SafeUrlPipe, CommonModule],
  templateUrl: './videojuegos.component.html',
  styleUrl: './videojuegos.component.css'
})

export class VideojuegosComponent implements OnInit {
  juegos: Juego[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Juego[]>('assets/data/videojuegos.json')
      .subscribe(data => {
        this.juegos = data;
      });
  }
}
