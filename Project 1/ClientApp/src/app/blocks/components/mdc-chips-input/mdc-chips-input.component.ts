import { DeleteSubLocationGQL } from './../../graphql/generated/gqlServices';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Observable, Subject } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'mdc-chips-input',
    templateUrl: './mdc-chips-input.component.html',
    styleUrls: ['./mdc-chips-input.component.scss']
})
export class MdcChipsInputComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;

    @Input() locationId: string;
    @Input() options: string[] = [];
    @Input() placeholder = '';
    @Output() notify: EventEmitter<string[]> = new EventEmitter<string[]>();

    public list: string[] = [];
    public ctrl = new FormControl('');
    public filteredOptions: Observable<string[]>;


    constructor(
        private _deleteSubLocationGQL: DeleteSubLocationGQL,
        private snackBar: MatSnackBar,

    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {
        this.filteredOptions = this.ctrl.valueChanges
            .pipe(
                startWith(''),
                // map(value => typeof value === 'string' ? value : value.name),
                map(term => term ? this._filter(term) : this.options.slice())
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    add() {
        const text = this.ctrl.value;

        // @ push text to list
        this.addValueProcessor(text);
    }

    addValueProcessor(text: string) {

        // @ prevent duplicate
        if (this.list.indexOf(text) === -1) {
            this.list.push(text);

            // @ clear ctrl
            this.ctrl.setValue('');

            this.notify.emit(this.list);
        } else {
            this.snackBar.open(`${text} already added.`, 'CLOSE', {
                panelClass: 'm-24',
                duration: 4000,
            });
        }

    }

    delete(index, item) {

        if (this.locationId) {
            this._deleteSubLocationGQL
                .mutate({ id: this.locationId, subLocation: item })
                .subscribe(({data, errors}) => console.log(data));
        }

        // @ gqlDelete sub location only when online 
        this.list.splice(index, 1);
        this.notify.emit(this.list);
    }

    private _filter(term: string): string[] {
        const filterValue = term.toLowerCase();

        return this.options.filter(option => option.toLowerCase().indexOf(filterValue) >= 0);
    }

}
