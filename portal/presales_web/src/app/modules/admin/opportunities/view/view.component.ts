/* eslint-disable eqeqeq */
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { HttpResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RolesEnum } from 'app/core/enum/roles.enum';
import { IFile } from 'app/core/interface/file.interface';
import { Opportunity } from 'app/core/interface/opportunity.interface';
import { FileViewerDialogService } from 'app/core/reusable-components/file-viewer-dialog/file-viewer-dialog.service';
import { OpportunitiesService } from 'app/core/services/opportunities.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'app-view',
  templateUrl: './view.component.html',
  styleUrls: ['./view.component.scss']
})
export class ViewComponent implements OnInit {
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  opportunity: Opportunity = {};
  loading: boolean = false;
  formLoading = false;
  isLoading = false;
  error: any;
  userRole: string;
  user: User;
  public get RolesEnum_(): typeof RolesEnum {
    return RolesEnum;
  }


  constructor(
    private _userService: UserService,
    private _opportunitiesService: OpportunitiesService,
    private _route: ActivatedRoute,
    private _fileViewerDialogService: FileViewerDialogService,
  ) { }

  ngOnInit() {
    this.initUser();
    this.loadOpportunity();

  }

  // --------------------------------------
  // Public methods
  // --------------------------------------
  viewFile(file) {
    this._fileViewerDialogService.openDialog(file);
  }


  downloadFile(file: IFile) {
    this._opportunitiesService
      .downloadFile(file.id)
      .subscribe(
        (response: HttpResponse<Blob>) => {
          let filename: string = file.original_name;
          let binaryData = [];
          binaryData.push(response.body);
          let downloadLink = document.createElement('a');
          downloadLink.href = window.URL.createObjectURL(new Blob(binaryData, { type: 'blob' }));
          downloadLink.setAttribute('download', filename);
          document.body.appendChild(downloadLink);
          downloadLink.click();
        });
  }

  deleteFile(file: IFile, opportunityId: any) {
    this.isLoading = true;

    this._opportunitiesService
      .deleteFile(file.id)
      .subscribe((response) => {

        this.opportunity.files = this.opportunity.files.filter(f => f.id != file.id);
        this.isLoading = false;
      },
        (error) => {
          this.isLoading = false;
        }
      );
  }

  // --------------------------------------
  //  Private Methods
  //---------------------------------------
  private initUser() {

    this._userService
      .user$
      .pipe(
        takeUntil(this._unsubscribeAll),
      ).subscribe((data) => {
        this.user = data;
        this.userRole = data.role_list && data.role_list.length ? data.role_list[0] : null;

      });
  }
  private loadOpportunity() {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((params) => {
        this.formLoading = true;
        this.getOpportunity(params.id);
      });
  }

  getOpportunity(id: string) {
    this._opportunitiesService
      .getOpportunityById(id)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((opp: Opportunity) => {
        this.opportunity = opp;
        console.log(this.opportunity);
        this.formLoading = false;
      },
        (error) => {
          this.formLoading = false;
          this.error = error;
        });
  }

}
