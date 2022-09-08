/* eslint-disable eqeqeq */
import { DeleteBottomSheetComponent } from './../../../../core/reusable-components/delete-bottom-sheet/delete-bottom-sheet.component';
import { ProductsService } from './../../../../core/services/products.service';
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
import { Opportunity } from 'app/core/interface/opportunity.interface';
import { Pagination } from 'app/core/interface/pagination.interface';
import { Product } from 'app/core/interface/product.interface';
import { BranchesService } from 'app/core/services/branches.service';
import { OpportunitiesService } from 'app/core/services/opportunities.service';
import { UsersService } from 'app/core/services/users.service';
import { UserService } from 'app/core/user/user.service';
import { User } from 'app/core/user/user.types';
import { BehaviorSubject, merge, of, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, map, switchMap, takeUntil } from 'rxjs/operators';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent {

  @ViewChild(MatPaginator, { static: false }) private _paginator: MatPaginator;
  @ViewChild(MatSort, { static: false }) private _sort: MatSort;

  users$ = new BehaviorSubject<User[]>([]);
  records$: Observable<any[]> = this.users$.asObservable();

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
    private _productsService: ProductsService,
    private _userService: UserService,
    private _usersService: UsersService,
    private _branchesService: BranchesService,
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
        // Get products if sort or page changes
        merge(this._sort.sortChange, this._paginator.page).pipe(
          switchMap(() => {
            this.isLoading = true;
            this.loadData();
            return of();
          }),
          map(() => {
            this.isLoading = false;
          })
        ).subscribe();
      }, 5);

    }
    this.loadData()
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  loadData(): void {

    setTimeout(() => {

      this.isLoading = true;
      this.isFilterLoading = true;

      this._usersService
        .getUsers(
          this._paginator.pageIndex + 1,
          this._paginator.pageSize,
          this.searchInputControl.value,
          this._sort.active, this._sort.direction,
        )
        .pipe(takeUntil(this._unsubscribeAll))
        .subscribe((data) => {
          console.log("data", data)

          this.users$.next(data.data);
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

  deleteUser(id) {
    let args: any = {
      yes: "Delete user.",
      no: "Don't delete user."
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
          this.deleteUserProccessor(id);
          this.loadData();
        }
      });

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
  deleteUserProccessor(id: string) {
    this._usersService
      .deleteUser(id)
      .subscribe((data) => {
        this._snackBar.open('User deleted.', 'Ok', {
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
          this._paginator.pageIndex = 0;

          this.loadData();
          return of();
        }),
        map(() => { })
      )
      .subscribe();
  }

}
