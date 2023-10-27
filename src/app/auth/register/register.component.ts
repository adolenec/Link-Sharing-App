import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InputTextModule } from 'primeng/inputtext';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    RouterLink,
    InputTextModule,
  ],
  templateUrl: './register.component.html',
})
export class RegisterComponent {}
