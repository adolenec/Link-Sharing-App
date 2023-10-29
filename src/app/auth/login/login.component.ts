import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularSvgIconModule } from 'angular-svg-icon';
import { InputTextModule } from 'primeng/inputtext';
import { Router, RouterLink } from '@angular/router';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { EMPTY, Subject, catchError, debounceTime } from 'rxjs';
import { AuthService } from '../auth.service';
import { Auth } from '../models/auth.model';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styles: [
    `
      .p-inputtext {
        @apply text-gray-primary text-xs w-full bg-transparent h-12;

        &:enabled {
          @apply outline-none shadow-none;
        }
        &:focus,
        &:hover {
          @apply outline-none border-green-primary;
        }
      }
    `,
  ],
})
export class LoginComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  loginForm!: FormGroup;

  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: [''],
    });
  }

  onLogin() {
    this.authService
      .login(this.loginForm.value as Auth)
      .pipe(
        catchError((err) => {
          this.errorMessageSubject.next(err);
          return EMPTY;
        })
      )
      .subscribe((_) => this.router.navigate(['/links']));
  }
}
