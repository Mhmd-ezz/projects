/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class FormUtilsService {

  constructor() { }

  validateFormGroup(form: FormGroup) {
    Object.keys(form.controls).forEach((val) => {
      form.controls[val].markAsTouched();
      form.controls[val].markAsDirty();
    });
  }

}
