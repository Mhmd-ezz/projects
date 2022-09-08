/* eslint-disable max-len */
import { PublishEmailComponent } from './publish-email/publish-email.component';
/* eslint-disable eqeqeq */
import { OpportunitiesService } from './../../../../core/services/opportunities.service';
import { IFile } from './../../../../core/interface/file.interface';
/* eslint-disable space-before-function-paren */
/* eslint-disable curly */
/* eslint-disable prefer-arrow/prefer-arrow-functions */
import { FileViewerDialogService } from './../../../../core/reusable-components/file-viewer-dialog/file-viewer-dialog.service';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Component, ComponentFactoryResolver, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort, MatSortable, Sort } from '@angular/material/sort';
import { RolesEnum } from 'app/core/enum/roles.enum';
import { Branch } from 'app/core/interface/branch.interface';
import { Opportunity } from 'app/core/interface/opportunity.interface';
import { Pagination } from 'app/core/interface/pagination.interface';
import { BranchesService } from 'app/core/services/branches.service';
import { UsersService } from 'app/core/services/users.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { ReturnStatement } from '@angular/compiler';
import { HttpResponse } from '@angular/common/http';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteBottomSheetComponent } from 'app/core/reusable-components/delete-bottom-sheet/delete-bottom-sheet.component';
import { MatDialog } from '@angular/material/dialog';
import { IOpportunityListFilter } from 'app/core/interface/opportunityListFilter.interface';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {


  @ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private _sort: MatSort;

  opportunities$ = new BehaviorSubject<Opportunity[]>([]);
  records$: Observable<any[]> = this.opportunities$.asObservable();

  filter: IOpportunityListFilter = {
    releaseTo: null,
    releaseFrom: null,
    submissionFrom: null,
    submissionTo: null,
    assigne: null,
    userId: [],
    assigneId: [],
    branchId: [],
    status: [],
    category: [],
    rfp_status: ['inprogress'],
  };

  isFilterEnabled: boolean = false;
  isFilterLoading: boolean = false;
  user: User;
  senders: User[] = [];
  branches: Branch[] = [];
  consultants: User[] = [];
  userRole: string;
  isLoading: boolean = false;
  searchInputControl: FormControl = new FormControl('');
  pagination: Pagination = {
    length: null,
    size: null,
    page: null,
    lastPage: null,
    startIndex: null,
    endIndex: null,
  };
  sortConfig: MatSortable = {
    id: 'submission_date',
    start: 'asc',
    disableClear: true
  };
  selectedProduct: Opportunity | null = null;
  private _unsubscribeAll: Subject<any> = new Subject<any>();


  public get RolesEnum_(): typeof RolesEnum {
    return RolesEnum;
  }

  constructor(
    private _opportunitiesService: OpportunitiesService,
    private _userService: UserService,
    private _usersService: UsersService,
    private _branchesService: BranchesService,
    private _fileViewerDialogService: FileViewerDialogService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar,
    public dialog: MatDialog,

  ) { }

  ngOnInit(): void {
    this.preLoadProcessor();
    this.initUser();
    this.searchProcessor();
    this.loadConsultants();
    this.loadSenders();
    this.loadBranches();

  }

  ngAfterViewInit(): void {

    if (this._sort && this._paginator) {

      setTimeout(() => {
        // Set the initial sort
        this._sort.sort(this.sortConfig);
      }, 1);

      // If the user changes the sort order...
      this._sort.sortChange
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe(() => {

          // Reset back to the first page
          this._paginator.pageIndex = 0;

          // Close the details
          this.closeDetails();
        });

      setTimeout(() => {
        // Get products if sort or page changes
        merge(this._sort.sortChange, this._paginator.page).pipe(
          switchMap(() => {
            this.closeDetails();
            this.isLoading = true;
            this.loadOpportunities();
            return of();
          }),
          map(() => {
            this.isLoading = false;
          })
        ).subscribe();
      }, 5);

    }
    this.loadOpportunities()
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    localStorage.setItem('opportunities_list_filter', JSON.stringify(this.filter))
    localStorage.setItem('opportunities_list_pagination', JSON.stringify(this.pagination))
    localStorage.setItem('opportunities_list_isFilterEnabled', JSON.stringify(this.isFilterEnabled))
    localStorage.setItem('opportunities_list_sort', JSON.stringify({ disableClear: false, id: this._sort.active, direction: this._sort.direction }))
  }

  download_report() {

    setTimeout(() => {

      let filter = Object.assign({}, this.filter);
      filter.userId = filter.userId.map(u => u.id);
      let notAssignedFilter = (filter.assigneId.some(e=> e.id == 0) as any ) ? 1 : 0;
      filter.assigneId = filter.assigneId.filter(e=> e.id != 0).map(u => u.id);
      filter.branchId = filter.branchId.map(u => u.id);

      this.isLoading = true;
      this.isFilterLoading = true;

      this._opportunitiesService
        .downloadReport(
          this._paginator.pageIndex + 1,
          this._paginator.pageSize,
          this.searchInputControl.value,
          this._sort.active, this._sort.direction,
          filter.releaseFrom ? (filter.releaseFrom as Date).toISOString() : '',
          filter.releaseTo ? (filter.releaseTo as Date).toISOString() : '',
          filter.submissionFrom ? (filter.submissionFrom as Date).toISOString() : '',
          filter.submissionTo ? (filter.submissionTo as Date).toISOString() : '',
          filter.userId ? filter.userId : [],
          filter.assigneId ? filter.assigneId : [],
          notAssignedFilter,
          filter.branchId ? filter.branchId : [],
          filter.status ? filter.status : [],
          filter.rfp_status ? filter.rfp_status : [],
          filter.category ? filter.category : [],
        )
        .subscribe((data) => {
          this.isLoading = false;

          let encodedUri = 'data:text/csv;charset=utf-8,' + encodeURIComponent(data);
          let link = document.createElement("a");
          link.setAttribute("href", encodedUri);
          let d = new Date();
          const date = d.getDate();
          const month = d.getMonth();
          const year = d.getFullYear();
          link.setAttribute("download", `Report-${date}-${month + 1}-${year}.csv`);
          document.body.appendChild(link); // Required for FF

          link.click();

        }, (_error) => {
          this._snackBar.open('An error occurred while downloading the report.', 'Ok', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.isLoading = false;
          this.isFilterLoading = false;
          console.error(_error);
        });
    }, 2);
  }

  loadOpportunities(): void {

    setTimeout(() => {

      let filter = Object.assign({}, this.filter);
      filter.userId = filter.userId.map(u => u.id);
      let notAssignedFilter = (filter.assigneId.some(e=> e.id == 0) as any ) ? 1 : 0;
      filter.assigneId = filter.assigneId.filter(e=> e.id != 0).map(u => u.id);
      filter.branchId = filter.branchId.map(u => u.id);

      this.isLoading = true;
      this.isFilterLoading = true;

      this._opportunitiesService
        .getOpportunities(
          this._paginator.pageIndex + 1,
          this._paginator.pageSize,
          this.searchInputControl.value,
          this._sort.active, this._sort.direction,
          filter.releaseFrom ? (filter.releaseFrom as Date).toISOString() : '',
          filter.releaseTo ? (filter.releaseTo as Date).toISOString() : '',
          filter.submissionFrom ? (filter.submissionFrom as Date).toISOString() : '',
          filter.submissionTo ? (filter.submissionTo as Date).toISOString() : '',
          filter.userId ? filter.userId : [],
          filter.assigneId ? filter.assigneId : [],
          notAssignedFilter,
          filter.branchId ? filter.branchId : [],
          filter.status ? filter.status : [],
          filter.rfp_status ? filter.rfp_status : [],
          filter.category ? filter.category : [],
          
        )
        .subscribe((data) => {

          this.opportunities$.next(data.data);
          const pagination: Pagination = {
            length: data.meta.total,
            page: data.meta.current_page - 1,
            size: data.meta.per_page,
            lastPage: data.meta.last_page,
            startIndex: data.meta.from,
            endIndex: data.meta.to
          };

          this.pagination = pagination;
          this.isLoading = false;
          this.isFilterLoading = false;

        }, (_error) => {
          console.log("error");
          this._snackBar.open('An error occurred while fetching data.', 'Ok', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.isFilterLoading = false;
          this.isLoading = false;
          this.isFilterLoading = false;
        });

    }, 2);

  }

  trackByFn(index: number, item: any): any {
    return item.id || index;
  }

  // --------------------------------------
  // Public methods
  // --------------------------------------
  compareSelectFn(c1: User, c2: User): boolean {
    return c1 && c2 ? c1.id === c2.id : c1 === c2;
  }

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

        let opps = this.opportunities$.getValue();
        const index = opps.findIndex(o => o.id == opportunityId);
        if (index > -1) {
          opps[index].files = opps[index].files.filter(f => f.id != file.id);
        }
        this.opportunities$.next(opps);
        this.isLoading = false;
      },
        (error) => {
          this._snackBar.open('An error occurred while deleting the file.', 'Ok', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
          this.isLoading = false;
        }
      );
  }

  toggleFilter() {
    if (this.isFilterEnabled) {
      this.clearFilter()
    }

    this.isFilterEnabled = !this.isFilterEnabled;
  }

  clearFilter() {
    this.filter = {
      releaseTo: null,
      releaseFrom: null,
      submissionFrom: null,
      submissionTo: null,
      assigne: null,
      userId: [],
      assigneId: [],
      branchId: [],
      status: [],
      category: [],
      rfp_status: ['inprogress'],
    };

    this.loadOpportunities();
  }

  filterProcessor() {
    setTimeout(() => {
      // console.log(this.filter);
    }, 200);

    this.loadOpportunities();
  }

  toggleDetails(productId: any): void {
    // If the product is already selected...
    if (this.selectedProduct && this.selectedProduct.id === productId) {
      // Close the details
      this.closeDetails();
      return;
    }

    // Get the product by id
    const opportunity = this.opportunities$.getValue().find(o => o.id === productId);
    if (opportunity) {
      this.selectedProduct = opportunity;

    }
  }

  closeDetails(): void {
    this.selectedProduct = null;
  }

  publishEmail(id) {
    const dialogRef = this.dialog.open(PublishEmailComponent, {
      // height: '400px',
      width: '600px',
      data: { id }
    });
  }

  deleteOpportunity(id) {

    let args: any = {
      yes: "Delete opportunity.",
      no: "Don't delete opportunity."
    };
    const Confirmsheet = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: args,
      disableClose: true
    });

    Confirmsheet
      .afterDismissed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {

        if (result && result == true) {
          this.deleteOpportunityProccessor(id);
        }
      });

  }

  // --------------------------------------
  // Private methods
  // --------------------------------------
  preLoadProcessor() {

    let filter: any = localStorage.getItem('opportunities_list_filter');
    let pagination: any = localStorage.getItem('opportunities_list_pagination')
    let isFilterEnabled = localStorage.getItem('opportunities_list_isFilterEnabled')
    this.isFilterEnabled = isFilterEnabled ? JSON.parse(isFilterEnabled) : this.isFilterEnabled;

    // @ sort
    let sort = localStorage.getItem('opportunities_list_sort')
    if(sort){
      this.sortConfig = sort ? JSON.parse(sort) : this.sortConfig;
      this.sortConfig.disableClear = false;
    }
   

    // @ filter
    if (filter) {
      filter = JSON.parse(filter) as any
      pagination = JSON.parse(pagination) as any
      filter['releaseTo'] = filter['releaseTo'] && new Date(filter['releaseTo'])
      filter['releaseFrom'] = filter['releaseFrom'] && new Date(filter['releaseFrom'])
      filter['submissionFrom'] = filter['submissionFrom'] && new Date(filter['submissionFrom'])
      filter['submissionTo'] = filter['submissionTo'] && new Date(filter['submissionTo'])
      this.filter = filter;
    }


    // @ pagination
    if(pagination){
      Object.keys(pagination).forEach(v => pagination[v] = +pagination[v]);
      this.pagination = pagination;
    }
  }

  deleteOpportunityProccessor(id: string) {

    this.isLoading = true;

    this._opportunitiesService
      .deleteOpportunity(id)
      .subscribe((data) => {

        let opps = this.opportunities$.getValue();
        const oppsFiltered = opps.filter(o => +o.id != +id);
        this.opportunities$.next(oppsFiltered);
        this.isLoading = false;

        this._snackBar.open('Opportunity deleted.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      },
        (error) => {
          this.isLoading = false;

          this._snackBar.open('An error occurred. Please, contact support.', 'Ok', {
            duration: 4000,
            horizontalPosition: 'end',
            verticalPosition: 'top',
          });
        })
  }

  initUser() {

    this._userService
      .user$
      .pipe(
        takeUntil(this._unsubscribeAll),
      ).subscribe((data) => {
        this.user = data;
        this.userRole = data.role_list && data.role_list.length ? data.role_list[0] : null;

      })
  }

  searchProcessor() {

    // Subscribe to search input field value changes
    this.searchInputControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        debounceTime(1000),
        switchMap((_data) => {
          this.closeDetails();
          this._paginator.pageIndex = 0;

          this.loadOpportunities();
          return of();
        }),
        map(() => { })
      )
      .subscribe();
  }

  loadConsultants() {
    this._usersService
      .getUsers(1, 50, '', 'name', false, null, [RolesEnum.presales_consultant, RolesEnum.presales_manager, RolesEnum.vp])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.consultants = data.data;
      })
  }

  loadSenders() {
    this._usersService
      .getUsers(1, 50, '', 'name', false, null, [RolesEnum.sales_manager, RolesEnum.sales])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.senders = data.data;
      })
  }

  loadBranches() {
    this._branchesService
      .getBranches(1, 50, '', 'name', false)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.branches = data.data;
      })
  }
}

