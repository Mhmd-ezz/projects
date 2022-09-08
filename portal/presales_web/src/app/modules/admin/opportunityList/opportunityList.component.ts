import { BranchesService } from './../../../core/services/branches.service';
import { user } from './../../../mock-api/common/user/data';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
import { RolesEnum } from './../../../core/enum/roles.enum';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
import { Opportunity } from './../../../core/interface/opportunity.interface';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { ChangeDetectionStrategy, Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormControl, NgForm } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { fuseAnimations } from '@fuse/animations';
import { Pagination } from 'app/core/interface/pagination.interface';
import { OpportunitiesService } from 'app/core/services/opportunities.service';

import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { UsersService } from 'app/core/services/users.service';
import { Branch } from 'app/core/interface/branch.interface';

@Component({
  selector: 'app-opportunityList',
  templateUrl: './opportunityList.component.html',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: fuseAnimations,
  styleUrls: ['./opportunityList.component.scss']
})
export class OpportunityListComponent implements OnInit {

  @ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private _sort: MatSort;

  opportunities$ = new BehaviorSubject<Opportunity[]>([]);
  products$: Observable<any[]> = this.opportunities$.asObservable();

  filter = {
    releaseTo: null,
    releaseFrom: null,
    submissionFrom: null,
    submissionTo: null,
    assigne: null,
    userId: [],
    assigneId: [],
    branchId: [],
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

  ) { }

  ngOnInit(): void {
    this.initUser();
    this.searchProcessor();
    this.loadConsultants();
    this.loadSenders();
  }

  ngAfterViewInit(): void {

    if (this._sort && this._paginator) {

      setTimeout(() => {
        // Set the initial sort
        this._sort.sort({
          id: 'user',
          start: 'asc',
          disableClear: true
        });
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
  }

  loadOpportunities(): void {

    setTimeout(() => {

      let filter = Object.assign({}, this.filter);
      filter.userId = filter.userId.map(u => u.id);
      filter.assigneId = filter.assigneId.map(u => u.id);
      filter.branchId = filter.branchId.map(u => u.id);
      console.log(filter);

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
          filter.branchId ? filter.branchId : [],
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
          console.log("errrorrr");

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

  // --------------------------------------
  // Private methods
  // --------------------------------------

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
      .getUsers(1, 50, '', 'name', false, [RolesEnum.presales_consultant, RolesEnum.presales_manager, RolesEnum.vp])
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((data) => {
        this.consultants = data.data;
      })
  }

  loadSenders() {
    this._usersService
      .getUsers(1, 50, '', 'name', false, [RolesEnum.sales_manager, RolesEnum.sales])
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
