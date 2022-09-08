import { BranchesService } from './../../../../core/services/branches.service';
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/naming-convention */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router, ActivatedRoute } from '@angular/router';
import { FormUtilsService } from 'app/core/common/form-utils.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Branch } from 'app/core/interface/branch.interface';
import { countries } from 'app/core/common/data';
import { Country } from 'app/core/interface/country';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  form: FormGroup;
  error: any;
  isSaveLoading: boolean = false;
  isFormLoading: boolean = false;
  countries: Country[] = countries;

  constructor(
    private _branchesService: BranchesService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _formUtilsService: FormUtilsService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadBranch();
    this.initForm();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  //--------------------------------------
  // Private Methods
  //--------------------------------------

  save() {

    if (!this.form.valid) {
      this._formUtilsService.validateFormGroup(this.form);
      return;
    }

    this.isSaveLoading = true;
    const branch: Branch = {
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      country_code: this.form.get('country_code').value,
      currency_code: this.form.get('currency_code').value,
    };

    this._branchesService
      .updateBranch(branch)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.isSaveLoading = false;
        this._snackBar.open('Branch updated.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/branches']);
      },
        (error) => {
          console.log(error);
          this.error = error.error;
          this.isSaveLoading = false;
        });
  }

  //--------------------------------------
  // Private Methods
  //--------------------------------------
  private initForm() {
    // Initialize the form
    this.form = this._formBuilder.group({
      id: ['', Validators.required],
      name: ['', Validators.required],
      country_code: ['', Validators.required],
      currency_code: ['', Validators.required],
    });
  }

  private loadBranch() {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((params) => {
        this.getBranch(params.id);
      });
  }

  getBranch(id: string) {
    this.isFormLoading = true;
    this._branchesService
      .getBranchById(id)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((branch: Branch) => {

        this.form.patchValue(branch);

        console.log(branch);
        this.isFormLoading = false;
      });
  }

}
