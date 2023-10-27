import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinksService } from '../links.service';
import { AngularSvgIconModule } from 'angular-svg-icon';

@Component({
  selector: 'app-link-preview',
  standalone: true,
  imports: [CommonModule, AngularSvgIconModule],
  templateUrl: './link-preview.component.html',
})
export class LinkPreviewComponent {
  private linksService = inject(LinksService);
  previewLinks = this.linksService.previewLinks;
}
