import { Component, OnInit } from '@angular/core';
import { RotaEventObject } from 'app/blocks/interface/rota-event-object';
import filter from 'lodash/filter';
import forEach from 'lodash/forEach';
import flow from 'lodash/fp/flow';
import groupBy from 'lodash/fp/groupBy';
import values from 'lodash/fp/values';
import maxBy from 'lodash/maxBy';
import minBy from 'lodash/minBy';
import { Subject } from 'rxjs';
import { data } from './data';

@Component({
    selector: 'app-dashboard',
    templateUrl: './dashboard.component.html',
    styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

    // Private
    private _unsubscribeAll: Subject<any>;

    all = [];
    floors = [];
    operations = [];
    visits = [];

    constructor() {
        // @ Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

        let events = flow(
            values,
            groupBy('location'),
        )(data)

        forEach(events, (arrayOfEvents, key) => {

            // ---------------------------
            //      Operations Events
            // ---------------------------

            let operationEvents = filter(arrayOfEvents, (event) => event['type'] == "operation")
            if (operationEvents.length) {
                let operationsObj = this.build(operationEvents, key)
                operationsObj.operationsCount = operationEvents.length ? operationEvents.length : 0
                this.operations.push(operationsObj)
            }

            // ---------------------------
            //      Visits Events
            // ---------------------------

            let visitsEvents = filter(arrayOfEvents, (event) => event['type'] == "visit")
            if (visitsEvents.length) {
                let visitsObj = this.build(visitsEvents, key)
                visitsObj.visitsCount = visitsEvents.length ? visitsEvents.length : 0
                this.visits.push(visitsObj)
            }

            // ---------------------------
            //      Floor Events
            // ---------------------------

            let floorsEvents = filter(arrayOfEvents, (event) => event['type'] == "floor")
            if (floorsEvents.length) {
                let floorsObj = this.build(floorsEvents, key)
                floorsObj.floorsCount = floorsEvents.length ? floorsEvents.length : 0
                this.floors.push(floorsObj)
            }

            let allObj = this.build(arrayOfEvents, key)
            allObj.operationsCount = operationEvents.length ? operationEvents.length : 0
            allObj.visitsCount = visitsEvents.length ? visitsEvents.length : 0
            allObj.floorsCount = floorsEvents.length ? floorsEvents.length : 0
            this.all.push(allObj)
        })

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

    build(arrayOfEvents: any[], key: string): RotaEventObject {

        let startDate = minBy(arrayOfEvents, "dateTime");
        let starteDateTime = startDate ? startDate['dateTime'] : null;
        let endDate = maxBy(arrayOfEvents, "dateTime")
        let endDateTime = endDate ? endDate['dateTime'] : null

        let object: RotaEventObject = {
            location: key,
            startDate: starteDateTime,
            address: arrayOfEvents[0].address,
            endDate: endDateTime,
            events: arrayOfEvents,
            eventsCount: arrayOfEvents.length | 0,
            floorsCount: 0,
            operationsCount: 0,
            visitsCount: 0
        }

        return object
    }


}
