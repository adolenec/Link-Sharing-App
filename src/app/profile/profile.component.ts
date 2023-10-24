import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { LinkPreviewComponent } from '../links/link-preview/link-preview.component';
import { ProfileDetailsComponent } from './profile-details/profile-details.component';
import { RouterOutlet } from '@angular/router';
import { WindowSizeService } from '../core/services/window-size.service';
import { WindowSizeEnum } from '../core/enums/window-size.enum';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [NgIf, LinkPreviewComponent, ProfileDetailsComponent, RouterOutlet],
  templateUrl: './profile.component.html',
})
export class ProfileComponent {
  private windowService = inject(WindowSizeService);

  windowSizeEnum = WindowSizeEnum;
  windowSize = this.windowService.windowSize;
  isTablet = computed(() => this.windowSize() <= this.windowSizeEnum.Large);
}
