import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { EventTypesEnum } from 'app/blocks/enum/event-types.enum';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { ScheduleFilterArgs } from 'app/blocks/interface/schedule-filter-args';

@Component({
    selector: 'app-filter',
    templateUrl: './filter.component.html',
    styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

    @Input() folded: boolean = false;
    @Output() change: EventEmitter<ScheduleFilterArgs> = new EventEmitter<ScheduleFilterArgs>()

    types: any[];
    indeterminate: boolean = false;
    allSelected: boolean = true;
    isDirty: boolean = false;

    constructor() { }

    ngOnInit() {
        this.setTypesToTrue();
    }

    //--------------------------------------------------------------------
    //  Public methods
    //--------------------------------------------------------------------

    toggleFolded() {
        this.folded = !this.folded
    }

    refactorCheckbox() {

        // @ If any is unselected 
        let filter = this.types.filter(obj => obj.value === false)

        // @ All are selected
        if (filter.length == 0) {
            this.allSelected = true;
            this.indeterminate = false;
            this.isDirty = false;
        }
        // @ if some are unselected
        else if (filter.length < this.types.length) {
            this.allSelected = true;
            this.indeterminate = true;
            this.isDirty = true;
        }
        // @ If all are unselected
        else if (filter.length == this.types.length) {
            this.allSelected = false;
            this.indeterminate = false;
            this.isDirty = true;
        }

        this.change.emit({ filtered: this.types, isDirty: this.isDirty })
    }

    onAllSelectedChange(event: MatCheckboxChange) {
        this.types.map(obj => obj.value = event.checked)
        this.refactorCheckbox()
    }

    //--------------------------------------------------------------------
    //  Private methods
    //--------------------------------------------------------------------

    setTypesToTrue() {
        let typesEnum = Object.values(EventTypesEnum)
        this.types = typesEnum.map(type => { return { name: type, value: true } })
    }

}
