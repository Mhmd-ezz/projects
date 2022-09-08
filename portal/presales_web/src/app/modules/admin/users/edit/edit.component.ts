/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-trailing-spaces */
/* eslint-disable eqeqeq */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component, OnInit } from '@angular/core';
import { RolesService } from './../../../../core/services/roles.service';
import { User } from './../../../../core/user/user.types';
import { UsersService } from './../../../../core/services/users.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/core/interface/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from './../../../../core/common/form-utils.service';
import { ProductsService } from './../../../../core/services/products.service';
import { Branch } from 'app/core/interface/branch.interface';
import { Role } from 'app/core/interface/role.interface';
import { BranchesService } from 'app/core/services/branches.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  form: FormGroup;
  formPassword: FormGroup;
  error: any;
  loading: boolean = false;
  isSaveLoading: boolean = false;
  isFormLoading: boolean = false;
  branchesOptions: Branch[] = [];
  roles: Role[] = [];
  user: User;

  constructor(
    private _usersService: UsersService,
    private _branchesService: BranchesService,
    private _rolesService: RolesService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _formUtilsService: FormUtilsService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.loadUser();
    this.loadRoles();
    this.initForm();
    this.initFormPassword();
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  //--------------------------------------
  // Public Methods
  //--------------------------------------
  compareRoles(itemA, itemB) {
    // return itemA['name'] == itemB[0];
    return itemA?.id == itemB?.id || itemA['name'] == itemB[0];
  }

  updatePassword() {
    if (!this.formPassword.valid) {
      this._formUtilsService.validateFormGroup(this.formPassword);
      return;
    }

    if (this.formPassword.get('password').value !== this.formPassword.get('confirm_password').value) {
      this.formPassword.controls['confirm_password'].setErrors({ 'password_mismatch': true });
      return;
    } else {
      this.formPassword.controls['confirm_password'].setErrors({ 'password_mismatch': null });
      this.formPassword.controls['confirm_password'].updateValueAndValidity();
    }


    const user: User = {
      password: this.formPassword.get('password').value,
      id: this.formPassword.get('id').value,
    };
    
    this.isSaveLoading = true;

    this._usersService
      .updateUserPassword(user)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.isSaveLoading = false;
        this._snackBar.open('User password updated.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/users']);
      },
        (error) => {
          console.log(error);
          this.error = error.error;
          this.isSaveLoading = false;
        });
  }

  save() {

    if (!this.form.valid) {
      console.log(this.form);
      this._formUtilsService.validateFormGroup(this.form);
      return;
    }

    // let roleId = null;
    // const roleValue = this.form.get('role_list').value;

    // if (Array.isArray(roleValue)) {
    //   const role = this.roles.find(r => r.name == roleValue[0]);
    //   roleId = role ? role.id : null;
    // } else if (typeof roleValue == 'object' && roleValue.hasOwnProperty('id')) {
    //   roleId = roleValue.id;
    // }

    // if (!roleId) {
    //   this._snackBar.open('An error occured. Please, contact support.', 'Ok', {
    //     duration: 4000,
    //     horizontalPosition: 'end',
    //     verticalPosition: 'top',
    //   });
    //   return;
    // }

    this.isSaveLoading = true;
    
    const user: User = {
      id: this.form.get('id').value,
      first_name: this.form.get('first_name').value,
      last_name: this.form.get('last_name').value,
      name: this.form.get('first_name').value + ' ' + this.form.get('last_name').value,
      contact_number: this.form.get('contact_number').value,
      // email: this.form.get('email').value,
      branch_id: this.form.get('branch').value.id,
      // new_opportunity_notification_enabled: this.form.get('new_opportunity_notification_enabled').value,
      reporting_to: this.form.get('reporting_to').value?.id,
      role: this.form.get('role_list').value.id,
    };

    this._usersService
      .updateUser(user)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.isSaveLoading = false;
        this._snackBar.open('User updated.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/users']);
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
      id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      // password: ['', Validators.required],
      // confirm_password: ['', Validators.required],
      email: ['', Validators.email],
      contact_number: [''],
      new_opportunity_notification_enabled: [''],
      role_list: ['', Validators.required],
      // branch: [''],
      // reporting_to: [''],
    });
  }

  initFormPassword() {
    // Initialize the form
    this.formPassword = this._formBuilder.group({
      password: ['', Validators.required],
      confirm_password: ['', Validators.required],
      id: ['', Validators.required],
    });
  }

  private loadUser() {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((params) => {
        this.getUser(params.id);
      });
  }

  getUser(id: string) {
    this.isFormLoading = true;
    this._usersService
      .getUserById(id)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((user: User) => {
        this.user = user;
        this.form.patchValue(user);
        this.form.get('role_list').setValue(user.role);
        this.formPassword.patchValue(user);
        // this.formPassword.get('id').setValue(user.id);
        // this.form.get('role_list').patchValue('CEO');

        console.log(user);
        this.isFormLoading = false;
      });
  }

}

