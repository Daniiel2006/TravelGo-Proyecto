import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../services/auth';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterModule],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  datosLogin = { username: '', password: '' };

  constructor(private authService: AuthService, private router: Router) {}

    entrar() {
    this.authService.login(this.datosLogin).subscribe({
      next: (res: any) => {
        this.authService.guardarToken(res.access);
        
        console.log('Login correcto, redirigiendo...'); 
      
        this.router.navigate(['/descubrir']);
      },
      error: (err) => {
        alert('Usuario o contraseña incorrectos');
        console.error(err);
      }
    });
  }
}