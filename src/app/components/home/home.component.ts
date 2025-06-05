import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';

interface Contacto {
  contacto: {
    github: string;
    linkedin: string;
    unity: string;
    itchio: string;
    correo: string;
    cv: string;
  };
}

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
  selector: 'app-home',
  imports: [MatCardModule, RouterLink, MatIconModule, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  contacto!: Contacto;
  habilidades!: Habilidades;

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHabilidades();  
    this.cargarContacto();  
  };  

  cargarHabilidades(): void {
    this.http.get<Habilidades>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data;
      });
  }

  cargarContacto(): void {
    this.http.get<Contacto>('assets/data/perfil.json').subscribe(data => {
      this.contacto = data;
    });
  } 
}
