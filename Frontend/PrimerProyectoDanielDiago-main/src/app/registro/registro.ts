import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './registro.html',
  styleUrl: './registro.css'
})
export class Registro {
  datosUsuario = {
    username: '',
    email: '',
    password: ''
  };

  constructor(private authService: AuthService, private router: Router) {}

  registrar() {
    this.authService.registrarUsuario(this.datosUsuario).subscribe({
      next: (res) => {
        console.log('Respuesta de Django:', res);
        alert('¡Cuenta de TravelGo creada con éxito!');
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error completo:', err);
        
        const detalleError = JSON.stringify(err.error);
        alert('Error al registrar: ' + detalleError);
      }
    });
  }
}