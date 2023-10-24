import { Component, computed, inject } from '@angular/core';
import { NgIf } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { WindowSizeService } from '../services/window-size.service';
import { WindowSizeEnum } from '../enums/window-size.enum';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [NgIf, RouterLink, RouterLinkActive, AngularSvgIconModule],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private windowService = inject(WindowSizeService);

  windowSizeEnum = WindowSizeEnum;
  windowSize = this.windowService.windowSize;
  isMobile = computed(() => this.windowSize() === this.windowSizeEnum.Small);
}
