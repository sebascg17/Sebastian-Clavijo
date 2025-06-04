import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  imports: [MatCardModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  habilidades: string[] = [];

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.cargarHabilidades();
  }

  cargarHabilidades(): void {
    this.http.get<{ habilidades: string[] }>('assets/data/habilidades.json')
      .subscribe(data => {
        this.habilidades = data.habilidades;
      });
  }
}
