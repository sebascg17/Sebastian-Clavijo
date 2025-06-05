import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

interface Tecnologia {
  nombre: string;
  icono: string;
}
interface Habilidades {
  frontend: Tecnologia[];
  backend: Tecnologia[];
  videojuegos: Tecnologia[];
  otros: Tecnologia[];
}

@Component({
  selector: 'app-habilidades',
  imports: [CommonModule],
  templateUrl: './habilidades.component.html',
  styleUrl: './habilidades.component.css'
})
export class HabilidadesComponent implements OnInit {
  habilidades!: Habilidades;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHabilidades();  
  };  

  cargarHabilidades(): void {
    this.http.get<Habilidades>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data;
      });
  }
}
