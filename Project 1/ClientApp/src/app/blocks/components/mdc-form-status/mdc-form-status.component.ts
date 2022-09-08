import { FormStatusService } from './form-status.service';
import { Component, OnInit, Input } from '@angular/core';
import { FormStatusEnum } from './form-status.enum';
import { Observable } from 'rxjs';

@Component({
    selector: 'mdc-form-status',
    templateUrl: './mdc-form-status.component.html',
    styleUrls: ['./mdc-form-status.component.scss']
})
export class MdcFormStatusComponent implements OnInit {

    @Input('formStatus') public formStatus: string = '';
    status$: Observable<FormStatusEnum>
    public formStatusEnum: typeof FormStatusEnum = FormStatusEnum;

    constructor(
        private _formStatusService: FormStatusService
    ) {
        _formStatusService.reset()
    }

    ngOnInit() {
        this.status$ = this._formStatusService.formStatus$
    }

}
