/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { OpportunitiesService } from './../../../../../core/services/opportunities.service';
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-publish-email',
  templateUrl: './publish-email.component.html',
  styleUrls: ['./publish-email.component.css']
})
export class PublishEmailComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  send_to = [{ email: '' }];
  error = null;
  loading = false;

  constructor(
    private _dialogRef: MatDialogRef<PublishEmailComponent>,
    private _opportunitiesService: OpportunitiesService,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private _snackBar: MatSnackBar,

  ) { }

  ngOnInit() {
  }

  // ------------------------------------------------
  // Public Methods
  // ------------------------------------------------
  public setFocus(input: string) {
    const targetElem = document.getElementById(input);
    setTimeout(() => {
      if (document.body.contains(targetElem)) {
        targetElem.focus();
      }
    }, 100);
  }

  addInputField() {
    this.send_to.unshift({ email: '' });
    setTimeout(() => {
      this.setFocus('email-0');
    }, 20);
  }

  deleteAddress(index) {
    this.send_to.splice(index, 1);
  }

  send() {
    this.loading = true;
    const addresses = this.send_to.map(e => e.email);
    this._opportunitiesService.publish(this.data.id, addresses)
      .pipe(
        takeUntil(this._unsubscribeAll),
        tap(() => this.loading = false)
      )
      .subscribe((data) => {
        this._dialogRef.close(data);
        this.loading = false;
        this._snackBar.open('Email sent successfully.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
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
