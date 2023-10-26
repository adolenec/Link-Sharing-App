import { Component, Input, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { PLATFORMS } from 'src/app/shared/helpers/links';
import { DropdownModule } from 'primeng/dropdown';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InputTextModule } from 'primeng/inputtext';
import { validateForm } from 'src/app/shared/helpers/validate-form';
import { Link } from '../models/link.model';
import { LinksService } from '../links.service';

@Component({
  selector: 'app-link-form',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DropdownModule,
    AngularSvgIconModule,
    InputTextModule,
  ],
  templateUrl: './link-form.component.html',
  styleUrls: ['./link-form.component.scss'],
})
export class LinkFormComponent {
  private fb = inject(FormBuilder);
  private linksService = inject(LinksService);
  linkForm!: FormGroup;
  platforms = PLATFORMS;
  @Input({ required: true }) userLinks: Link[] = [];

  get links() {
    return this.linkForm.get('links') as FormArray;
  }

  ngOnInit() {
    this.linkForm = this.fb.group({
      links: this.fb.array(this.userLinks.map((d: any) => this.buildLink(d))),
    });
  }

  buildLink(data?: any): FormGroup {
    return this.fb.group({
      platformId: [data?.platformId ?? null, Validators.required],
      url: [data?.url ?? '', Validators.required],
    });
  }

  addLink(): void {
    this.links.push(this.buildLink());
  }

  submit() {
    if (!validateForm(this.links)) return;
    this.linksService
      .updateLinks(this.links.value)
      .subscribe((res) => console.log(res));
  }
}
