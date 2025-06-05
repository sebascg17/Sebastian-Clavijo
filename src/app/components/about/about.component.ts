import { Component, OnInit  } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { HabilidadesComponent } from "../habilidades/habilidades.component";

interface Perfil {
  nombre: string;
  titulo: string;
  biografia: string;
  foto: string;
  habilidades: {
    icono: string;
    nombre: string;
  }[];
  experiencia: {
    puesto: string;
    empresa: string;
    fechaInicio: string;
    fechaFin?: string; // opcional
    descripcion: string[]; // Cambiado de string a array de strings
    tecnologias: {
      nombre: string;
      icono: string;
    }[];
  }[];
  educacion: {
    titulo: string;
    institucion: string;
    ciudad: string;
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
  imports: [CommonModule, HabilidadesComponent],
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
