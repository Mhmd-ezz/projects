import { AppUtils } from './../../utils/index';
import { Component, ContentChild, EventEmitter, Input, OnInit, Output, SimpleChanges } from '@angular/core';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FuseUtils } from '@fuse/utils';
import { createLookupGqlCallback } from 'app/blocks/graphql/callback/createLookupGqlCallback';
import { LookupViewBase } from 'app/blocks/graphql/generated/bases';
import * as automapper from 'automapper-ts';
import { fromEvent } from 'rxjs';
import { DataPartition, LookupView } from '../../graphql/generated/gqlServices';
import { LookupBase } from './../../graphql/generated/bases';
import { CreateLookupGQL, MedicalHistoryAlert } from './../../graphql/generated/gqlServices';
import { outputDataEvent } from './eventData.model';
import { ILookupView } from './Lookup.model';
import { catchError } from 'rxjs/operators';

import keyBy from 'lodash/keyBy';
import findIndex from 'lodash/findIndex';


@Component({
    selector: 'mdc-lookup-input',
    templateUrl: './mdc-lookup-input.component.html',
    styleUrls: ['./mdc-lookup-input.component.scss']
})
export class MdcLookupInputComponent implements OnInit {

    @Output() notify: EventEmitter<outputDataEvent> = new EventEmitter<outputDataEvent>();

    // @ list of lookups loaded by parent component for autocomplete
    @Input() lookupsCollection: LookupBase[] = [];

    // @ groupkey ex : cheif_complaint, radio 
    @Input('groupkey') public groupkeyInput;

    // @ ex: radio, lab
    @Input() public modelName: string;

    @Input() // @ load list from parent
    public set dataLink(value: DataPartition | MedicalHistoryAlert) {
        this.list = value['text'] || value['data'];
    }

    // @ parent inputs
    @ContentChild('save', { static: false }) public save;
    @ContentChild('input', { static: false }) public input;

    public list: LookupView[] = [];
    public editIndex: number;
    public handledValue;
    public keyPairCollection: any = [];

    constructor(
        private snackBar: MatSnackBar,
        private _createLookupGQL: CreateLookupGQL,
    ) { }

    ngAfterContentInit() {

        // @ adding new value on ICON click
        if (this.save) {
            fromEvent(this.save._elementRef.nativeElement, 'click')
                .subscribe(res => {
                    const input = this.input.nativeElement.value;
                    if (input) {

                        this.addValueProcess();

                        this.input.nativeElement.value = '';
                        this.input.nativeElement.focus();
                    }
                });
        }

        // @ adding new value when ENTER key pressed
        if (this.input) {
            fromEvent(this.input.nativeElement, 'keyup')
                .subscribe((res: any) => {

                    // @ input is dirty then no option is selected then update handledValue by input value
                    if (res.which !== 13) {
                        this.handledValue = res.target.value;
                    }

                    if (res.which === 13 && res.target.value) {

                        this.addValueProcess();

                        res.target.value = '';
                    }
                });
        }

    }

    ngOnInit() {

    }

    ngOnChanges(changes: SimpleChanges) {
        // only run when property "lookupsCollection" changed
        if (changes['lookupsCollection']) {
            this.keyPairCollection = keyBy(this.lookupsCollection, 'text');
        }
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    delete(index) {
        this.list.splice(index, 1);
        this.notify.emit({ modelName: this.modelName, data: this.list });
    }

    edit(index) {
        const item = this.list[index];
        this.input.nativeElement.value = item.text;
        this.editIndex = index;
        this.save._elementRef.nativeElement.innerText = 'edit';
    }

    addValueProcess(): void {

        if (this.editIndex >= 0) {

            const resolvedValue = this.buildFinalValue(this.handledValue);

            const dupChecker = this.isDuplicated(resolvedValue);
            if (dupChecker) {
                return;
            }

            // @ Check if new lookup to push it to store
            if (typeof this.handledValue === 'string' && !this.keyPairCollection[this.handledValue]) {
                this.pushToStore(resolvedValue);
            }

            // @ Update list item
            this.list[this.editIndex] = resolvedValue;
            // @ CLear index
            this.editIndex = undefined;
            // @ Set back the default input ICON
            this.save._elementRef.nativeElement.innerText = 'add_box';
            // @ Emit data to parent component
            this.notify.emit({ modelName: this.modelName, data: this.list });

        } else {

            const resolvedValue = this.buildFinalValue(this.handledValue);

            const dupChecker = this.isDuplicated(resolvedValue);
            if (dupChecker) {
                return;
            }

            // @ Check if new lookup to push it to store
            if (typeof this.handledValue === 'string' && !this.keyPairCollection[this.handledValue]) {
                this.pushToStore(resolvedValue);
            }

            // @ Add new item to list
            this.list.push(resolvedValue);
            // @ Emit data to parent component                            
            this.notify.emit({ modelName: this.modelName, data: this.list });
        }
    }

    MatOptionSelectionChange(result: MatOptionSelectionChange) {
        if (typeof result === 'object' && result.isUserInput) {
            this.handledValue = result.source.value;
        }
    }

    buildFinalValue(value: any, updateStore = false): ILookupView {
        let lookUp: LookupViewBase = new LookupViewBase();

        /*
        * FuzzySearch will return original objects by default (if no searchString provided)
        * when trying to search for something, fuzzySearch will return an object with matching  details
        * and the original object will be stored in _item key
        * then omit _item to get the original object
        */
        if (value._item) {
            value = value._item;
        }

        // @ create a new lookup
        // @ note : in case user typed a string text and pressed enter (not selected from autocomplete)
        // @ where this text is already exists in lookups
        // @ therefore, we should always check keyPairCollection against text 
        if (typeof value === 'string' && !this.keyPairCollection[value]) {
            lookUp = {
                text: value,
                value: FuseUtils.generateGUID(),
                group: this.groupkeyInput,
                __typename: 'LookupView',
            };
        }
        else if (typeof value === 'string' && this.keyPairCollection[value]) {

            const lookup__: LookupBase = this.keyPairCollection[value];

            lookUp = {
                text: lookup__.text,
                value: lookup__.value,
                group: lookup__.groupKey,
                __typename: 'LookupView',
            };
        }
        else if (typeof value === 'object' && value.text) {
            // @ existing lookup
            lookUp = {
                text: value.text,
                value: value.value,
                group: value.groupKey,
                __typename: 'LookupView',
            };
        }
        return lookUp as any;
    }

    displayLookupFn(lookUp?: ILookupView): string | undefined {
        return lookUp ? lookUp.text : undefined;
    }

    isDuplicated(lookup: ILookupView): boolean {
        const index = findIndex(this.list, { 'text': lookup.text, 'group': lookup.group });
        if (index === -1) {
            return false;
        } // @ confirmed 
        else {
            this.snackBar.open('Attention ! This value is already added ', 'OK', {
                panelClass: 'm-24',
                duration: 2000,
            });
            return true; // @ duplicated | rejected
        }
    }

    pushToStore(lookup) {

        const lookupInput = {
            id: AppUtils.GenerateObjectId(),
            groupKey: lookup.group,
            text: lookup.text,
            value: lookup.value,
            predefined: false,
            __typename: 'LookupInput',
        };

        // @ important :the new lookup is lookupInput type which has different properties from lookup type
        // @ while store expects normal lookup type
        // @ so we need to map the lookupInput type to lookup type to avoid store errors
        const mappedLookup = automapper.map('LookupInputBase', 'LookupBase', lookupInput);

        return this._createLookupGQL.mutate(
            { lookup: lookupInput },
            {
                optimisticResponse: createLookupGqlCallback.optimisticResponse(mappedLookup),
                update: (proxy, ev) => createLookupGqlCallback.update(proxy, ev)
            }
        )
            .pipe(
                catchError((err, source) => {

                    this.snackBar.open(`Error: Couldn't create lookup ${lookupInput.value} `, 'CLOSE', {
                        panelClass: 'm-24',
                        duration: 4000,
                    });
                    // @ Important to return source to avoid observable completion
                    return source;
                })
            )
            .subscribe(_ => { });

    }
}





/*
*   Documentation
*
*/

/*
<mdc-lookup-input [modelName]="'cheifComplaint'" (notify)="notifyHandler($event)"
    #ElRef>
    <mat-form-field class="mdc-smart-input">
        <input matInput #input placeholder="Chief Complaint" name="cheifComplaint"
             matInput [formControl]="cheifComplaintControl"
            [matAutocomplete]="auto">
        <mat-icon class="cursor-pointer" (click)="$event.stopPropagation()" matSuffix
            #save>add_box</mat-icon>
        <mat-autocomplete #auto="matAutocomplete" [displayWith]="displayLookupFn">
            <mat-option *ngFor="let option of (options | fuzzysearch: cheifComplaintControl.value : ['text'])"
                [value]="option" (onSelectionChange)="input.value !=undefined && ElRef.MatOptionSelectionChange($event)">
                <div class="flex-spacebetween">
                    <div [innerHTML]="option.highlights?.text"> </div>
                </div>
            </mat-option>
        </mat-autocomplete>
    </mat-form-field>
</mdc-lookup-input>
*/

/*
* required :
*   - modelName
*   - notify
*   - #ElRef (uniqe name for each)
*   - #input
*   - #save
*   - displayWith
*   - formControl ( uniqe )
*   - fuzzysearch keys ex: (  ['text'] )
*   - innerHTML
*   - displayWith



*/
