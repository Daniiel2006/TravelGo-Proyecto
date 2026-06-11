import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { CarritoService } from '../services/carrito.service'; 

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './facturacion.html',
  styleUrls: ['./facturacion.css']
})
export class FacturacionComponent implements OnInit {
  totalPrecio: number = 0;
  cargando: boolean = false;
  pagoExitoso: boolean = false;

  tarjetaNombre: string = '';
  tarjetaNumero: string = '';
  tarjetaExpiracion: string = '';
  tarjetaCvv: string = '';

  constructor(
    private carritoService: CarritoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const viajes = this.carritoService.obtenerCarrito ? this.carritoService.obtenerCarrito() : [];

    if (viajes && viajes.length > 0) {
      const suma = viajes.reduce((acumulador: number, viaje: any) => {
        return acumulador + parseFloat(viaje.precio);
      }, 0);
      
      this.totalPrecio = parseFloat(suma.toFixed(2));
    } else {
      this.totalPrecio = 0;
    }
  }

  procesarPago(form: any): void {
    if (form.invalid) {
      alert('Por favor, rellena todos los campos de la tarjeta correctamente.');
      return;
    }

    this.cargando = true;

    setTimeout(() => {
      this.cargando = false;
      this.pagoExitoso = true;
    }, 3000); 
  }

  volverAlInicio(): void {
    this.router.navigate(['/']);
  }
}