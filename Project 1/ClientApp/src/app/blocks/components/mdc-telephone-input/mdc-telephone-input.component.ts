import { Component, EventEmitter, Input, OnInit, Output, ViewChild, SimpleChanges, ElementRef } from '@angular/core';
import { FormControl } from '@angular/forms';
import { fromEvent, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';

// const DrugsQ = require('graphql-tag/loader!../../graphql/queries/drugs.gql');

@Component({
    selector: 'mdc-telephone-input',
    templateUrl: './mdc-telephone-input.component.html',
    styleUrls: ['./mdc-telephone-input.component.scss']
})
export class MdcTelephonenputComponent implements OnInit {
    // Private
    private _unsubscribeAll: Subject<any>;
    // private drugsSubject$: BehaviorSubject<IFuzzyType<Drug>[]> = new BehaviorSubject<IFuzzyType<Drug>[]>([]);


    @Output() public notifyTelephone: EventEmitter<any> = new EventEmitter<any>();


    @Input() // @ load list from parent
    public set dataLink(value: string[]) {
        this.list = value; 
    }  
   
    @ViewChild('input', { static: true }) public input: ElementRef;

    public telephoneNameInput = new FormControl('');
    public telephone: string;
    

    public editIndex: number;
 
    
    public handledValue;
    public list = [];
 
   
    constructor() {
        // @ set defaults
        this._unsubscribeAll = new Subject();
       
    }

    ngOnInit() {

        this.telephoneNameInput
            .valueChanges
            .pipe(
                debounceTime(400),
                distinctUntilChanged(),
                tap((value: any) => {

                 // console.log('telephone',value)
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
                this.EnterNewRecord();
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
        this.notifyTelephone.emit({
            
            data: this.list
        });
    }

    viewTelephone(telephone) {
        // @ DEPRICATED: Doctors feedback => medication properties like : range date, freq and note are useless for the recent moment
        return ;
       
    }



    // @ Handle frequency and note input key enter press
    EnterNewRecord() {

        if (!this.telephoneNameInput.value) {
            return;
        }
        if (this.telephoneNameInput.value) {
            this.telephone = this.telephoneNameInput.value;

            // @ Add new item to list
            this.list.push(this.telephone);

            this.notifyTelephone.emit({
                data: this.list
            });
            // @ clear inputs
            this.telephone = null;
            this.telephoneNameInput.setValue(null);

        }
    }

   
}

  
