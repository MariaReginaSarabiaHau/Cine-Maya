import { Component, OnInit } from '@angular/core';
import { RouterOutlet, Router, NavigationEnd } from '@angular/router';
import { MenuComponent } from './menu/menu.component';
import { AuthService } from './services/auth.service';
import { filter } from 'rxjs/operators';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuComponent, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css' 
})
export class AppComponent implements OnInit {
  title = 'Proyecto_Final';
  isLoginPage: boolean = false;
  
  constructor(
    public authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificar la ruta inicial
    this.checkIfLoginPage(this.router.url);
    
    // Suscribirse a eventos de cambio de ruta
    this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe((event: NavigationEnd) => {
      this.checkIfLoginPage(event.url);
    });
  }

  private checkIfLoginPage(url: string): void {
    // Ajusta '/login' a la ruta real de tu página de login
    this.isLoginPage = url === '/login';
  }
}