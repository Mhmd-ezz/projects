import { Validators } from '@angular/forms';
/* eslint-disable */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Client } from 'app/core/interface/client.interface';
import { ClientsService } from 'app/core/services/clients.service';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { CreateClientModalService } from '../create-client-modal/create-client-modal.service';

@Component({
  selector: 'app-client-selector',
  templateUrl: './client-selector.component.html',
  styleUrls: ['./client-selector.component.scss']
})
export class ClientSelectorComponent implements OnInit {

  @Output() userSelected: EventEmitter<any> = new EventEmitter();
  @Input() form: any;

  filteredOptions: Observable<Client[]>;
  clientsLoading = false;
  clientControl = new FormControl('', [Validators.required]);
  // clientControl = new FormControl('');

  constructor(
    private _clientsService: ClientsService,
    private _createClientModalService: CreateClientModalService,
  ) { }

  ngOnInit(): void {
    this.initFilter();

    if (this.form) {
      this.form.addControl("client", this.clientControl);
    }

  }

  //--------------------------------------------------
  // Public Method
  //--------------------------------------------------

  createClient(): void {
    const dialog = this._createClientModalService.openDialog();
    dialog.afterClosed()
      .subscribe((client: Client) => {
        this.clientControl.setValue(client);
        this.userSelected.emit(client);
      });
  }

  onClientSelected(event: MatAutocompleteSelectedEvent) {
    this.userSelected.emit(event.option.value);
  }



  displayFn(client: Client): string {
    return client && client.name ? `${client.name} - ${client.abbreviation}` : '';
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
          this._clientsService.getClients(0, 5, text, 'name', false)
            .pipe(
              tap(() => this.clientsLoading = false),
              map(response => response.data),
            ))
      )
  }

}
