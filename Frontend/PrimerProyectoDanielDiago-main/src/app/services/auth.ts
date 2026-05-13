import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiRegister = 'http://localhost:8000/api/register/';
  private apiLogin = 'http://localhost:8000/api/login/';

  constructor(private http: HttpClient) { }

  registrarUsuario(usuario: any): Observable<any> {
    return this.http.post(this.apiRegister, usuario);
  }
  login(credenciales: any) {
    return this.http.post('http://127.0.0.1:8000/api/login/', credenciales);
  }
  
  guardarToken(token: string) {
    localStorage.setItem('token_travelgo', token);
  }
  
  estaLogueado(): boolean {
    return !!localStorage.getItem('token_travelgo');
  }

  obtenerViajePorId(id: string) {
  return this.http.get(`http://127.0.0.1:8000/api/viajes/detalle/${id}/`);
}
}