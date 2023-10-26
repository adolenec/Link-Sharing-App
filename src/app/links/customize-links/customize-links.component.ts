import { Component, ViewChild, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LinkFormComponent } from '../link-form/link-form.component';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-customize-links',
  standalone: true,
  imports: [CommonModule, LinkFormComponent],
  templateUrl: './customize-links.component.html',
})
export class CustomizeLinksComponent {
  @ViewChild('linkForm') linkForm!: LinkFormComponent;
  private linksService = inject(LinksService);
  links$ = this.linksService.links$;

  onAddLinkClick() {
    this.linkForm.addLink();
  }
}
