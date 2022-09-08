import { BehaviorSubject ,  Subject } from 'rxjs';
import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';

@Component({
    selector: 'app-table-events',
    templateUrl: './table-events.component.html',
    styleUrls: ['./table-events.component.scss']
})
export class TableEventsComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
    @ViewChild(MatSort, { static: false }) sort: MatSort;

    public dataSource = new MatTableDataSource<any>([]);
    public displayedColumns = ['dateTime', 'name', 'arrived', 'status', 'activity', 'reason', 'new', 'referral'];
    public pageSizeOptions = [10, 20, 40];

    eventsCollection$ = new BehaviorSubject<any[]>([]);

    private events_: any[] = [];

    @Input('events') set events(value) {
        this.events_ = value;
        this.eventsCollection$.next(value);
    }

    get events() {
        return this.events_;
    }


    constructor() {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

    }

    ngAfterContentInit(): void {
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;

        this.eventsCollection$.subscribe(data => {
            this.dataSource.data = data;
        });

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



}
