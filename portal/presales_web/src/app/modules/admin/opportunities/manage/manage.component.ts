import { Opportunity } from 'app/core/interface/opportunity.interface';
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FormUtilsService } from 'app/core/common/form-utils.service';
import { Subject } from 'rxjs';
import { OpportunitiesService } from 'app/core/services/opportunities.service';
import { takeUntil } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-manage',
  templateUrl: './manage.component.html',
  styleUrls: ['./manage.component.scss']
})
export class ManageComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();
  private opportunityId;
  form: FormGroup;
  error: any;
  saveLoading: boolean = false;
  formLoading: boolean = false;

  constructor(
    private _formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private _formUtilsService: FormUtilsService,
    private router: Router,
    private _opportunitiesService: OpportunitiesService,
    private _route: ActivatedRoute

  ) { }

  ngOnInit() {

    this.loadOpportunity();

    // Initialize the form
    this.form = this._formBuilder.group({
      name: [''],
      id: [''],
      awarded_amount: [''],
      proposed_value: [''],
      rfp_status: [''],
      status: [''],
      solution: [''],
      lost_reason: [''],
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

    this.saveLoading = true;
    const opp: Opportunity = {
      id: this.opportunityId,
      awarded_amount: this.form.get('awarded_amount').value,
      proposed_value: this.form.get('proposed_value').value,
      rfp_status: this.form.get('rfp_status').value,
      solution: this.form.get('solution').value,
      lost_reason: this.form.get('lost_reason').value,
      status: this.form.get('status').value,
    };

    this._opportunitiesService
      .manageOpportunity(opp)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.saveLoading = false;
        this._snackBar.open('Opportunity updated.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/opportunities']);
      },
        (error) => {
          this.error = error.error;
          this.saveLoading = false;
        });
  }


  //--------------------------------------
  // Private Methods
  //--------------------------------------

  private loadOpportunity() {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((params) => {
        this.formLoading = true;
        this.formLoading = true;
        this.opportunityId = params.id;
        this.getClient(params.id);
      });
  }

  getClient(id: string) {
    this.saveLoading = true;
    this._opportunitiesService
      .getOpportunityById(id)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((opp: Opportunity) => {
        this.form.patchValue(opp);
        this.saveLoading = false;
        this.formLoading = false;
      },
        (error) => {
          this.saveLoading = false;
          this.formLoading = false;
        });
  }

}
