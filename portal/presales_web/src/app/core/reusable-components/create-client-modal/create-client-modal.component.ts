/* eslint-disable no-trailing-spaces */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/member-ordering */
import { ClientsService } from 'app/core/services/clients.service';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/naming-convention */
import { Client } from './../../interface/client.interface';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'app-create-client-modal',
  templateUrl: './create-client-modal.component.html',
  styleUrls: ['./create-client-modal.component.scss']
})
export class CreateClientModalComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  client: Client = {
    // id: null,
    abbreviation: null,
    country_code: null,
    email: null,
    industry: null,
    name: null,
    number_employees: null,
    size: null,
  };
  error: any;
  loading: boolean = false;
  constructor(
    private _dialogRef: MatDialogRef<CreateClientModalComponent>,
    private _clientService: ClientsService,
  ) {

  }

  ngOnInit(): void {
  }

  // ------------------------------------------------
  // Public Methods
  // ------------------------------------------------
  save() {
    
    this.loading = true;
    const client = Object.assign({}, this.client);
    this._clientService.createClient(client)
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(() => this.loading = false)
      )
      .subscribe((data) => {
        this._dialogRef.close(data);
        this.loading = false;
      },
        (error) => {
          console.log(error);
          this.error = error.error;
          this.loading = false;
        }
      );
  }

  cancel() {
    this._dialogRef.close();
  }

  ngOnDestroy() {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }
}
