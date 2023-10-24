import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPreviewComponent } from '../links/link-preview/link-preview.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [
    CommonModule,
    LinkPreviewComponent,
    ProfileDetailsComponent,
    RouterOutlet,
  ],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {}
