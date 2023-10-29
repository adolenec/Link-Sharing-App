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
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { validateForm } from 'src/app/shared/helpers/validate-form';
import { EMPTY, Subject, catchError, debounceTime } from 'rxjs';
import { Auth } from '../models/auth.model';
import { AuthService } from '../auth.service';

export const confirmPasswordValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (passwordControl?.pristine || confirmPasswordControl?.pristine)
    return null;

  if (passwordControl?.value === confirmPasswordControl?.value) return null;

  return { passwordsNotEqual: true };
};

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    AngularSvgIconModule,
    RouterLink,
    InputTextModule,
    ReactiveFormsModule,
  ],
  templateUrl: './register.component.html',
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
export class RegisterComponent implements OnInit {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  private errorMessageSubject = new Subject<string>();
  errorMessage$ = this.errorMessageSubject.asObservable();

  registerForm!: FormGroup;
  passwordMsg!: string;

  private validationMessages: any = {
    required: 'Password is required',
    minlength: 'Password must be at least 8 characters long',
  };

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      passwordGroup: this.fb.group(
        {
          password: ['', [Validators.required, Validators.minLength(8)]],
          confirmPassword: ['', [Validators.required, Validators.minLength(8)]],
        },
        { validators: confirmPasswordValidator }
      ),
    });

    const passwordControl = this.registerForm.get('passwordGroup.password');

    passwordControl?.valueChanges
      .pipe(debounceTime(600))
      .subscribe((_) => this.setMessage(passwordControl));
  }

  private setMessage(c: AbstractControl): void {
    this.passwordMsg = '';
    if ((c.touched || c.dirty) && c.errors) {
      this.passwordMsg = Object.keys(c.errors)
        .map((key) => this.validationMessages[key])
        .join(' ');
    }
  }

  onSignup() {
    if (!validateForm(this.registerForm)) return;
    console.log('valid');
    const userData: Auth = {
      email: this.registerForm.value.email,
      password: this.registerForm.value.passwordGroup.password,
    };

    console.log(userData);

    this.authService
      .signup(userData)
      .pipe(
        catchError((err) => {
          this.errorMessageSubject.next(err);
          return EMPTY;
        })
      )
      .subscribe((res) => this.router.navigate(['/links']));
  }
}
