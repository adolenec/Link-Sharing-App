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
import { MessageService } from 'primeng/api';

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
  private messageService = inject(MessageService);

  @Input({ required: true }) userLinks: Link[] = [];
  linkForm!: FormGroup;
  platforms = PLATFORMS;

  get links() {
    return this.linkForm.get('links') as FormArray;
  }

  ngOnInit() {
    this.linkForm = this.fb.group({
      links: this.fb.array(this.userLinks.map((d: any) => this.buildLink(d))),
    });
    this.linksService.formLinks.set(this.links.value);
    this.links.valueChanges.subscribe((res) => {
      this.linksService.formLinks.set(res);
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
    this.linksService.updateLinks(this.links.value).subscribe((_) => {
      this.messageService.add({
        detail: 'Your changes have been successfully saved!',
      });
    });
  }

  deleteLink(index: number) {
    this.links.removeAt(index);
  }
}
