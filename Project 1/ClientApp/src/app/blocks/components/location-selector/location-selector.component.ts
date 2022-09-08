import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { LocationsGQL, Location } from 'app/blocks/graphql/generated/gqlServices';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { MatSelectChange } from '@angular/material/select';
import { ControlContainer, NgForm } from '@angular/forms';

// @ IMPORTANT : Component should be added in <form></form>
@Component({
    selector: 'app-location-selector',
    templateUrl: './location-selector.component.html',
    styleUrls: ['./location-selector.component.scss'],
    viewProviders: [{ provide: ControlContainer, useExisting: NgForm }],

})
export class LocationSelectorComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    private locationsSubject = new BehaviorSubject<Location[]>([]);
    locations$: Observable<any> = this.locationsSubject.asObservable();

    @Input() location: Location = {};
    @Input() required = false;
    @Output() onChange: EventEmitter<Location> = new EventEmitter<Location>();


    constructor(
        private _locationsGQL: LocationsGQL,
    ) {
        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

        this._locationsGQL
            .watch()
            .valueChanges
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(
                ({ data, loading }) => {
                    if (data && data.locations) {
                        this.locationsSubject.next(data.locations);
                    }
                },
                (error) => {
                    console.error('[error]: ', error);
                }
            );
    }

    /**
  * On destroy
  */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // --------------------------------------------------------------------
    //  Public methods
    // --------------------------------------------------------------------   

    selectionChange(event: MatSelectChange) {
        this.onChange.emit(event.value as Location);
    }

    locationCompareWith(objOne, objTwo) {
        if (typeof objOne !== 'undefined' && typeof objTwo !== 'undefined' && objOne != null && objTwo != null) {
            return objOne.id === objTwo.id;
        }
    }

}
