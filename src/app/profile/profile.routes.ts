import { Routes } from '@angular/router';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { ProfilePreviewComponent } from './profile-preview/profile-preview.component';
import { ProfileComponent } from './profile.component';

export const PROFILE_ROUTES: Routes = [
  {
    path: '',
    component: ProfileComponent,
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all',
      },
      { path: 'details', component: ProfileDetailsComponent },
    ],
  },
  { path: 'preview', component: ProfilePreviewComponent },
];
