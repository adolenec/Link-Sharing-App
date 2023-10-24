import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkPreviewComponent } from './link-preview/link-preview.component';
import { CustomizeLinksComponent } from './customize-links/customize-links.component';

@Component({
  selector: 'app-links',
  standalone: true,
  imports: [CommonModule, LinkPreviewComponent, CustomizeLinksComponent],
  templateUrl: './links.component.html',
})
export class LinksComponent {}
