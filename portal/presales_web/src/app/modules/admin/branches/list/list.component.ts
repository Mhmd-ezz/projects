/* eslint-disable eqeqeq */
import { ClientsService } from './../../../../core/services/clients.service';
/* eslint-disable prefer-const */
/* eslint-disable @typescript-eslint/naming-convention */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable quotes */
/* eslint-disable @typescript-eslint/quotes */
/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/semi */
/* eslint-disable @typescript-eslint/member-ordering */
/* eslint-disable no-trailing-spaces */
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { RolesEnum } from 'app/core/enum/roles.enum';
import { Branch } from 'app/core/interface/branch.interface';
import { Pagination } from 'app/core/interface/pagination.interface';
import { BranchesService } from 'app/core/services/branches.service';
import { UsersService } from 'app/core/services/users.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { Client } from 'app/core/interface/client.interface';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { DeleteBottomSheetComponent } from 'app/core/reusable-components/delete-bottom-sheet/delete-bottom-sheet.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private _sort: MatSort;

  branches$ = new BehaviorSubject<Branch[]>([]);
  records$: Observable<any[]> = this.branches$.asObservable();

  user: User;
  userRole: string;
  isFilterLoading: boolean = false;
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
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  public get RolesEnum_(): typeof RolesEnum {
    return RolesEnum;
  }

  constructor(
    private _clientsService: ClientsService,
    private _branchesService: BranchesService,
    private _userService: UserService,
    private _usersService: UsersService,
    private _bottomSheet: MatBottomSheet,
    private _snackBar: MatSnackBar

  ) { }

  ngOnInit(): void {
    this.initUser();
    this.searchProcessor();
  }

  ngAfterViewInit(): void {

    if (this._sort && this._paginator) {

      setTimeout(() => {
        // Set the initial sort
        this._sort.sort({
          id: 'name',
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

        });

      setTimeout(() => {
        merge(this._sort.sortChange, this._paginator.page).pipe(
          switchMap(() => {
            this.isLoading = true;
            this.loadBranches();
            return of();
          }),
          map(() => {
            this.isLoading = false;
          })
        ).subscribe();
      }, 5);

    }
    this.loadBranches()
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  loadBranches(): void {

    setTimeout(() => {

      this.isLoading = true;
      this.isFilterLoading = true;

      this._branchesService
        .getBranches(
          this._paginator.pageIndex + 1,
          this._paginator.pageSize,
          this.searchInputControl.value,
          this._sort.active, this._sort.direction,
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data) => {
          console.log("data", data)

          this.branches$.next(data.data);
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


  // --------------------------------------
  // Private methods
  // --------------------------------------
  delete(id) {
    let args: any = {
      yes: "Delete branch.",
      no: "Don't delete branch."
    };
    const Confirmsheet = this._bottomSheet.open(DeleteBottomSheetComponent, {
      data: args,
      disableClose: true
    });

    Confirmsheet
      .afterDismissed()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe((result) => {
        console.log(result, id)

        if (result && result == true) {
          this.deleteBranchProccessor(id);
          this.loadBranches();
        }
      });

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
          this._paginator.pageIndex = 0;

          this.loadBranches();
          return of();
        }),
        map(() => { })
      )
      .subscribe();
  }

  deleteBranchProccessor(id: string) {
    this._branchesService
      .deleteBranch(id)
      .subscribe((data) => {
        this._snackBar.open('Branch deleted.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
      })
  }

}
