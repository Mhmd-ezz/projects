// import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from "@angular/core";
// import { MediaChange, MediaObserver } from "@angular/flex-layout";
// import { FormControl } from "@angular/forms";
// import { MatPaginator, MatSort, MatTableDataSource } from "@angular/material";
// import { fuseAnimations } from "@fuse/animations";
// import { Logger } from "@nsalaun/ng-logger";
// import { BreadcrumbService } from "angular-crumbs";
// import { merge, Subject, Subscription } from "rxjs";
// import { debounceTime, distinctUntilChanged, map, tap } from "rxjs/operators";
// import { Patient } from "../../blocks/graphql/generated/gqlServices";
// import { PatientService } from "../patient.service";
// import { PatientsDataSource } from "./../patients.datasource";
// import { PatientsStoreService } from "../../blocks/graphql/store/patientsStore.service";

// @Component({
//     selector: "app-patients-list",
//     templateUrl: "./patients-list.component.html",
//     styleUrls: ["./patients-list.component.scss"],
//     animations: fuseAnimations
// })
// export class PatientsListComponent implements OnInit, OnDestroy, AfterViewInit {
//     // Private
//     private _unsubscribeAll: Subject<any>;

//     public frameworkComponents;

//     rowData: any;
//     noData: any;

//     displayedColumns: string[]; // = ['name', 'lastSeen', 'referral', 'grantor', 'telephone'];
//     pageSizeOptions = [10, 20, 40];
//     currentScreenWidth = "";
//     flexMediaWatcher: Subscription;

//     @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

//     @ViewChild(MatSort, { static: false }) sort: MatSort;

//     // @ViewChild("input", { static: false }) input: ElementRef
//     public search = new FormControl("");
//     public paginatorSize: number;
//     public noMoreRecords: boolean = false;
//     public dataSource = new MatTableDataSource<Patient>([]);

//     /**
//      * Constructor
//      *
//      * @param {PatientService} _patientService
//      * @param {BreadcrumbService} _breadcrumbService
//      * @param {Logger} _logger
//      */
//     constructor(
//         private _patientsService: PatientService,
//         private _breadcrumbService: BreadcrumbService,
//         private _logger: Logger,
//         public _patientsDataSource: PatientsDataSource,
//         private mediaObserver: MediaObserver,
//         private patientStore: PatientsStoreService
//     ) {
//         // Set the private defaults
//         this._unsubscribeAll = new Subject();

//         // TODO : DELETE REPLACED BY SERVER SIDE PAGINATION
//         this._patientsService.getPatients();

//         this.flexMediaWatcher = mediaObserver.media$.subscribe((change: MediaChange) => {
//             if (change.mqAlias !== this.currentScreenWidth) {
//                 this.currentScreenWidth = change.mqAlias;
//                 this.setupTable();
//             }
//         }); // Be sure to unsubscribe from this in onDestroy()!
//     }

//     setupTable(): void {
//         this.displayedColumns = ["name", "lastSeen", "referral", "grantor", "telephone"];
//         if (this.currentScreenWidth === "xs") {
//             // only display internalId on larger screens
//             this.displayedColumns.splice(2, 2); // remove 'internalId'
//         }
//     }

//     /**
//      * On init
//      */
//     ngOnInit(): void {
//         this._patientsDataSource.loadPatients("", 1, this.pageSizeOptions[0]);

//         this.noData = this._patientsDataSource.connect().pipe(map(data => data.length === 0));

//         // @ update table
//         this._patientsDataSource.connect().subscribe(data => (this.dataSource.data = data));
//     }

//     ngAfterViewInit(): void {
//         // @ on search keyup
//         this.search.valueChanges
//             .pipe(
//                 debounceTime(600),
//                 distinctUntilChanged(),
//                 tap((value: any) => {
//                     // @ reset paginator
//                     this.paginator.pageIndex = 0;
//                     // @ let matTable manage paginator
//                     this.loadPage();
//                 })
//             )
//             .subscribe();

//         // @ pagintation will send request to backend when search is empty
//         //this.sort.sortChange,
//         merge(this.paginator.page)
//             .pipe(tap(() => this.loadPage()))
//             .subscribe();
//     }

//     loadPage() {
//         this._patientsDataSource.loadPatients("", this.paginator.pageIndex + 1, this.paginator.pageSize);
//     }

//     /**
//      * On destroy
//      */
//     ngOnDestroy(): void {
//         // Unsubscribe from all subscriptions
//         this._unsubscribeAll.next();
//         this._unsubscribeAll.complete();
//     }
// }
