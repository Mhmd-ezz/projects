import { RolesEnum } from './../../../core/enum/roles.enum';
import { StatusEnum } from './../../../core/enum/status.enum';
import { RfpStatusEnum } from './../../../core/enum/rfpStatus.enum';
import { environment } from './../../../../environments/environment';
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable no-var */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */

/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable no-trailing-spaces */
/* eslint-disable @typescript-eslint/explicit-function-return-type */

declare var require: any;

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { Uppy } from '@uppy/core';
// import * as Tus from '@uppy/tus';
import { TusOptions } from '@uppy/tus';
import { XHRUploadOptions } from '@uppy/xhr-upload';
import { DashboardOptions } from '@uppy/dashboard';
import { Client } from 'app/core/interface/client.interface';
import { OpportunitiesService } from 'app/core/services/opportunities.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { takeUntil } from 'rxjs/internal/operators/takeUntil';
import { Subject } from 'rxjs/internal/Subject';
import { Opportunity } from './../../../core/interface/opportunity.interface';
const Tus = require('@uppy/tus');
// const Dashboard  = require('@uppy/dashboard');
import Dashboard from '@uppy/dashboard';
import XHRUpload from '@uppy/xhr-upload';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-opportunity',
  templateUrl: './new-opportunity.component.html',
  styleUrls: ['./new-opportunity.component.css',]
})
export class NewOpportunityComponent implements OnInit {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  backendUrl = environment.backendUrl;

  userSelectorRoles = [RolesEnum.sales, RolesEnum.country_manager]
  horizontalStepperForm: FormGroup;
  submissionMinDate;
  currentUser: User;
  isOpportunityCreated: boolean;
  loading: boolean = false;
  userRole: string;
  opportunityId: any;
  error: any;
  uppy: Uppy = new Uppy({
    debug: false, autoProceed: false, allowMultipleUploadBatches: false,
  });

  constructor(
    private _formBuilder: FormBuilder,
    private _userService: UserService,
    private _opportunitiesService: OpportunitiesService,
    private router: Router,
  ) {
  }

  ngOnInit() {

    const xHRUploadOptions: XHRUploadOptions = {
      endpoint: this.backendUrl + '/api/opportunities/upload/',
    };

    const dashboardOptions: DashboardOptions = {
      target: '.uppy',
      inline: true,
      width: '100%',
      // plugins: ['dashboard'],
      hideUploadButton: true,
      note: 'Add related opportunity files.',
    };

    this.uppy
      .use(Dashboard, dashboardOptions)
      .use(XHRUpload, xHRUploadOptions);

    this.uppy.on('complete', () => {
      this.router.navigate(['/opportunity-list']);
    })

    this.uppy.on('error', (error) => {
      console.log('error', error);
    })

    this.uppy.on('upload-error', (error) => {
      console.log('error', error);
    })

    // Horizontal stepper form
    this.horizontalStepperForm = this._formBuilder.group({
      sender: this._formBuilder.group({
        // user: [''],
      }),
      step1: this._formBuilder.group({
        // client: ['', []],
        contact_name: [''],
        contact_title: [''],
        contact_email: [''],
        contact_phone: [''],
      }),
      step2: this._formBuilder.group({
        release_date: ['', [Validators.required]],
        submission_date: ['', [Validators.required]],
        description: [''],
        observation: [''],
        duration: [''],
        required_technology: [''],
        winning_chance: [''],
        external_resources: [''],
        learned: [''],
        competitors: [''],
        budget: [''],
        currency_code: [''],
        demo_date: [''],
        category: ['proposal',Validators.required],
      }),
      step3: this._formBuilder.group({
        subsidiary_date: ['', [Validators.required]],
        submission_type: ['email'],
      }),
    });

  }

  ngAfterViewInit(): void {

    this.initUser();
  }

  // --------------------------------------
  //  Public Methods
  //---------------------------------------
  displayFn(client: Client): string {

    return client && client.name ? client.name : '';
  }

  clientSelected(event: Client | null) {
    (this.horizontalStepperForm.controls['step1'] as FormGroup).controls['client'].setValue(event);
  }

  onUserSelected(user: User | null) {
    (this.horizontalStepperForm.controls['sender'] as FormGroup).controls['user'].setValue(user);
    this.selectSenderCallback(user);
  }

  onReleaseDateChange(event: MatDatepickerInputEvent<any, any>) {
    this.submissionMinDate = event.value;
  }

  save() {

    const form = this.horizontalStepperForm.getRawValue();
    const opportunity: Opportunity = {
      // Sender
      user_id: this.currentUser.id as number,

      // Client
      client_id: form.step1.client.id,
      contact_name: form.step1.contact_name,
      contact_email: form.step1.contact_email,
      contact_title: form.step1.contact_title,
      contact_number: form.step1.contact_number,

      // Opportunity
      budget: form.step2.budget,
      competitors: form.step2.competitors,
      currency_code: form.step2.currency_code,
      description: form.step2.description,
      duration: form.step2.duration,
      external_resources: form.step2.external_resources,
      learned: form.step2.learned,
      observation: form.step2.observation,
      release_date: form.step2.release_date,
      required_technology: form.step2.required_technology,
      submission_date: form.step2.submission_date,
      winning_chance: form.step2.winning_chance,

      // Submission
      submission_type: form.step3.submission_type,
      subsidiary_date: form.step3.subsidiary_date,

      // Opportunity site
      country_manager_id: this.currentUser.country_manager_id,
      executive_manager_id: this.currentUser.executive_manager_id,
      sales_manager_id: this.currentUser.sales_manager_id,
      branch_id: this.currentUser.branch.id,

      rfp_status: RfpStatusEnum.inprogress,
      status: StatusEnum.pending
    };

    this.loading = true;

    this._opportunitiesService
      .createOpportunity(opportunity)
      .subscribe((opp) => {

        this.opportunityId = opp.id;
        this.loading = false;
        this.isOpportunityCreated = true;

        console.log(this.opportunityId);

        if (this.uppy && this.uppy.getFiles().length) {
          this.setFilesMetadata();
          this.uppy.upload();
        } else {
          this.router.navigate(['/opportunities']);
        }
      },
        (error) => {
          console.log(error);
          this.error = error.error;
          this.loading = false;
        });

  }

  // --------------------------------------
  //  Private Methods
  //---------------------------------------

  initUser() {

    this._userService
      .user$
      .pipe(
        takeUntil(this._unsubscribeAll),
      )
      .subscribe((user) => {
        setTimeout(() => {
          this.userRole = user.role_list && user.role_list.length ? user.role_list[0] : null;
          this.selectSenderCallback(user);
        }, 1);
      });
  }

  selectSenderCallback(user: User) {
    this.currentUser = Object.assign({}, user);

    if (this.currentUser.role_list[0] === 'sales_manager') {
      this.currentUser.sales_manager_id = this.currentUser.id as number;
    }

    if (this.currentUser.role_list[0] === 'country_manager') {
      this.currentUser.country_manager_id = this.currentUser.id as number;
    }

    if (user?.branch?.currency_code) {
      (this.horizontalStepperForm.controls['step2'] as FormGroup).controls['currency_code'].setValue(user.branch.currency_code);
    }
  }

  // @ Add opportunity id to files metadata
  setFilesMetadata() {
    if (this.uppy && this.uppy.getFiles().length) {
      const files = this.uppy.getFiles();
      files.forEach((file) => {
        this.uppy.setFileMeta(file.id, {
          opportunity_id: this.opportunityId,
        })
      });
    }
  }

}
