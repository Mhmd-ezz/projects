import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subject, merge } from 'rxjs';
import { takeUntil, map, tap } from 'rxjs/operators';

import { fuseAnimations } from '@fuse/animations';
import { FuseSidebarService } from '@fuse/components/sidebar/sidebar.service';
import { FileManagerService } from 'app/file-manager/file-manager.service';
import { PatientsMediaFilesDataSource } from '../patientsMediaFiles.datasource';
import { PatientsMediaFiles, PatientsMediaFilesGQL } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'file-list',
    templateUrl: './file-list.component.html',
    styleUrls: ['./file-list.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class FileManagerFileListComponent implements OnInit, OnDestroy {
    // Private
    private _unsubscribeAll: Subject<any>;



    @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;

    @ViewChild(MatSort, { static: false }) sort: MatSort;

    @ViewChild('input', { static: false }) input: ElementRef;

    // dataSource = new MatTableDataSource()
    dataSource = new MatTableDataSource<PatientsMediaFiles>([]);
    displayedColumns = ['name', 'images', 'pdf', 'detail-button'];
    pageSizeOptions = [10, 20, 40];
    noMoreRecords = false;
    noData: Observable<{}>;
    structuredFiles: any;
    filteredFiles: any;
    selected: any;
    tenant: any;

    /**
     * Constructor
     *
     * @param {FileManagerService} _fileManagerService
     * @param {FuseSidebarService} _fuseSidebarService
     */
    constructor(
        private _fileManagerService: FileManagerService, //
        private _fuseSidebarService: FuseSidebarService,
        private _patientsMediaFilesGQL: PatientsMediaFilesGQL,
        public _patientsMediaFilesDataSource: PatientsMediaFilesDataSource,

    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        this._fileManagerService.onPatientFilter.subscribe((patientId: string) => {
            if (patientId) {
                this.paginator.pageIndex = 0;
                this._patientsMediaFilesDataSource.loadRecords('', 1, this.pageSizeOptions[0], patientId);
            }
        });

        this._fileManagerService.onPatientFilterClear.subscribe((clear) => {
            if (clear) {
                this.paginator.pageIndex = 0;
                this._patientsMediaFilesDataSource.loadRecords('', 1, this.pageSizeOptions[0]);
            }
        });

        this._patientsMediaFilesDataSource.loadRecords('', 1, this.pageSizeOptions[0]);

        this.noData = this._patientsMediaFilesDataSource.connect().pipe(map(data => data.length === 0));

        // @ update table
        this._patientsMediaFilesDataSource.connect().subscribe(data => this.dataSource.data = data);


        // this.sort.sortChange,
        merge(this.paginator.page)
            .pipe(tap(() => this.loadPage()))
            .subscribe();

        this._fileManagerService.onFileSelected
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((selected) => {
                this.selected = selected;
            });

        this._fileManagerService.onFilesChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((_) => this.loadPage());
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
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    loadPage() {
        this._patientsMediaFilesDataSource.loadRecords('',
            this.paginator.pageIndex + 1,
            this.paginator.pageSize);
    }

    /**
     * On select
     *
     * @param selected
     */
    onSelect(selected): void {
        this._fileManagerService.onFileSelected.next(selected);
    }

    /**
     * Toggle the sidebar
     *
     * @param name
     */
    toggleSidebar(name): void {
        this._fuseSidebarService.getSidebar(name).toggleOpen();
    }
}
