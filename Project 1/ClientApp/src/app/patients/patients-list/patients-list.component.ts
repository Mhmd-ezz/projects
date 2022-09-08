import { onEventAppointmentSelector } from './../../store/selectors/appointments.selector';
import { LocalDbInstancesService } from './../../blocks/common/local-db-instances.service';
import { PatientService } from 'app/patients/patient.service';
import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MediaChange, MediaObserver } from '@angular/flex-layout';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

import { fuseAnimations } from '@fuse/animations';
import { Logger } from '@nsalaun/ng-logger';
import { BreadcrumbService } from 'angular-crumbs';
import { merge, Subject, Observable, Subscription, BehaviorSubject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map, tap, filter, takeUntil } from 'rxjs/operators';
import { LightPatient } from '../../blocks/models/LightPatient';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import * as localforage from 'localforage';
import * as fromPatientsActions from '@appStore/actions';
import { PatientsParams } from '@appStore/model/patients-params';
import { AppState } from '@appStore/reducers';
import { patientLoaded, patientsSelector, patientsTotalSelector } from '@appStore/selectors';
import { Store } from '@ngrx/store';
//import { BehaviorSubject } from 'rxjs';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { TenantsService } from 'app/blocks/services/tenants.service';
import { PatientsSearchParams } from '@appStore/model/patients-search-params';

import { Tenant } from 'app/blocks/common/tenant.model';
import * as fromSelectors from '@appStore/selectors';
import { DataStatusEnum } from 'app/blocks/components/mdc-data-status/data-status.enum';
import { DataUtilsService } from 'app/blocks/utils/data-utils.service';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';
import { PaginatorService } from 'app/blocks/utils/paginator.service';
import { PatientBase } from 'app/blocks/graphql/generated/bases';
import { LocalDbInstances } from 'app/blocks/enum/local-db-instances.enum';
import cloneDeep from 'lodash/cloneDeep';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MessageInputType } from 'app/blocks/graphql/generated/gqlServices';

interface PreservedSettings {
    filter?: string;
    page?: any;
    size?: any;
    sortBy?: any;
    descending?: any;
}

@Component({
    selector: 'app-patients-list',
    templateUrl: './patients-list.component.html',
    styleUrls: ['./patients-list.component.scss'],
    animations: fuseAnimations
})
export class PatientsListComponent implements OnInit, OnDestroy, AfterViewInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    @ViewChild('input', { static: false }) input: ElementRef;

    public displayedColumns: string[]; // = ['name', 'lastSeen', 'referral', 'grantor', 'telephone'];
    public pageSizeOptions = [10, 20, 40];
    public currentScreenWidth = '';
    public flexMediaWatcher: Subscription;
    public noData: any;
    public search = new FormControl('');
    // public noMoreRecords = false;
    public dataSource = new MatTableDataSource<LightPatient>([]);
    public patientsSettingsStore: Observable<LocalForage>;
    public tenant: Tenant;
    public message: MessageInputType = {
        content: "subscribe test",
        fromId: "1234",
        sentAt: Date.now
    };
    // MatPaginator Inputs


    pageSize = 10;
    page = 0;
    length = 0;
    public total$: Observable<number>;
    public totalFromServer$: Observable<boolean>;
    public loading$: Observable<boolean>;
    tenantSpeciality: string;
    private noRecordsSubject = new BehaviorSubject<boolean>(false);
    public noRecords$ = this.noRecordsSubject.asObservable();
    public dataStatusEnum: typeof DataStatusEnum = DataStatusEnum;
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['name', 'telephone'],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5000
    };
    //commentsQuery1: QueryRef<any>;
    commentsQuery: QueryRef<any>;
    comments: Observable<any>;
    params: any;
    testSubscribe: any;
    messageSubscribe: Observable<any>;
    searchValue: string = null;
    constructor(
        private _patientsService: PatientService,
        private _breadcrumbService: BreadcrumbService,
        private _logger: Logger,
        // public _patientsDataSource: LightPatientsDataSource,
        private mediaObserver: MediaObserver,
        private _store: Store<AppState>,
        private _formUtilsService: FormUtilsService,
        private _tenantsService: TenantsService,
        private _dataUtilsService: DataUtilsService,
        // private _MessageAddedGQL: MessageAddedGQL,
        private _apollo: Apollo,
        // private _MessagesGQL: MessagesGQL,
        private _fuzzySearch: FuzzySearchService,
        private _paginator: PaginatorService,
        private _localDbInstancesService: LocalDbInstancesService,
        public snackBar: MatSnackBar,
    ) {

        //this.sort.active='name';
        this.patientsSettingsStore = this._localDbInstancesService.getPatientsSettingsInstance()

        // Set the private defaults
        this._unsubscribeAll = new Subject();
        this.flexMediaWatcher = this.mediaObserver
            .media$
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe((change: MediaChange) => {
                if (change.mqAlias !== this.currentScreenWidth) {
                    this.currentScreenWidth = change.mqAlias;
                    this.setupTable();
                }
            }); // Be sure to unsubscribe from this in onDestroy()!
    }

    setupTable(): void {
        this.displayedColumns = ['name', 'lastSeen', 'referral', 'grantor', 'telephone', 'entryDate', 'createdOn', 'modified', 'isDuplicate'];
        if (this.currentScreenWidth === 'xs') {
            // only display internalId on larger screens
            this.displayedColumns.splice(2, 2); // remove 'internalId'
        }
    }

    /**
     * On init
     */
    ngOnInit(): void {

        this._store.select(patientsSelector)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((data) => {

                if (data.data && data.data.length) {
                    //this.dataSource.data=data.data;
                    let paginate = this._paginator.paginate<PatientBase>(
                        data.data,
                        this.searchValue,
                        this.page,
                        this.pageSize,
                        this.sort?.active,
                        (typeof this.sort?.direction === 'string' && this.sort?.direction === 'desc') ? true : false,
                        this.searchOptionsDefaults)
                    this.dataSource.data = paginate
                   
                }
                // @ no records found
                if (data) {
                    if (data.data.length > 0) { this.noRecordsSubject.next(false); }
                    else {
                        this.dataSource.data = []
                        this.noRecordsSubject.next(true);
                    }
                }
            });

        this.total$ = this._store.select(patientsTotalSelector)
            .pipe(takeUntil(this._unsubscribeAll),
                // tap(data => console.log(data)),                
                map(data => data.total));

                this.loading$ = this._store.select(patientLoaded)
                .pipe(takeUntil(this._unsubscribeAll),
                    map(data => data));


        this.totalFromServer$ = this._store.select(patientsTotalSelector)
            .pipe(takeUntil(this._unsubscribeAll),
                map(data => data.fromServer));

        this.totalFromServer$.subscribe(
            data => {
                if (data) {
                    this._dataUtilsService.dataFromServer();
                    this.snackBar.open('Server Reachable', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                }
                else {
                    this._dataUtilsService.dataLocal();
                    this.snackBar.open('Server Not Reachable', 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 3000,
                    });
                

                }
            }
        );

        // @ On Load Patients failure
        this._store.select(fromSelectors.error)
            .pipe(
                takeUntil(this._unsubscribeAll),
                tap(data => console.log('error', data)),
                filter(data => !!data)
            )
            .subscribe((errors) => {
                this._formUtilsService.popup('An error Occurred' + errors);
            });

        // @ update table
        this.loadTenantData();
    }

    ngAfterViewInit(): void {

        // this.loadPage()
        this.watchSearch();

        // @ on sort change update pageindex to 0
        this.sort.sortChange.subscribe((sort) => {
            this.paginator.pageIndex = 0;

        });

        merge(this.paginator.page, this.sort.sortChange)
            .pipe(tap(() => {
                this.loadPage();
            }))
            .subscribe();

        setTimeout(() => {

            // @ Try to get preserved filter and pagination options
            this.patientsSettingsStore.subscribe(store => {

                store.getItem('default')
                    .then((preservedSettings: PreservedSettings) => {

                        // @ If Object exists
                        if (preservedSettings && Object.keys(preservedSettings).length) {
                            // @ Send Gql query with the preserved options    
                            this.loadPreservedSettings(preservedSettings);

                        } else {

                            // @ No preserved data, then send default 
                            this.loadPage();
                        }
                    }).catch(err => {

                        // @ No preserved data, then send default 
                        this.loadPage();
                    });
            });
        }, 10);
    }


    /**
     * On destroy
     */
    ngOnDestroy(): void {

        this.preservePageParams();
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // --------------------------------------------------------------------
    // Private methods
    // --------------------------------------------------------------------
    private loadTenantData() {

        this._store.select(fromSelectors.getTenant)
            // this._tenantsService.currentTenant$
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

    private loadPage() {
        if (this.searchValue === null && this.sort.active === "")
            this.sort.active = 'name';

        const sort = this.sort.active.split('.');
        let sortBy = sort[0]
        if (sort[1])
            sortBy = sort[1];

        this.page = this.paginator.pageIndex + 1
        this.pageSize = this.paginator.pageSize
        const variables: PatientsParams = {
            page: this.paginator.pageIndex + 1,
            filter: this.search.value,
            sortBy: sortBy,
            descending: (typeof this.sort.direction === 'string' && this.sort.direction === 'desc') ? true : false,
            size: this.paginator.pageSize,
            options: this.searchOptionsDefaults,
        };

        console.log('variables load patient', variables)
        this._store.dispatch(fromPatientsActions.loadPatients({ variables }));
        this._store.dispatch(fromPatientsActions.loadPatientsTotal({ variables }));

    }

    private watchSearch() {

        this.search.valueChanges
            .pipe(
                debounceTime(600),
                distinctUntilChanged(),
                tap((value: any) => {
                    console.log(value);
                    if (value !== '') {
                        this.searchValue = this.search.value;
                        // @ reset paginator
                        this.paginator.pageSize = 10;
                        this.paginator.pageIndex = 0;
                        this.sort.active = "";
                        // @ let matTable manage paginator
                        //this.dataSource.paginator = this.paginator;
                        // @ Matsort will handle sorting
                        //this.dataSource.sort = this.sort;
                        this.dataSource.sort = null;
                        // @ search for patients
                        //this.searchPatient();
                        this.loadPage();
                    } else {
                        // @ dispose dataSource paginator, we are going to handle pagination
                        // this.dataSource.paginator = this.paginator;
                        // @ dispose dataSource paginator, we are going to handle sorting
                        this.sort.active = 'name';
                        this.dataSource.sort = this.sort;
                        // @ reset paginator
                        this.searchValue = null;
                        this.paginator.pageSize = 10;
                        this.paginator.pageIndex = 0;
                        this.loadPage();
                    }
                })
            )
            .subscribe();
    }
    private loadPreservedSettings(data: PreservedSettings) {
        this.paginator.pageSize = 10;
        this.paginator.pageIndex = 0;
        const sort = this.sort.active.split('.');
        let sortBy = sort[0]
        if (sort[1])
            sortBy = sort[1];
        // @ search have a different mechanism, system will get data from local cache
        if (data.filter) {
            this.search.setValue(data.filter);
        } else {

            const variables: PatientsParams = {
                page: data.page,
                filter: data.filter,
                sortBy: sortBy,
                descending: data.descending,
                size: data.size
            };
            this._store.dispatch(fromPatientsActions.loadPatients({ variables }));
            this._store.dispatch(fromPatientsActions.loadPatientsTotal({ variables }));
        }

        // this.sort.sort({ id: data.sortBy, start: data.descending, disableClear: false });
        this.paginator.pageSize = data.size;
        this.paginator.pageIndex = data.page - 1;
    }

    private preservePageParams() {
        if (this.sort.active === null)
            this.sort.active = 'name'

        const data: PreservedSettings = {

            page: this.paginator.pageIndex + 1,
            filter: this.input.nativeElement.value,
            // page: this.paginator.pageIndex > 0 ? this.paginator.pageIndex - 1 : 0,
            sortBy: this.sort.active,
            descending: (typeof this.sort.direction === 'string' && this.sort.direction === 'desc') ? true : false,
            size: this.paginator.pageSize,

        };

        this.patientsSettingsStore.subscribe(store => {
            store.setItem('default', data)
                .catch(error => {
                    console.error(['[ERROR]: Unable to update type field of appointment settings store.', error]);
                });
        });
    }

}


