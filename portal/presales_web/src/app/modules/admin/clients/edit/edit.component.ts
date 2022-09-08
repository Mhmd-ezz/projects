import { Country } from './../../../../core/interface/country';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
/* eslint-disable no-trailing-spaces */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { countries } from 'app/core/common/data';
import { Client } from 'app/core/interface/client.interface';
import { ClientsService } from 'app/core/services/clients.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from './../../../../core/common/form-utils.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  form: FormGroup;
  error: any;
  isSaveLoading: boolean = false;
  isFormLoading: boolean = false;
  countries: Country[] = countries;

  constructor(
    private _clientsService: ClientsService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _formUtilsService: FormUtilsService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute
  ) { }

  ngOnInit() {

    this.loadClient();
    this.initForm();
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

    this.isSaveLoading = true;
    const client: Client = {
      id: this.form.get('id').value,
      name: this.form.get('name').value,
      abbreviation: this.form.get('abbreviation').value,
      country_code: this.form.get('country_code').value,
      size: this.form.get('size').value,
      number_employees: this.form.get('number_employees').value,
      industry: this.form.get('industry').value,
    };

    this._clientsService
      .updateClient(client)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.isSaveLoading = false;
        this._snackBar.open('Client updated.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/clients']);
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
      abbreviation: ['', Validators.required],
      country_code: [''],
      size: [''],
      number_employees: [''],
      industry: [''],
    });
  }

  private loadClient() {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((params) => {
        this.getClient(params.id);
      });
  }

  getClient(id: string) {
    this.isFormLoading = true;
    this._clientsService
      .getClientById(id)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((client: Client) => {

        this.form.patchValue(client);

        console.log(client);
        this.isFormLoading = false;
      });
  }
}
