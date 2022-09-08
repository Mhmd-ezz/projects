import { Component, ElementRef, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocomplete, MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { MatSnackBar } from '@angular/material/snack-bar';

import { TagBase } from 'app/blocks/graphql/generated/bases';
import { Subject ,  Observable } from 'rxjs';
import { catchError, map, takeUntil, startWith, switchMap, filter } from 'rxjs/operators';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { CreateTagGQL, Tag, TagInput } from '../../graphql/generated/gqlServices';
import { AppUtils } from '../../utils';
import { createTagGqlCallback } from 'app/blocks/graphql/callback/createTagGqlCallback';

@Component({
    selector: 'tag-input',
    templateUrl: './tag-input.component.html',
    styleUrls: ['./tag-input.component.scss'],
})
export class TagInputComponent implements OnInit {

 // Private
 private _unsubscribeAll: Subject<any>;

 @Output() public add: EventEmitter<any> = new EventEmitter<any>();

 @Input() // @ load list from parent
 public set dataLink(value: Tag[]) {
     this.list = value; 
 }  
 @Input() tagsCollection: any[]  = [];
 @Input('group') public group;
 @ViewChild('tagInput', { static: true }) public tagInput: ElementRef;
 @ViewChild('auto', { static: true }) public matAutocomplete: MatAutocomplete;

 tagCtrl = new FormControl();
 filteredTags: Observable<any>;


 public readonly separatorKeysCodes: number[] = [ENTER, COMMA];
 public errors: any = [];


 public list: any = [];
 public tag: TagBase = new TagBase() ;
 public tagChipsVisible = true;
 public tagChipssSlectable = true;
 public tagChipsRemovable = true;
 public tagChipsAddOnBlur = true;
 public onTagProcessor: Subject<any>;

 constructor(private _createTagGQL: CreateTagGQL,
    private snackBar: MatSnackBar, ) {
     // @ set defaults
     this._unsubscribeAll = new Subject();    
     this.onTagProcessor = new Subject();
 }

 ngOnInit() {

    
    this.filteredTags = this.tagCtrl.valueChanges
    .pipe(
      startWith(''),
      // map(value2 => typeof value2 === 'string' ? value2 : value2.name),
      map(name => name ? this._filter(name) : this.tagsCollection.slice())
    );

        this.newTag();  
   
     
             
           
 }

 /**
  * On destroy
  */
 ngOnDestroy(): void {
     // Unsubscribe from all subscriptions
     this._unsubscribeAll.next();
     this._unsubscribeAll.complete();
     this.onTagProcessor.next();
     this.onTagProcessor.complete();
 }

 ngOnChanges(changes: SimpleChanges) {

     if (changes['focus']) {
         if (changes.focus.currentValue === true) {
             setTimeout(() => {
                 this.tagInput.nativeElement.focus();
             }, 500);
         }
     }
 }

 // -----------------------------------------------------------------------------------------------------
 // @ Public methods
 // -----------------------------------------------------------------------------------------------------

 displayFn(id) {
    if (!id) { return ''; }
    if (id === '0') { return ''; }
    const index = this.tagsCollection.findIndex(option => option.name === id);
    return this.tagsCollection[index].name;
}
selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.viewValue;
    const tag = this.tagsCollection.find(tag => tag.name === value);
    
    const dupCheckerList = this.list.findIndex(option => option.name.toLowerCase() === value.toLowerCase());
           
    if (dupCheckerList !== -1)
    {
       
        this.tagInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
        return;
    }
    
    this.list.push(tag);
    this.add.emit({
        data: this.list
    });
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
}
private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.tagsCollection.filter(tag =>
        tag.name.toLowerCase().indexOf(filterValue) === 0);
}

removeTag(name: any): void {
    const index = this.list.indexOf(name);
    
    if (index >= 0) {
        this.list.splice(index, 1);
        this.add.emit({
         
         data: this.list
      });
    }
}

 addTag(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;
    if ((value || '').trim()) {
        
        const dupChecker = this.tagsCollection.findIndex(option => option.name.toLowerCase() === value.toLowerCase());
       
        if (dupChecker !== -1)
        {
            const dupCheckerList = this.list.findIndex(option => option.name.toLowerCase() === value.toLowerCase());
           
            if (dupCheckerList !== -1)
            {
               
                this.tagInput.nativeElement.value = '';
                this.tagCtrl.setValue(null);
                return;
            }
           
            const tag = this.tagsCollection.find(tag => tag.name.toLowerCase() === value.toLowerCase());
            
            this.list.push(tag);
           // console.log('list',this.list)
             this.add.emit({
                    data: this.list
    });
    this.tagInput.nativeElement.value = '';
    this.tagCtrl.setValue(null);
    
        }
        else
        {             
        this.tag.id = AppUtils.GenerateObjectId();                       
        this.tag.name = this.tagCtrl.value;
        this.tag.group = this.group;
        this.tag.__typename = 'Tag';         
            

       this.onTagProcessor.next(this.tag);    

       this.tagInput.nativeElement.value = '';
       this.tagCtrl.setValue(null);

        }
      
    
    }
    // Reset the input value
    if (input) {
        input.value = '';
        this.tagInput.nativeElement.value = '';
        this.tagCtrl.setValue(null);
    }
   
 }


newTag()
{
    let tag_ = Object.assign({},this.tag) as TagInput;
    
    this.onTagProcessor
     .pipe(takeUntil(this._unsubscribeAll))
     .pipe(            
         switchMap(x => {               
                   
                     return this._createTagGQL.mutate(
                         { tag: tag_ },
                         {
                             optimisticResponse: createTagGqlCallback.optimisticResponse(this.tag),
                             update: (proxy, ev) => createTagGqlCallback.update(proxy, ev)
                         }
                     );
                 }), 
                 catchError((err, source) => {                       
                     console.error('[ CATCH ERROR ]: ', err);
                     this.snackBar.open('An error Occurred', 'CLOSE', {
                         panelClass: 'm-24',
                         duration: 4000,
                     });
                     // @ Important to return source to avoid observable completion
                     return source;
                 })
             )
             .pipe(
                 
                 // @ Catch validation errors
                 filter((response) => {
                     
                     // @ errors exists
                     if (response.errors !== undefined && response.errors.length) {
                         this.errors = AppUtils.handleValidationGqlErrors(response.errors);
                     }
 
                     // @ found Validation errors
                     if (this.errors.length) {                            
 
                         this.snackBar.open('An error Occurred', 'CLOSE', {
                             panelClass: 'm-24',
                             duration: 4000,
                         });
                     }
                     else if (response.errors) {
                         // @ Unknown error                           
 
                     // @ if errors 
                     return response.errors !== undefined && response.errors.length ? false : true;
                          }


                     if (response.data.createTag) {
                        this.errors = [];
                        const tag = Object.assign({}, this.tag);
                       this.list.push(tag);
                       this.add.emit({     
                        data: this.list
                     });
                    }
                 })
             )
             .subscribe();
}

 }

