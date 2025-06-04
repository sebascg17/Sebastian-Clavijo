import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';

interface Perfil {
  nombre: string;
  titulo: string;
  biografia: string;
  foto: string;
  habilidades: string[];
  experiencia: {
    puesto: string;
    empresa: string;
    fechaInicio: string;
    fechaFin?: string; // opcional
    descripcion: string;
  }[];
  educacion: {
    titulo: string;
    institucion: string;
    fechaInicio: string;
    fechaFin?: string; // opcional
    descripcion: string;
  }[];
  contacto: {
    github: string;
    linkedin: string;
    correo: string;
    cv: string;
  };
}

@Component({
  selector: 'app-about',
  imports: [CommonModule],
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.css']
})
export class AboutComponent implements OnInit {
  perfil!: Perfil;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.http.get<Perfil>('assets/data/perfil.json').subscribe(data => {
      this.perfil = data;
    });
  }
}
