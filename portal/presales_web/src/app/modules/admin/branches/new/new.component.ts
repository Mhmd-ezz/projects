/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
/* eslint-disable no-trailing-spaces */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { countries } from 'app/core/common/data';
import { Branch } from 'app/core/interface/branch.interface';
import { BranchesService } from 'app/core/services/branches.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from './../../../../core/common/form-utils.service';
import { Country } from './../../../../core/interface/country';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  form: FormGroup;
  error: any;
  loading: boolean = false;
  countries: Country[] = countries;

  constructor(
    private _branchesService: BranchesService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _formUtilsService: FormUtilsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Initialize the form
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
      country_code: ['', Validators.required],
      currency_code: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  //--------------------------------------
  // Public Methods
  //--------------------------------------
  save() {

    if (!this.form.valid) {
      this._formUtilsService.validateFormGroup(this.form);
      return;
    }

    this.loading = true;
    const branch: Branch = {
      name: this.form.get('name').value,
      country_code: this.form.get('country_code').value,
      currency_code: this.form.get('currency_code').value,
    };

    this._branchesService
      .createBranch(branch)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.loading = false;
        this._snackBar.open('Branch created.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/branches']);
      },
        (error) => {
          console.log(error);
          this.error = error.error;
          this.loading = false;
        });
  }

}
