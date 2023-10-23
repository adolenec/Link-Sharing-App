import { Routes } from '@angular/router';
import { DetailsComponent } from './details/details.component';
import { PreviewComponent } from './preview/preview.component';

export const PROFILE_ROUTES: Routes = [
  { path: '', redirectTo: 'details', pathMatch: 'full' },
  { path: 'details', component: DetailsComponent },
  { path: 'preview', component: PreviewComponent },
];
