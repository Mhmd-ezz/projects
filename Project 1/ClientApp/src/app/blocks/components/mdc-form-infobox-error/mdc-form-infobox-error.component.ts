import { FormInfoboxErrorService } from './form-infobox-error.service';
import { Component, OnInit, Input } from '@angular/core';
import values from 'lodash/fp/values';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'mdc-form-infobox-error',
    templateUrl: './mdc-form-infobox-error.component.html',
    styleUrls: ['./mdc-form-infobox-error.component.scss']
})
export class MdcFormInfoboxErrorComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;

    public errors: any = [];
    public hidden = true;

    @Input()
    public set dataLink(data) {
        this.setErrors(data)
    }

    constructor(
        private _formInfoboxErrorService: FormInfoboxErrorService
    ) {
        _formInfoboxErrorService.reset();
        this._unsubscribeAll = new Subject();

    }

    ngOnInit(): void {
        this._formInfoboxErrorService.errors$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(data => this.setErrors(data))
    }

    setErrors(data) {
        this.errors = values(data);

        if (typeof this.errors === 'undefined' || this.errors == null || this.errors === [] || this.errors.length === 0) {
            this.hidden = true;
        }
        else if (this.errors.length) {
            this.hidden = false;
        }
    }

    /**
   * On destroy
   */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

}
