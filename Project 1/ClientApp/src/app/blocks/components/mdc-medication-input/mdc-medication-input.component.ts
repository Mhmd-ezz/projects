import omit from 'lodash/omit';
import findIndex from 'lodash/findIndex';
import { Component, EventEmitter, Input, OnInit, Output, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatOptionSelectionChange } from '@angular/material/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Logger } from '@nsalaun/ng-logger';
import * as automapper from 'automapper-ts';
import { fromEvent, Subject, BehaviorSubject } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { MedicationBase } from '../../graphql/generated/bases';
import { CreateDrugGQL, DrugsGQL, Medication, Drug } from '../../graphql/generated/gqlServices';
import { ConstantsService } from '../../common/constants.service';
import { MdcMedicationViewDialogComponent } from './../mdc-medication-view-dialog/mdc-medication-view-dialog.component';
import { DrugsStoreService } from 'app/blocks/graphql/store/drugsStore.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { IFuzzyType } from 'app/blocks/interface/IFuzztType';
import { findLastIndex } from 'lodash';
import { Store } from '@ngrx/store';
import { AppState } from '@appStore/reducers';
import * as fromDrugsActions from '@appStore/actions';
import {  GetDrugs } from '@appStore/selectors';
import { FuzzySearchService } from 'app/blocks/pipes/fuzzy-search.service';

// const DrugsQ = require('graphql-tag/loader!../../graphql/queries/drugs.gql');

@Component({
    selector: 'mdc-medication-input',
    templateUrl: './mdc-medication-input.component.html',
    styleUrls: ['./mdc-medication-input.component.scss']
})
export class MdcMedicationInputComponent implements OnInit {
    // Private
    private _unsubscribeAll: Subject<any>;
    private drugsSubject$: BehaviorSubject<IFuzzyType<Drug>[]> = new BehaviorSubject<IFuzzyType<Drug>[]>([]);


    @Output() public notifyMedication: EventEmitter<any> = new EventEmitter<any>();
    @Input() private modelName: string;
    @Input() public placeholder: string;

    // @ DOM focus
    @Input() public focus: boolean;

    @Input() // @ load list from parent
    public set dataLink(value: Medication[]) {
        this.list = value;
    }

    @ViewChild('save', { static: false }) public save;
    @ViewChild('input', { static: true }) public input: ElementRef;

    public drugNameInput = new FormControl('');
    public medication: Medication = new MedicationBase();
    public oldMedication: Medication = new MedicationBase();
    // public inputPlaceHolder = this.placeholder || 'Medications';
    public inputPlaceHolder;
    public editIndex: number;
    public newDrugMode = false;
    public drugs: any[] = [];
    public drugForms: string[] = [];
    public handledValue;
    public list = [];
    public drugs$ = this.drugsSubject$.asObservable();
    private searchOptions: ISearchOptions = {
        keys: ["name"],
        fuzzySearchOptions: {},
        extractOriginalItem: false,
        outputLimit: 5000
    };

    constructor(
        private _drugsGQL: DrugsGQL,
        private _constantsService: ConstantsService,
        private _drugsStoreService: DrugsStoreService,
        private snackBar: MatSnackBar,
        private dialog: MatDialog,
        private _logger: Logger,
        private _createDrugGQL: CreateDrugGQL,
        private _fuzzySearch:FuzzySearchService,
        private _store: Store<AppState>,
    ) {
        // @ set defaults
        this._unsubscribeAll = new Subject();
        this.inputPlaceHolder = this.placeholder || 'Medications';

        this.drugForms = _constantsService.drugForms;

    }

    ngOnInit() {
        // this._drugsGQL
        //     .watch()
        //     .valueChanges.pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe(
        //         response => {
        //             if (response.data && response.data.drugs) {
        //                 this.drugs = response.data.drugs;
        //             }
        //         },
        //         error => {
        //             this._logger.error('[Error]: ', error);
        //         }
        //     );

        this._store.select(GetDrugs)
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((response) => {
                if (response) {
                    const fuzzyearch = this._fuzzySearch.search(
                        response,
                        this.drugNameInput.value,
                        this.searchOptions.keys,
                        this.searchOptions

                    )
                    console.log('fuzzyearch', fuzzyearch)
                    if (fuzzyearch)
                        this.drugsSubject$.next(fuzzyearch);
                    else
                        this.drugsSubject$.next([]);
                          
            }
            
        });
        this.drugNameInput
            .valueChanges
            .pipe(
                debounceTime(1000),
                distinctUntilChanged(),
                tap((value: any) => {

                    // @ input could be fuzzy search object
                    if (typeof value === 'string') {
                        if (value !== '') {
                            this._store.dispatch(
                                fromDrugsActions.loadDrugs({
                                    filter: value,
                                    page: 0,
                                    size: 10,
                                    options: { fetchPolicy: "no-cache" }
                                }))

                                // this._drugsStoreService
                                // .search<IFuzzyType<Drug>>(value, this.searchOptions)
                                // .pipe(takeUntil(this._unsubscribeAll))
                                // .pipe(
                                //     tap(drugs =>   drugs.data ?  this.drugsSubject$.next(drugs.data) : null  ),
                                //     tap(drugs => console.log(drugs))
                                // ).subscribe();
                        }

                        else {
                            // @ clear autoComplete
                            this.drugsSubject$.next([]);
                        }
                    }
                })

            ).subscribe();

        // @ Adding new value when ENTER key is pressed
        fromEvent(this.input.nativeElement, 'keyup').subscribe((res: any) => {
            if (!res.target.value) {
                return;
            }

            // @ input is dirty then no option is selected so update handledValue by input value
            if (res.which !== 13) {
                this.handledValue = res.target.value;
            }
            if (res.which === 13) {
                this.pushValue(res);
            }

        });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    ngOnChanges(changes: SimpleChanges) {

        if (changes['focus']) {
            if (changes.focus.currentValue === true) {
                setTimeout(() => {
                    this.input.nativeElement.focus();
                }, 500);
            }
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    delete(index) {
        this.list.splice(index, 1);
        this.notifyMedication.emit({
            modelName: this.modelName,
            data: this.list
        });
    }

    edit(index) {
         const item = this.list[index];
         this.medication = item;
         this.oldMedication = Object.assign({}, item);
         this.drugNameInput.setValue(item.drug);
         this.editIndex = index;
         this.save._elementRef.nativeElement.innerText = 'edit';
    }

    viewMedication(medication) {
        // @ DEPRICATED: Doctors feedback => medication properties like : range date, freq and note are useless for the recent moment
        return ;
        this.openViewMedicationDialog(medication);
    }

    displayLookupFn(entity?: any): string | undefined {
        return entity ? entity.name : undefined;
    }

    MatOptionSelectionChange(result: MatOptionSelectionChange) {
        if (typeof result === 'object' && result.isUserInput) {
            let drug = result.source.value;
            if (result.source.value._item) { drug = result.source.value._item; }

            // @ Map drug to drugview
            const mappedDrug = automapper.map(
                'DrugInput',
                'DrugViewBase',
                drug
            );
            // mappedDrug.__typename = 'DrugView';

            this.handledValue = mappedDrug;

        }
    }

    buildFinalValue(object: any): Medication | null {
        let medication: Medication = new MedicationBase();
        let value = object;

        /*
         * FuzzySearch will return original objects by default (if no searchString provided)
         * when trying to search for something, fuzzySearch will return an object with matching  details
         * and the original object will be stored in _item key
         * then omit _item to get the original object
         */
        if (value._item) {
            value = value._item;
        } else if (value.highlights) {
            value = omit(value, ['highlights']);
        }

        if (typeof value === 'object' && value.name) {
            medication = this.medication;
            medication.drug = value;
        } else {
            medication = null;
        }

        return medication;
    }

    openViewMedicationDialog(medication): void {
        this.dialog.open(MdcMedicationViewDialogComponent, {
            data: medication,
            height: '400px',
            width: '600px'
        });
    }

 

    // @ Handle frequency and note input key enter press
    EnterNewRecord(res) {
        this.pushValue(res);
    }

    // @ push medication to list
    pushValue(res) {
        // @ drug name is empty then break
        if (!this.drugNameInput.value) {
            return;
        }

        // // @ input is dirty then no option is selected then update handledValue by input value
        // if (res.which !== 13) {
        //     this.handledValue = this.drugNameInput.value;
        // }

        if (this.drugNameInput.value) {
            // @ Need to create new drug
            if (typeof this.handledValue === 'string') {
                this.newDrugMode = true;
                this.medication = new MedicationBase();
                this.handledValue = this.handledValue.trim();
                this.medication.drug.name = this.handledValue;
                const dupChecker = this.isDuplicated();
                if (dupChecker)
                {
                     // @ CLear index
                     this.editIndex = undefined;
                     // @ Set back the default input ICON 
                     this.save._elementRef.nativeElement.innerText = 'add_box';
                      // @ clear inputs
                this.medication = new MedicationBase();
                this.oldMedication = new MedicationBase();
                this.drugNameInput.setValue(null);
                     return;
                    } 
                if (this.editIndex >= 0) {
                    this.list[this.editIndex] = this.medication;
                    this.notifyMedication.emit({
                        modelName: this.modelName,
                        data: this.list
                    });

                    // @ CLear index
                    this.editIndex = undefined;
                    // @ Set back the default input ICON
                    this.save._elementRef.nativeElement.innerText = 'add_box';
                }
                else
                {
                // @ Add new item to list
                this.list.push(this.medication);
                this.notifyMedication.emit({
                    modelName: this.modelName,
                    data: this.list
                });
                }
                // @ clear inputs
                this.medication = new MedicationBase();
                this.drugNameInput.setValue(null);

                // this.openNewDrugDialog();
            } else if (typeof this.handledValue === 'object') {
                // @ check if edit mode
                if (this.editIndex >= 0) {
                    // @ Update list item
                    const _medication = this.buildFinalValue(this.handledValue);

                    if (_medication != null) {
                        const dupChecker = this.isDuplicated();
                        if (dupChecker) {
                           this.list[this.editIndex] = this.oldMedication;
                           // @ CLear index
                            this.editIndex = undefined;
                         // @ Set back the default input ICON                    
                            this.save._elementRef.nativeElement.innerText = 'add_box';  
                            this.medication = new MedicationBase();
                            this.oldMedication = new MedicationBase();                         
                            this.drugNameInput.setValue(null);
                            return;
                        }

                        this.list[this.editIndex] = _medication;
                        this.notifyMedication.emit({
                            modelName: this.modelName,
                            data: this.list
                        });

                        // @ clear inputs
                        this.medication = new MedicationBase();
                        this.drugNameInput.setValue(null);
                    } else {
                        this._logger.error(
                            '[error]: Couldn\'t build medication!'
                        );
                    }

                    // @ CLear index
                    this.editIndex = undefined;
                    // @ Set back the default input ICON

                    this.save._elementRef.nativeElement.innerText = 'add_box';


                } else {

                    // @ Drug Object found even currenlty created or exists
                    const _medication = this.buildFinalValue(this.handledValue);

                    if (_medication != null) {
                        const dupChecker = this.isDuplicated();

                        if (dupChecker) { return; }

                        // @ Add new item to list
                        this.list.push(_medication);
                        this.notifyMedication.emit({
                            modelName: this.modelName,
                            data: this.list
                        });
                        // @ clear inputs
                        this.medication = new MedicationBase();
                        this.drugNameInput.setValue(null);
                    } else {
                        this._logger.error(
                            '[error]: Couldn\'t build medication!'
                        );
                    }
                }
            } else {
                // @ throw error when value type is not object or string
                this._logger.error(
                    '[Error]: Can\'t handle drug type of',
                    typeof this.handledValue
                );
            }
        }
    }

    isDuplicated(): boolean {
        const drugName = typeof this.handledValue === 'string' ? this.handledValue : this.handledValue.name;

        const dupIndex = findIndex(this.list, (o: Medication) => {
            return drugName.toLowerCase() === o.drug.name.toLowerCase();
            // return (
            //     o.drug.id === medication.drug.id &&
            //     isEqual(
            //         omit(o, ['drug', '__typename']),
            //         omit(medication, ['drug', '__typename'])
            //     )
            // );
        });
        const lastdupIndex = findLastIndex(this.list, (o: Medication) => {
            return drugName.toLowerCase() === o.drug.name.toLowerCase();
        });
       
        if (this.editIndex >= 0) {
            if (dupIndex === -1 || dupIndex === this.editIndex) {
                if (lastdupIndex === -1 || lastdupIndex === this.editIndex) {
                return false;
                }
                else
                {
                    this.snackBar.open(
                        'Attention ! This drug is already added ',
                        'OK',
                        {
                            panelClass: 'm-24',
                            duration: 2000
                        }
                    );
                    return true; // @ duplicated | rejected
                }
            } // @ confirmed
            else
            {
                this.snackBar.open(
                    'Attention ! This drug is already added ',
                    'OK',
                    {
                        panelClass: 'm-24',
                        duration: 2000
                    }
                );
                return true; // @ duplicated | rejected
            }
        }
        else{
        if (dupIndex === -1) {
            return false;
        } // @ confirmed
        else {
            this.snackBar.open(
                'Attention ! This drug is already added ',
                'OK',
                {
                    panelClass: 'm-24',
                    duration: 2000
                }
            );
            return true; // @ duplicated | rejected
        }
    }
}
}

   /**
     * @DEPRICATED
     * 
     * 
     * @memberOf MdcMedicationInputComponent
     */
    // openNewDrugDialog(): void {
    //     const dialogRef = this.dialog.open(MdcDrugInputDialogComponent, {
    //         data: this.medication.drug,
    //         height: '400px',
    //         width: '600px'
    //     });

    //     dialogRef.afterClosed().subscribe((result: DrugView) => {
    //         result['__typename'] = 'DrugView';
    //         this.medication.drug = result;
    //         this.handledValue = result;
    //         // @ Update local drug name input in ui
    //         this.drugNameInput.setValue(result);

    //         // @ returned drug of type drugView and server expects drugInput then map the drug
    //         const mappedDrugInput: DrugInput = automapper.map(
    //             'DrugView',
    //             'DrugInputBase',
    //             result
    //         );
    //         // @ send request and update store
    //         this._createDrugGQL.mutate(
    //             { drug: mappedDrugInput },
    //             {
    //                 optimisticResponse: createDrugGqlCallback.optimisticResponse(
    //                     mappedDrugInput
    //                 ),
    //                 update: (proxy, ev) =>
    //                     createDrugGqlCallback.update(proxy, ev)
    //             }
    //         );
    //     });
    // }
