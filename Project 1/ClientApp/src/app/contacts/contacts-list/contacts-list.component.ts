import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import * as fromContactsActions from '@appStore/actions';
import { ContactsParams } from '@appStore/model/contacts-params';
import { AppState } from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { contactsSelector, contactsTotalSelector } from '@appStore/selectors';
import { Store } from '@ngrx/store';
import { Contact } from 'app/blocks/graphql/generated/gqlServices';
import { TenantsService } from 'app/blocks/services/tenants.service';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';

import { ContactsDatasource } from './../contacts.datasource';
import { Tenant } from 'app/blocks/common/tenant.model';

@Component({
    selector: 'app-contacts-list',
    templateUrl: './contacts-list.component.html',
    styleUrls: ['./contacts-list.component.scss']
})
export class ContactsListComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;


    @ViewChild(MatSort, { static: true }) sort: MatSort;
    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    public dataSource = new MatTableDataSource<Contact>([]);
    public displayedColumns = ['name', 'telephone', 'type', 'action'];
    public pageSizeOptions = [10, 20, 40];
    public noData: any;
    public search = new FormControl('');
    tenantSpeciality: string;
    public tenant: Tenant;
    public total$: Observable<number>;
    public totalFromServer$: Observable<boolean>;

    constructor(
        public _contactsDatasource: ContactsDatasource,
        private _store: Store<AppState>,
        private _tenantsService: TenantsService,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

        // --------------------------------------------
        this._store.select(contactsSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {
                this.dataSource.data = data.data;
            });

        this.total$ = this._store.select(contactsTotalSelector)
            .pipe(takeUntil(this._unsubscribeAll),
                tap(data => console.log(data)),
                map(data => data.total));

        this.totalFromServer$ = this._store.select(contactsTotalSelector)
            .pipe(takeUntil(this._unsubscribeAll),
                map(data => data.fromServer));

        this.loadTenantData();

        // --------------------------------------------

        // this._contactsDatasource.loadContacts("", 1, this.pageSizeOptions[0], this.sort.active, this.sort.direction);

        // this.noData = this._contactsDatasource.connect().pipe(map(data => data.length === 0));

        // this._contactsDatasource.connect().subscribe(data => this.dataSource.data = data);
    }

    ngAfterViewInit(): void {

        this.loadPage();
        this.watchSearch();

        // @ on sort change update pageindex to 0
        this.sort.sortChange.subscribe((sort) => {
            this.paginator.pageIndex = 0;
        });

        merge(this.paginator.page, this.sort.sortChange)
            .pipe(tap(() => this.loadPage()))
            .subscribe();
    }

    /**
    * On destroy
    */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    private loadPage() {

        const variables: ContactsParams = {
            page: this.paginator.pageIndex + 1,
            filter: this.search.value,
            sortBy: this.sort.active,
            descending: (typeof this.sort.direction === 'string' && this.sort.direction === 'desc') ? true : false,
            // size: this.pageSizeOptions[0]
            size: this.paginator.pageSize
        };

        this._store.dispatch(fromContactsActions.loadContacts({ variables }));
        this._store.dispatch(fromContactsActions.loadContactsTotal({ variables }));
    }

    private watchSearch() {

        this.search
            .valueChanges
            .pipe(
                debounceTime(600),
                distinctUntilChanged(),
                tap((value: any) => {
                    console.log(value);
                    this.loadPage();
                })).subscribe();
    }

    private loadTenantData() {

        this._store.select(fromSelectors.getTenant)
            // this._tenantsService.currentTenant$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                (tenant) => {
                    if (tenant === null) { return; }

                    this.tenant = Object.assign({}, tenant);
                    if (this.tenant.speciality.key === 'general') {
                        this.tenantSpeciality = 'general';
                    }
                    else
                        if (this.tenant.speciality.key === 'cardiology') {
                            this.tenantSpeciality = 'cardiology';
                        }

                },
                (error) => {
                    console.error('[ERROR]:', error);
                });
    }
}
