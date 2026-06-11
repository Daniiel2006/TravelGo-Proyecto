import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../services/auth'; 
import { CarritoService } from '../services/carrito.service'; 
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-compra',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './compra.html',
  styleUrls: ['./compra.css']
})
export class Compra implements OnInit {
  viaje: any = null;
  destinoId: string = '';

  constructor(
    private route: ActivatedRoute,
    private authService: AuthService,
    private carritoService: CarritoService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.destinoId = this.route.snapshot.paramMap.get('id') || '';
    const idLimpio = this.destinoId.toLowerCase().replace(' ', '');

    
    const baseDatosLocal: { [key: string]: { lat: number, lon: number, precioBase: number } } = {
      'londres': { lat: 51.50, lon: -0.12, precioBase: 550.00 },
      'paris': { lat: 48.85, lon: 2.35, precioBase: 400.00 },
      'roma': { lat: 41.90, lon: 12.49, precioBase: 750.00 },
      'sanfrancisco': { lat: 37.77, lon: -122.41, precioBase: 1150.00 },
      'milan': { lat: 45.46, lon: 9.19, precioBase: 500.00 },
      'rio': { lat: -22.90, lon: -43.17, precioBase: 999.99 },
      'ny': { lat: 40.71, lon: -74.00, precioBase: 1050.00 },
      'mx': { lat: 19.43, lon: -99.13, precioBase: 950.00 }
    };

    // Si el destino existe en nuestra lista, cogemos sus datos. Si no, usamos unos genéricos.
    const datosDestino = baseDatosLocal[idLimpio] || { lat: 40.41, lon: -3.70, precioBase: 300.00 };

    const viajeBase = {
      nombre: this.destinoId.charAt(0).toUpperCase() + this.destinoId.slice(1),
      descripcion: 'Paquete de viaje premium con vuelos y excursiones incluidas.',
      precio: datosDestino.precioBase
    };

    const apiUrl = `https://api.open-meteo.com/v1/forecast?latitude=${datosDestino.lat}&longitude=${datosDestino.lon}&current_weather=true`;

    fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
        const tempActual = data.current_weather.temperature;
        
        const suplementoDemanda = tempActual * 2.5;
        const precioFinal = viajeBase.precio + suplementoDemanda;

        this.viaje = {
          ...viajeBase,
          precio: parseFloat(precioFinal.toFixed(2)),
          nota_api: `Tarifa dinámica calculada vía API (Temp actual en destino: ${tempActual}°C)`
        };

        this.cdr.detectChanges();
      })
      .catch(error => {
        console.error('La API falló', error);
        this.viaje = { ...viajeBase, nota_api: 'Tarifa base estándar del catálogo' };
        this.cdr.detectChanges(); 
      });
  }

  agregarAlCarrito(): void {
    if (this.viaje) {
      this.carritoService.agregarAlCarrito(this.viaje);
      alert('¡Añadido al carrito con éxito!');
    }
  }
}