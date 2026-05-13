import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CarritoService {
  private listaViajes: any[] = [];

  constructor() {
    const carritoGuardado = localStorage.getItem('carrito_travelgo');
    if (carritoGuardado) {
      this.listaViajes = JSON.parse(carritoGuardado);
    }
  }

  agregarAlCarrito(viaje: any) {
    this.listaViajes.push(viaje);
    localStorage.setItem('carrito_travelgo', JSON.stringify(this.listaViajes));
    console.log('Viaje guardado permanentemente:', viaje.nombre);
  }

  obtenerCarrito() {
    return this.listaViajes;
  }

  limpiarCarrito() {
    this.listaViajes = [];
    localStorage.removeItem('carrito_travelgo');
  }
}
