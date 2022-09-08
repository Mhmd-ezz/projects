import { UsersService } from 'app/core/services/users.service';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable */
import { Component, EventEmitter, Input, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { FormControl, Validators, FormGroup, FormBuilder } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Client } from 'app/core/interface/client.interface';
import { ClientsService } from 'app/core/services/clients.service';
import { User } from 'app/core/user/user.types';
import { Observable, ReplaySubject, Subject } from 'rxjs';
import { distinctUntilChanged, debounceTime, startWith, switchMap, tap, map, filter, takeUntil, take } from 'rxjs/operators';
import { CreateClientModalService } from '../create-client-modal/create-client-modal.service';
import { MatSelect } from '@angular/material/select';
import { uniqBy } from 'lodash-es';

@Component({
  selector: 'app-user-select',
  templateUrl: './user-select.component.html',
  styleUrls: ['./user-select.component.scss']
})
export class UserSelectComponent implements OnInit {

  @Output() userSelected: EventEmitter<any> = new EventEmitter();
  @Input() form: FormGroup;
  @Input() label: string;
  @Input() filter_by_branches: string[] = [];
  @Input() roles: string[] = [];
  @Input() required: boolean;
  @Input() controlName: string;
  @Input() data: User;

  searching = false;
  userControl: FormControl;
  filterCtrl: FormControl = new FormControl();
  users$: ReplaySubject<User[]> = new ReplaySubject<User[]>(1);
  users: User[] = [];
  private _unsubscribeAll: Subject<any> = new Subject<any>();

  constructor(
    private _usersService: UsersService,
    private _formBuilder: FormBuilder,

  ) { }

  ngOnInit(): void {
    if (this.required) {
      this.userControl = new FormControl('', [Validators.required]);
    } else {
      this.userControl = new FormControl('', []);
    }

    this.searchProcessor();
    // this.onSelectEmitProcessor();
    this.loadInitial();
    this.usersSubscriber();

    if (this.form) {
      this.form.addControl(this.controlName, this.userControl);
      this.form.updateValueAndValidity()
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

  clear(event) {
    event.stopPropagation();
  }
  compareById(item1, item2) {
    return item1.id == item2.id
  }

  ngOnChanges(changes: SimpleChanges): void {
    //Called before any other lifecycle hook. Use it to inject dependencies, but avoid any serious work here.
    //Add '${implements OnChanges}' to the class.
    if (changes['data'] && changes['data'].currentValue != null && changes['data'].currentValue != '') {
      const data = changes['data'].currentValue;
      this.userControl.patchValue(data, { emitEvent: false });
      const users = this.uniqRecords(this.users);
      this.users$.next(users);
    }
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
        tap(() => console.log(this.filter_by_branches, this.roles)),
        takeUntil(this._unsubscribeAll),
        debounceTime(600),
        switchMap(() => this._usersService.getUsers(1, 100, this.filterCtrl.value, 'first_name', false, this.filter_by_branches, this.roles)),
      )
      .subscribe(data => {
        this.searching = false;
        const records = this.uniqRecords(data.data);
        this.users$.next(records);
      },
        error => {
          // no errors in our simulated example
          this.searching = false;
          // handle error...
        });
  }

  private onSelectEmitProcessor() {
    this.userControl.valueChanges
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(v => !!v)
      )
      .subscribe(e => {
        this.form.controls[this.controlName].setValue(e)
      })
  }

  loadInitial() {
    this._usersService
      .getUsers(1, 5, '', 'name', false, this.filter_by_branches, this.roles)
      .pipe(
        takeUntil(this._unsubscribeAll),
      )
      .subscribe((data) => {
        const users = this.uniqRecords(data.data);
        this.users$.next(users);
      })
  }

  usersSubscriber() {
    this.users$
      .pipe(
        takeUntil(this._unsubscribeAll),
      )
      .subscribe(data => this.users = Object.assign([], data))
  }

  // @ Fix issue: the selected option disappear bcs select-options input can't find the record in options
  // @ solution : always append the selected item to branches list
  private uniqRecords(array: User[]) {
    const branches: User[] = uniqBy([...array, ...[this.data]], 'id');
    return branches;
  }
}
