import { Routes } from '@angular/router';

export const APP_ROUTES: Routes = [
  { path: '', redirectTo: 'auth', pathMatch: 'full' },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.routes').then((r) => r.AUTH_ROUTES),
  },
  {
    path: 'links',
    loadComponent: () =>
      import('./links/links.component').then((m) => m.LinksComponent),
  },
  {
    path: 'profile',
    loadChildren: () =>
      import('./profile/profile.routes').then((r) => r.PROFILE_ROUTES),
  },
];
