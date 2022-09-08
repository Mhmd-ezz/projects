import { BranchesService } from 'app/core/services/branches.service';
import { RolesService } from './../../../../core/services/roles.service';
/* eslint-disable @typescript-eslint/naming-convention */
import { User } from './../../../../core/user/user.types';
import { UsersService } from './../../../../core/services/users.service';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
/* eslint-disable no-trailing-spaces */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'app/core/interface/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from './../../../../core/common/form-utils.service';
import { ProductsService } from './../../../../core/services/products.service';
import { Branch } from 'app/core/interface/branch.interface';
import { Role } from 'app/core/interface/role.interface';

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
  branchesOptions: Branch[] = [];
  roles: Role[] = [];
  usersBranch: User[] = [];

  constructor(
    private _usersService: UsersService,
    private _branchesService: BranchesService,
    private _rolesService: RolesService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _formUtilsService: FormUtilsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {

    this.loadRoles();
    this.initForm();
    console.log(this.form);
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
      console.log(this.form);
      this._formUtilsService.validateFormGroup(this.form);
      return;
    }
    if (this.form.get('password').value !== this.form.get('confirm_password').value) {
      this.form.controls['confirm_password'].setErrors({ 'password_mismatch': true });
      return;
    } else {
      this.form.controls['confirm_password'].setErrors({ 'password_mismatch': null });
      this.form.controls['confirm_password'].updateValueAndValidity();
    }

    this.loading = true;
    const user: User = {
      first_name: this.form.get('first_name').value,
      last_name: this.form.get('last_name').value,
      name: this.form.get('first_name').value + ' ' + this.form.get('last_name').value,
      contact_number: this.form.get('contact_number').value,
      email: this.form.get('email').value,
      branch_id: this.form.get('branch').value.id,
      // new_opportunity_notification_enabled: this.form.get('new_opportunity_notification_enabled').value,
      reporting_to: this.form.get('reporting_to').value.id,
      role: this.form.get('role_list').value.id,
      password: this.form.get('password').value,
    };
    
    this._usersService
      .createUser(user)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.loading = false;
        this._snackBar.open('User created.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/users']);
      },
        (error) => {
          console.log(error);
          this.error = error.error;
          this.loading = false;
        });
  }

  //--------------------------------------
  // Private Methods
  //--------------------------------------
  loadRoles() {
    this._rolesService.getRoles()
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((data) => {
        this.roles = data.data;
      });
  }

  initForm() {
    // Initialize the form
    this.form = this._formBuilder.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      email: ['', Validators.email],
      contact_number: [''],
      new_opportunity_notification_enabled: [''],
      role_list: ['', Validators.required],
      // branch: [''],
      // reporting_to: [''],
    });
  }

}
