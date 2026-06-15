import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Remplazamos localhost por las URLs reales de tu backend en producción
  private apiRegister = 'https://travelgo-proyecto.onrender.com/api/register/';
  private apiLogin = 'https://travelgo-proyecto.onrender.com/api/login/';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiRegister, usuario);
  }

  login(credenciales: any) {
    // Ahora usa la variable limpia de arriba
    return this.http.post(this.apiLogin, credenciales);
  }
  
  guardarToken(token: string) {
    localStorage.setItem('token_travelgo', token);
  }
  
  estaLogueado(): boolean {
    return !!localStorage.getItem('token_travelgo');
  }

  obtenerViajePorId(id: string) {
    const url = `https://travelgo-proyecto.onrender.com/api/viajes/detalle/${id}/`;
    console.log('Llamando a la API en:', url); 
    return this.http.get(url);
  }
}