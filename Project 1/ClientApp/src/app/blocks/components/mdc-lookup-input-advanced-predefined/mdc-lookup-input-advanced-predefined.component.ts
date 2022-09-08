import { Observable, BehaviorSubject, fromEvent, Subject } from 'rxjs';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatCheckboxChange } from '@angular/material/checkbox';
import { FileSystemTagsEnum } from 'app/blocks/enum/file-system-tags.enum';
import { createLookupGqlCallback } from 'app/blocks/graphql/callback/createLookupGqlCallback';
import { LookupViewBase } from 'app/blocks/graphql/generated/bases';
import { LookupsStoreService } from 'app/blocks/graphql/store/lookupsStore.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import * as automapper from 'automapper-ts';
import findIndex from 'lodash/findIndex';
import { catchError, debounceTime, distinctUntilChanged, tap, takeUntil, map } from 'rxjs/operators';

import { DataPartition, Lookup, LookupsByGroupGQL, LookupView } from '../../graphql/generated/gqlServices';
import { LookupBase } from '../../graphql/generated/bases';
import { CreateLookupGQL, MedicalHistoryAlert } from '../../graphql/generated/gqlServices';
import { AppUtils } from '../../utils';
import { outputDataEvent } from './eventData.model';
import { ILookupView } from './Lookup.model';
import { PaginatorService } from 'app/blocks/utils/paginator.service';
import {  Store } from '@ngrx/store';
import { AppState } from '@appStore/reducers';
import { getLookups } from '@appStore/selectors';
import * as fromLookupsActions from '@appStore/actions';

@Component({
    selector: 'mdc-lookup-input-advanced-predefined',
    templateUrl: './mdc-lookup-input-advanced-predefined.component.html',
    styleUrls: ['./mdc-lookup-input-advanced-predefined.component.scss'],
})
export class MdcLookupInputAdvancedPredefinedComponent implements OnInit {

    private _unsubscribeAll: Subject<any>;
    private lookupsSubject$: BehaviorSubject<Lookup[]> = new BehaviorSubject<Lookup[]>([]);
    private searchOptionsDefaults: ISearchOptions = {
        keys: ['text'],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5
    };

    public predefinedLookupsSubject$: Observable<Lookup[]>;
    public FileSystemTagsEnum: typeof FileSystemTagsEnum = FileSystemTagsEnum;
    public list: LookupView[] = [];
    public editIndex: number;
    public handledValue;
    public keyPairCollection: any = [];
    public ctrl = new FormControl('');
    public lookups = [];
    public lookups$ = this.lookupsSubject$.asObservable();
    public oldLookup: LookupView = null;
    public editItemRiskFactor = -1;

    @Output() notify: EventEmitter<outputDataEvent> = new EventEmitter<outputDataEvent>();
    @Output() notifyRisk: EventEmitter<outputDataEvent> = new EventEmitter<outputDataEvent>();
    @Output() notifyOperation: EventEmitter<outputDataEvent> = new EventEmitter<outputDataEvent>();

    // @ list of lookups loaded by parent component for autocomplete
    @Input() lookupsCollection: LookupBase[] = [];
    // @ groupkey ex : cheif_complaint, radio 
    @Input('groupkey') public groupkeyInput;
    @Input('flow') public flow;
    @Input('placeholder') public placeholder = '';
    @Input('risk') public showRiskIcon = false;
    @Input('predefinedActive') public predefinedActivated = false;
    @Input('showrisk') public riskFactor = false;
    @Input('list') public list1: LookupView[] = [];
    // @ ex: radio, lab
    @Input() public modelName: string;
    @Input() // @ load list from parent
    public set dataLink(value: DataPartition | MedicalHistoryAlert) {
        this.list = value['text'] || value['data'];
    }
    @Input()
    public set dataLink1(value: DataPartition | MedicalHistoryAlert) {
        this.list1 = value['text'] || value['data'];

    }
    // @ parent inputs
    @ViewChild('save', { static: true }) public save;
    @ViewChild('input', { static: true }) public input;
    @ViewChild('fileInput', { static: false }) public fileInput;

    constructor(
        private snackBar: MatSnackBar,
        private _createLookupGQL: CreateLookupGQL,
        private _lookupsStore: LookupsStoreService,
        private _lookupsByGroupGQL: LookupsByGroupGQL,
        private _paginator: PaginatorService,
        private _store: Store<AppState>,
    ) {

        // Set the private defaults
        this._unsubscribeAll = new Subject();
    }

    ngOnInit() {

        // @ adding new value on ICON click
        fromEvent(this.save._elementRef.nativeElement, 'click')
            .subscribe(res => {

                const input = this.input.nativeElement.value;
                if (input) {
                    this.handledValue = input;

                    this.addValueProcessor();

                    this.input.nativeElement.value = '';
                    this.input.nativeElement.focus();
                }
            });

        // @ adding new value when ENTER key pressed
        fromEvent(this.input.nativeElement, 'keyup')
            .subscribe((res: any) => {

                // @ input is dirty then no option is selected then update handledValue by input value
                if (res.which !== 13) {
                    this.handledValue = res.target.value;
                }

                if (res.which === 13 && res.target.value) {

                    this.addValueProcessor();

                    res.target.value = '';
                }
            });
            this._store.select(getLookups, { groupKey: this.groupkeyInput })
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                if (response) {
                    // console.log('getLookupsState => '+ this.groupkeyInput+' => ',response)
                    let paginate = this._paginator.paginate<LookupBase>(response, this.ctrl.value, 0, 10, 'text', false, this.searchOptionsDefaults)
                    this.lookupsSubject$.next(paginate)
                }
                
            });
        this.ctrl
            .valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                tap((value: any) => {
                    // @ input could be fuzzy search object
                    if (typeof value === 'string') {
                        if (value !== '') {

                             // @ TODO: AYA
                             this.loadLookups();
                            // this._lookupsByGroupGQL.watch({ group: this.groupkeyInput, filter: value, page: 0, size: 10, filterPredefined: false })
                            //     .valueChanges
                            //     .subscribe((response) => {
                            //         if (response.data && response.data.lookupsByGroup) {
                            //             let paginate = this._paginator.paginate<LookupBase>(response.data.lookupsByGroup, value, 0, 10, 'text', false, this.searchOptionsDefaults)
                            //             this.lookupsSubject$.next(paginate)
                            //         }
                            //     })



                            // this._lookupsStore
                            //     .search(this.groupkeyInput, value, this.searchOptionsDefaults)
                            //     .pipe(takeUntil(this._unsubscribeAll))
                            //     .pipe(
                            //         tap(lookups => this.lookupsSubject$.next(lookups))
                            //     ).subscribe();
                        }

                        else {
                            // @ clear autoComplete
                            this.lookupsSubject$.next([]);
                        }
                    }
                })

            ).subscribe();

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
    private loadLookups(){
        this._store.dispatch(
            fromLookupsActions.loadLookups({
                group: this.groupkeyInput,
                filter: this.ctrl.value,
                page: 0,
                size: 10,
                filterPredefined: false
            }))
            
        

    }
    delete(index) {
        this.editItemRiskFactor = this.list1.findIndex(id => id.text === this.list[index].text);
        if (this.editItemRiskFactor !== -1) {
            this.list1.splice(this.editItemRiskFactor, 1);
            this.notifyRisk.emit({ modelName: 'riskFactors', data: this.list1 });
            this.editItemRiskFactor = -1;
        }
        this.list.splice(index, 1);

        this.emit();
    }
    deleteRiskFactor(index) {
        this.list1.splice(index, 1);
        this.notifyRisk.emit({ modelName: 'riskFactors', data: this.list1 });
    }
    insert(index) {

        const data = this.list[index];
        // @ Add new item to list
        let lookUp: LookupViewBase = new LookupViewBase();

        lookUp = {
            text: data.text,
            value: '',
            group: 'risk_factors',
            __typename: 'LookupView',
        };
        const dupChecker = this.isDuplicatedRiskFactors(lookUp);
        if (dupChecker) {
            return;
        }
        this.list1.push(lookUp);
        this.notifyRisk.emit({ modelName: 'riskFactors', data: this.list1 });
    }

    edit(index) {
        const item = this.list[index];

        this.editItemRiskFactor = this.list1.findIndex(id => id.text === item.text);

        this.oldLookup = Object.assign({}, item);
        this.input.nativeElement.value = item.text;
        this.editIndex = index;
        this.save._elementRef.nativeElement.innerText = 'edit';
    }

    addValueProcessor(): void {
        // @ EDIT
        if (this.editIndex >= 0) {
            const resolvedValue = this.buildFinalValue(this.handledValue);

            const dupChecker = this.isDuplicated(resolvedValue);
            if (dupChecker) {
                // @ CLear index
                this.editIndex = undefined;
                this.list[this.editIndex] = this.oldLookup;
                // @ Set back the default input ICON
                this.save._elementRef.nativeElement.innerText = 'add_box';
                this.oldLookup = null;
                this.editItemRiskFactor = -1;
                return;
            }
            // @ Update list item
            if (this.modelName === 'SurgicalHistory') {
                this.list[this.editIndex] = resolvedValue;
            }
            else {
                if (this.modelName === 'riskFactors') {
                    this.list1[this.editIndex] = resolvedValue;
                }
                else {
                    this.list[this.editIndex] = resolvedValue;
                    if (this.editItemRiskFactor !== -1) {
                        this.list1[this.editItemRiskFactor] = resolvedValue;
                        this.notifyRisk.emit({ modelName: this.modelName, data: this.list1 });
                    }
                }
            }
            // @ CLear index
            this.editIndex = undefined;
            this.editItemRiskFactor === -1;
            this.oldLookup = null;
            // @ Set back the default input ICON
            this.save._elementRef.nativeElement.innerText = 'add_box';

            // @ Emit data to parent component
            // this.notify.emit({ modelName: this.modelName, data: this.list });
            if (this.modelName === 'SurgicalHistory') {
                this.notifyOperation.emit({ modelName: this.modelName, data: this.list });
            }
            else {
                if (this.modelName === 'riskFactors') {
                    this.notifyRisk.emit({ modelName: this.modelName, data: this.list1 });
                }
                else {
                    this.emit();
                }
            }
            // @ clear autoComplete
            this.lookupsSubject$.next([]);

        } else {

            // @ setTimeout Reason : search box is debounced + store search end time
            // @ Hasan says: Timeout is causing a bug => setting timer to 0 to avoid the issue
            // setTimeout(() => {

                const resolvedValue = this.buildFinalValue(this.handledValue);

                const dupChecker = this.isDuplicated(resolvedValue);
                if (dupChecker) {
                    return;
                }

                // @ Add new item to list
                // if(this.modelName==='SurgicalHistory')
                // this.list.push(resolvedValue);

                else {

                    if (this.modelName === 'riskFactors') {
                        this.list1.push(resolvedValue);
                    }
                    else {
                        this.list.push(resolvedValue);
                    }
                }
                // @ Emit data to parent component                            
                // this.notify.emit({ modelName: this.modelName, data: this.list });              
                if (this.modelName === 'SurgicalHistory') {
                    this.notifyOperation.emit({ modelName: this.modelName, data: this.list });
                }
                else {
                    if (this.modelName === 'riskFactors') {
                        this.notifyRisk.emit({ modelName: this.modelName, data: this.list1 });
                    }
                    else {
                        this.emit();
                    }
                }

                // @ clear autoComplete
                this.lookupsSubject$.next([]);
            // }, 0);
        }
    }

    MatOptionSelectionChange(result: MatOptionSelectionChange) {
        if (typeof result === 'object' && result.isUserInput) {
            this.handledValue = result.source.value;
        }
    }

    buildFinalValue(val: any): ILookupView {
        let lookUp: LookupViewBase = new LookupViewBase();

        /*
        * FuzzySearch will return original objects by default (if no searchString provided)
        * when trying to search for something, fuzzySearch will return an object with matching  details
        * and the original object will be stored in _item key
        * then omit _item to get the original object
        */
        if (val._item) {
            val = val._item;
        }

        // @ create a new lookup
        // @ note : in case user typed a string text and pressed enter (not selected from autocomplete)
        // @ where this text is already exists in lookups
        if (typeof val === 'string') {
            // console.log()
            lookUp = {
                text: val,
                value: '', // @ server will handle the value and update value via mutation update method
                group: this.groupkeyInput,
                __typename: 'LookupView',
            };
        }

        // @ autocomplete selected -> existing lookup
        else if (typeof val === 'object' && val.text) {
            lookUp = {
                text: val.text,
                value: val.value,
                group: val.groupKey,
                __typename: 'LookupView',
            };
        }
        return lookUp as any;
    }

    displayLookupFn(lookUp?: ILookupView): string | undefined {
        return lookUp ? lookUp.text : undefined;
    }

    isDuplicated(lookup: ILookupView): boolean {

        const index = findIndex(this.list, (obj) => obj.text.toLowerCase() === lookup.text.toLowerCase());

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
    isDuplicatedRiskFactors(lookup: LookupViewBase): boolean {

        const index = findIndex(this.list1, (obj) => obj.text.toLowerCase() === lookup.text.toLowerCase());

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

    /**
     * @DEPRICATED
     * 
     * @param {any} lookup 
     * @returns 
     * 
     * @memberOf MdcLookupInputAdvancedComponent
     */
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
            })
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

    onPredefinedCheckedChange(event: MatCheckboxChange) {
        if (event.checked) {
            this.addPredefinedtoList(event.source.value);
            this.emit();
        } else {
            this.deletePredefinedFromList(event.source.value as Lookup);
        }
    }

    addPredefinedtoList(lookup) {
        const resolvedValue = this.buildFinalValue(lookup);

        const dupChecker = this.isDuplicated(resolvedValue);
        if (dupChecker) {
            return false;
        }

        // @ Add new item to list
        this.list.push(resolvedValue);
        return true;
    }

    deletePredefinedFromList(lookup: Lookup) {
        const index = this.list.findIndex(l => l.text.toLowerCase() === lookup.text);
        this.delete(index);
    }


    checkboxCompare(text: string): boolean {
        return this.list.some(elt => elt.text.toLowerCase() === text.toLowerCase());
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private emit() {
        this.notify.emit({ modelName: this.modelName, data: this.list });
    }

    loadPredefinedLookups(event) {

        // @ Prevent to focus on input when predefined icon is pressed
        event.stopPropagation();

        // this.predefinedLookupsSubject$ =
        // this.groupkeyInput 
        this.predefinedLookupsSubject$ = this._lookupsByGroupGQL
            .watch({ group: this.groupkeyInput, filter: '', filterPredefined: true, page: 0, size: 1000 })
            .valueChanges
            .pipe(
                takeUntil(this._unsubscribeAll),
                tap((d) => console.log(d)),
                map(({ data }) => data && data.lookupsByGroup ? data.lookupsByGroup : [] as Lookup[])
            );
    }
}


/*
*   Documentation
*
*/

/*

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
