import { Component, computed, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPreviewComponent } from './link-preview/link-preview.component';
import { CustomizeLinksComponent } from './customize-links/customize-links.component';
import { WindowSizeService } from '../core/services/window-size.service';
import { WindowSizeEnum } from '../core/enums/window-size.enum';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, LinkPreviewComponent, CustomizeLinksComponent],
  templateUrl: './links.component.html',
})
export class LinksComponent {
  private windowService = inject(WindowSizeService);

  windowSizeEnum = WindowSizeEnum;
  windowSize = this.windowService.windowSize;
  isTablet = computed(() => this.windowSize() <= this.windowSizeEnum.Large);
}
