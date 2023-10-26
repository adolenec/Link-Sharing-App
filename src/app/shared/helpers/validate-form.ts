import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
} from '@angular/forms';

//TODO: Check for better solution
export function validateForm(control: AbstractControl): boolean {
  if (control instanceof FormControl) {
    if (control.invalid) {
      control.markAsDirty();
      control.updateValueAndValidity({ onlySelf: true });
      return false;
    }
  } else if (control instanceof FormGroup) {
    if (!control.valid) {
      Object.values(control.controls).forEach((childControl) => {
        if (childControl.invalid) {
          childControl.markAsDirty();
          childControl.updateValueAndValidity({ onlySelf: true });
        }
      });
      return false;
    }
  } else if (control instanceof FormArray) {
    if (!control.valid) {
      control.controls.forEach((arrayControl) => {
        validateForm(arrayControl);
      });
      return false;
    }
  }
  return true;
}

export function validateForm2(fg: FormArray | FormGroup) {
  if (!fg.valid) {
    Object.values(fg.controls).forEach((control) => {
      if (control.invalid) {
        control.markAsDirty();
        control.updateValueAndValidity({ onlySelf: true });
      }
    });
    return false;
  }
  return true;
}

