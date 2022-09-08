import { Component, OnInit, Input } from '@angular/core';
import { Recurrence } from 'app/blocks/graphql/generated/gqlServices';

@Component({
    selector: 'app-rota-card',
    templateUrl: './rota-card.component.html',
    styleUrls: ['./rota-card.component.scss']
})
export class RotaCardComponent implements OnInit {

    @Input('data') data: Recurrence;

    constructor() { }

    ngOnInit() {
    }

}
