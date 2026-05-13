import { Routes } from '@angular/router';
import { authGuard } from './services/auth.guard'; 

export const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login'
  },
  {
    path: 'login', 
    loadComponent: () => import('./login/login').then(m => m.Login),
  },
  {
    path: 'registro',
    loadComponent: () => import('./registro/registro').then(m => m.Registro),
  },
  {
    path: '',
    loadComponent: () => import('./layouts/main-layout/main-layout').then(m => m.MainLayout),
    canActivate: [authGuard], 
    children: [
      {
        path: 'descubrir',
        loadComponent: () => import('./descubrir/descubrir').then(m => m.Descubrir),
      },
      {
        path: 'compra/:id',
        loadComponent: () => import('./compra/compra').then(m => m.Compra),
      },
      {
        path: 'carrito',
        loadComponent: () => import('./carrito/carrito').then(m => m.Carrito),
      }
    ]
  },
  {
    path: '**', 
    redirectTo: 'login'
  }
];