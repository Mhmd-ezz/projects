import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { User } from '../../blocks/interface/user.model';
import { UserService } from 'app/blocks/services/user.service';

@Component({
    selector: 'app-users',
    templateUrl: './users.component.html',
    styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit, OnDestroy {
    // Private
    private _unsubscribeAll: Subject<any>;

    displayedColumns = [
        'index',
        'name',
        'email',
        'isEnabled',
        'roles',
        'action'
    ];
    
    public users: User[] = [];
    public pageSize = 10;
    public resultsLength = 0;
    public isLoadingResults = false;
    public isRateLimitReached = false;
    public filter = new FormControl('');
    public dataSource = new MatTableDataSource<User>(this.users);

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

    constructor(
        private _tenantsService: UserService,
        private _router: Router,
        private _route: ActivatedRoute
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit(): void {
        this.dataSource.paginator = this.paginator;
        // parent of parent is used due to 'lazy' loaded modules.

        this._route.paramMap
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(params => {
                const pageIndex = this.paginator == null ? 1 : this.paginator.pageIndex;

                this._tenantsService
                    .getUsers('', pageIndex, this.pageSize)
                    .pipe(takeUntil(this._unsubscribeAll))
                    .subscribe(result => {                        
                        this.users = result.items;
                        this.resultsLength = result.total;                        
                        this.dataSource = new MatTableDataSource<User>(
                            this.users
                        );
                    });
            });
    }

    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    onEditUser(id): void {
        this._router.navigate(['edit-user', id], { relativeTo: this._route});
    }

    onResetPassword(id): void {
        this._router.navigate(['reset-password', id], { relativeTo: this._route});
    }

    onRemoveUser(id): void {
        this._router.navigate(['remove-user', id], { relativeTo: this._route});
    }

    applyFilter(filterValue: string): void {
        this.dataSource.filter = filterValue.trim().toLowerCase();
    }
}
