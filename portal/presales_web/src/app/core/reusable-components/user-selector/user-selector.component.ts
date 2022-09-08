import { UsersService } from './../../services/users.service';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Client } from 'app/core/interface/client.interface';
import { ClientsService } from 'app/core/services/clients.service';
import { User } from 'app/core/user/user.types';
import { Observable } from 'rxjs';
import { distinctUntilChanged, debounceTime, startWith, switchMap, tap, map, filter } from 'rxjs/operators';
import { CreateClientModalService } from '../create-client-modal/create-client-modal.service';

@Component({
  selector: 'app-user-selector',
  templateUrl: './user-selector.component.html',
  styleUrls: ['./user-selector.component.scss']
})
export class UserSelectorComponent implements OnInit {


  @Output() userSelected: EventEmitter<any> = new EventEmitter();
  @Input() form: any;
  @Input() usersRoles: string[] = [];

  filteredOptions: Observable<User[]>;
  clientsLoading = false;
  clientControl = new FormControl('', [Validators.required]);
  // clientControl = new FormControl('');

  constructor(
    private _clientsService: ClientsService,
    private _usersService: UsersService,
    private _createClientModalService: CreateClientModalService,
  ) { }

  ngOnInit(): void {
    this.initFilter();

    if (this.form) {
      this.form.addControl('user', this.clientControl);
    }
  }

  //--------------------------------------------------
  // Public Method
  //--------------------------------------------------

  onUserSelected(event: MatAutocompleteSelectedEvent) {
    this.userSelected.emit(event.option.value);
  }

  displayFn(user: User): string {
    return user && user?.name ? `${user?.name} - ${user?.role_list[0]}  ${user?.branch?.name ? ' - '+user?.branch?.name : ''}` : '';
  }

  //--------------------------------------------------
  // Private Method
  //--------------------------------------------------
  private initFilter() {

    this.filteredOptions = this.clientControl
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(600),
        tap((e) => !e ? this.userSelected.emit(null) : null),
        filter((e) => (typeof e === 'string')),
        tap(() => this.clientsLoading = true),
        startWith(''),
        switchMap(text =>
          this._usersService.getUsers(1, 5, text, 'first_name', false, null, this.usersRoles)
            .pipe(
              tap(() => this.clientsLoading = false),
              tap((e) => console.log(e)
              ),
              map(response => response.data),
            ))
      )
  }

}
