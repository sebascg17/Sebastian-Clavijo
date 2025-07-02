// src/app/app.routes.ts
import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { ContactoComponent } from './components/contacto/contacto.component';
import { PortafolioComponent } from './components/portafolio/portafolio/portafolio.component';
import { VideojuegosComponent } from './components/portafolio/videojuegos/videojuegos.component';
import { DevComponent } from './components/portafolio/dev/dev.component';
import { PortafolioDetalleComponent } from './components/portafolio-detalle/portafolio-detalle.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'portafolio', component: PortafolioComponent },
  { path: 'portafolio/videojuegos', component: VideojuegosComponent },
  { path: 'portafolio/desarrollo-web', component: DevComponent },
  {
    path: 'portafolio/detalle/:id',
    loadComponent: () => import('./components/portafolio-detalle/portafolio-detalle.component')
      .then(m => m.PortafolioDetalleComponent)
  },

  { path: '**', redirectTo: ''} // Redirige a la página de inicio si la ruta no coincide con ninguna definida
];
