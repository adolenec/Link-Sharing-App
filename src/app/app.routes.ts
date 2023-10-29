import { Routes } from '@angular/router';
import { authGuard } from './auth/auth.guard';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'links',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./links/links.component').then((m) => m.LinksComponent),
  },
  {
    path: 'profile',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./profile/profile.routes').then((r) => r.PROFILE_ROUTES),
  },
];
