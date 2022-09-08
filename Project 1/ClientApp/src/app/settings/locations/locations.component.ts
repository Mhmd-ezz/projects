import { Location, DeleteLocationGQL } from './../../blocks/graphql/generated/gqlServices';
import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { LocationsGQL } from '../../blocks/graphql/generated/gqlServices';
import { MatTableDataSource } from '@angular/material/table';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';

import { DeleteLocationSheetComponent } from './delete-location.component';

@Component({
    selector: 'locations',
    templateUrl: './locations.component.html',
    styleUrls: ['./locations.component.scss']
})
export class LocationsComponent implements OnInit, OnDestroy {

    // Private
    private _unsubscribeAll: Subject<any>;

    @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator

    public dataSource = new MatTableDataSource<Location>([]);
    public displayedColumns = ['index', 'name', 'contact', 'type', 'address', 'action'];
    public pageSizeOptions = [10, 20, 40];
    
    constructor(
        private _locationsGQL: LocationsGQL,
        private _deleteLocationGQL: DeleteLocationGQL,
        private bottomSheet: MatBottomSheet,
        private snackBar: MatSnackBar,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }



    ngOnInit(): void {

        this.dataSource.paginator = this.paginator;

        this._locationsGQL
            .watch()
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(({ data, loading }) => {

                if (data && data.locations) {
                    const locations: Location[] = data.locations;
                    this.dataSource.data = locations;
                }
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

    deleteLocation(id): void {
        this.openBottomSheet(id);
    }

    openBottomSheet(id): void {

        const sheet = this.bottomSheet.open(DeleteLocationSheetComponent);

        sheet.afterDismissed().subscribe((result) => {

            const deleteConfirmed = typeof result !== 'undefined' ? result.deleteConfirmed : false;

            if (deleteConfirmed) {

                this._deleteLocationGQL
                    .mutate({ id })
                    .subscribe({
                        next: ({ data, errors }) => {

                            if (errors) {
                                const message = errors[0].extensions.data.message;
                                this.snackBar.open(message, 'CLOSE', {
                                    panelClass: 'm-24',
                                    duration: 15000,
                                });

                            } else if (data && data.deleteLocation) {

                                // @ remove location from table
                                this.dataSource.data = this.dataSource.data.filter(obj => obj.id !== id);

                                this.snackBar.open('Location deleted', 'CLOSE', {
                                    panelClass: 'm-24',
                                    duration: 3000,
                                });
                            }
                        },
                        error: (error) => {
                            throw new error(error);
                        }
                    });
            }
        });
    }

}
