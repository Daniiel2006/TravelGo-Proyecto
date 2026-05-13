import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common'; 
import { AuthService } from '../services/auth';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra.html',
  styleUrl: './compra.css'
})
export class Compra implements OnInit {
  viaje: any = null;
  destinoId: string | null = '';

  constructor(
    private route: ActivatedRoute, 
    private authService: AuthService,
    private carritoService: CarritoService
  ) {}

  ngOnInit() {
    this.destinoId = this.route.snapshot.paramMap.get('id');
    
    if (this.destinoId) {
      const backup = localStorage.getItem(`detalles_${this.destinoId}`);
      if (backup) {
        this.viaje = JSON.parse(backup);
      }

      this.authService.obtenerViajePorId(this.destinoId).subscribe({
        next: (res: any) => {
          this.viaje = res;
          localStorage.setItem(`detalles_${this.destinoId}`, JSON.stringify(res));
        },
        error: (err) => console.error('Error de servidor, usando datos locales')
      });
    }
  }

  agregarAlCarrito() {
    if (this.viaje) {
      this.carritoService.agregarAlCarrito(this.viaje);
      alert('¡Añadido al carrito con éxito!');
    }
  }
}