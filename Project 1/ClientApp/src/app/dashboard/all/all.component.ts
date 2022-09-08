import { RotaEventObject } from '../../blocks/interface/rota-event-object';
import { Component, OnInit, Input } from '@angular/core';

@Component({
    selector: 'dashboard-all',
    templateUrl: './all.component.html',
    styleUrls: ['./all.component.scss']
})
export class AllComponent implements OnInit {

    @Input('locations') locations: RotaEventObject[] = []

    constructor() { 
    }

    ngOnInit() {
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    trackId(index, item) {
        return item.id ? item.id : undefined;
    }

}
