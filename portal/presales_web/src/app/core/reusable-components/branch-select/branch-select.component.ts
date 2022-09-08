import { Validators } from '@angular/forms';
/* eslint-disable */
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of, ReplaySubject, Subject } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, delay, distinctUntilChanged, filter, map, startWith, switchMap, take, takeUntil, tap } from 'rxjs/operators';
import { Branch } from 'app/core/interface/branch.interface';
import { MatSelect } from '@angular/material/select';
import { User } from 'app/core/user/user.types';
import { BranchesService } from 'app/core/services/branches.service';
import { uniqBy } from "lodash-es";
@Component({
  selector: 'app-branch-select',
  templateUrl: './branch-select.component.html',
  styleUrls: ['./branch-select.component.scss']
})
export class BranchSelectComponent implements OnInit {

  @Output() userSelected: EventEmitter<any> = new EventEmitter();
  @Input() form: any;
  @Input() label: string;
  @Input() controlName: string;
  @Input() required: boolean;
  @Input() data: Branch;


  searching = false;
  branchControl = new FormControl('1', []);
  filterCtrl: FormControl = new FormControl();
  branches$: ReplaySubject<Branch[]> = new ReplaySubject<Branch[]>(1);
  branches: Branch[] = [];

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _branchesService: BranchesService
  ) {
  }

  ngOnInit(): void {

    if (this.required) {
      this.branchControl = new FormControl('', [Validators.required]);
    } else {
      this.branchControl = new FormControl('', []);
    }

    this.searchProcessor();
    this.loadInitial();

    if (this.form) {
      this.form.addControl(this.controlName, this.branchControl);
      this.form.updateValueAndValidity()
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if ('data' in changes) {
      this.branchControl.setValue(changes.data.currentValue)
      const branches = this.uniqRecords(this.branches);
      this.branches$.next(branches);
    }
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  //--------------------------------------------------
  // Public Method
  //--------------------------------------------------

  onUserSelected(event: MatAutocompleteSelectedEvent) {
    this.userSelected.emit(event.option.value);
  }

  displayFn(user: User): string {
    return user && user?.name ? `${user?.name} - ${user?.branch?.name}` : '';
  }

  compareById(item1, item2) {
    return item1.id == item2.id
  }

  //--------------------------------------------------
  // Private Method
  //--------------------------------------------------
  private searchProcessor() {

    // listen for search field value changes
    this.filterCtrl.valueChanges
      .pipe(
        filter(search => !!search),
        tap(() => this.searching = true),
        takeUntil(this._unsubscribeAll),
        debounceTime(600),
        switchMap(() => this._branchesService.getBranches(1, 100, this.filterCtrl.value, 'name', false)),
      )
      .subscribe(data => {
        this.searching = false;
        const branches = this.uniqRecords(data.data);
        this.branches$.next(branches);
      },
        error => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        });
  }

  private loadInitial() {
    this._branchesService
      .getBranches(1, 10, '', 'name', false)
      .pipe(
        takeUntil(this._unsubscribeAll),
      )
      .subscribe((data) => {

        const branches = this.uniqRecords(data.data);
        this.branches$.next(branches);
      })
  }

  // @ Fix issue: the selected option disappear bcs select-options input can't find the record in options
  // @ solution : always append the selected item to branches list
  private uniqRecords(array: Branch[]) {
    const branches: Branch[] = uniqBy([...array, ...[this.data]], 'id');
    return branches;
  }

}
