import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';

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

@Component({
  selector: 'app-home',
  imports: [MatCardModule, RouterLink, MatIconModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  contacto!: Contacto;
  habilidades: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHabilidades();  
    this.cargarContacto();  
  };  

  cargarHabilidades(): void {
    this.http.get<{ habilidades: string[] }>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data.habilidades;
      });
  }

  cargarContacto(): void {
    this.http.get<Contacto>('assets/data/perfil.json').subscribe(data => {
      this.contacto = data;
    });
  } 
}
