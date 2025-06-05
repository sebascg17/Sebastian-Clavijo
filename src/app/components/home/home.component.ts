import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { ContactoComponent } from "../contacto/contacto.component";
import { PortafolioComponent } from "../portafolio/portafolio/portafolio.component";
import { AboutComponent } from "../about/about.component";



@Component({
  selector: 'app-home',
  imports: [MatCardModule, MatIconModule, CommonModule, ContactoComponent, PortafolioComponent, AboutComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
}
