import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CarritoService } from '../services/carrito.service';

@Component({
  selector: 'app-carrito',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './carrito.html',
  styleUrl: './carrito.css'
})
export class Carrito implements OnInit {
  viajesEnCarrito: any[] = [];

  constructor(private carritoService: CarritoService) {}

  ngOnInit() {
    this.viajesEnCarrito = this.carritoService.obtenerCarrito();
  }

  calcularTotal() {
    return this.viajesEnCarrito.reduce((total, viaje) => total + parseFloat(viaje.precio), 0).toFixed(2);
  }

  eliminarViaje(index: number) {
    this.viajesEnCarrito.splice(index, 1);
    // Guardamos el cambio en el localStorage a través del servicio
    localStorage.setItem('carrito_travelgo', JSON.stringify(this.viajesEnCarrito));
  }

  vaciarCarrito() {
    if(confirm('¿Seguro que quieres vaciar el carrito?')) {
      this.carritoService.limpiarCarrito();
      this.viajesEnCarrito = [];
    }
  }

  confirmarReserva() {
    alert('¡Gracias por tu compra! Tu aventura comienza ahora.');
    this.vaciarCarrito();
  }
}