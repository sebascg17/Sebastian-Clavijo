import { Component, OnInit, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { NavigationEnd, RouterModule } from '@angular/router';
import { Router } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSidenav } from '@angular/material/sidenav';
import { filter } from 'rxjs';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    MatSidenavModule,
    RouterModule,
    CommonModule
  ],
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})

export class MenuComponent implements OnInit {
  @ViewChild('sidenav') sidenav!: MatSidenav;
  currentRoute: string = '';
  mostrarSubmenu = false;

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter(event => event instanceof NavigationEnd))
      .subscribe((event: any) => {
        this.currentRoute = event.urlAfterRedirects;
      });
  }

  isActive(route: string): boolean {
    return this.currentRoute === route;
  }

  navigateAndClose(route: string) {
    this.router.navigate([route]);
    this.sidenav.close();
  }

  getPortfolioClass(): string {
    return this.currentRoute.startsWith('/portafolio') ? 'glow-text active-link' : 'glow-text';
  }

  getSubLinkClass(path: string): string {
    return this.currentRoute === path ? 'active-link' : '';
  }
  
  cerrarSiClickFuera(event: MouseEvent): void {
    const target = event.target as HTMLElement;
    const clickedInside = target.closest('.custom-sidenav');

    if (!clickedInside) {
      this.sidenav.close();
    }
  }
}
