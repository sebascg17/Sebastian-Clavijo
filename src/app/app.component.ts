import { Component, OnInit } from '@angular/core';
import { MenuComponent } from "./components/menu/menu.component";
import { MatButtonModule } from '@angular/material/button';
import { RouterOutlet } from '@angular/router';
import { LoaderComponent } from "./shared/loader/loader/loader.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [MenuComponent, MatButtonModule, RouterOutlet, LoaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent{
  
}