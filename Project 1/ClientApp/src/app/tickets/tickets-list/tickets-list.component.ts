import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { TicketsParams } from '@appStore/model/tickets-params';
import { AppState } from '@appStore/reducers';
import { Store } from '@ngrx/store';
import { merge, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, filter, map, skip, takeUntil, tap } from 'rxjs/operators';
import * as fromTicketsActions from '@appStore/actions';
import { onEventTicketSelector, ticketsSelector } from '@appStore/selectors';
import { Ticket } from 'app/blocks/graphql/generated/gqlServices';
import {TicketStatus} from 'app/blocks/enum/ticket-status';
import { AppUtils } from 'app/blocks/utils';

import * as fromSelectors from '@appStore/selectors';
import { subscriptionEventEnum } from 'app/blocks/enum/subscription-events.enum';
@Component({
  selector: 'app-tickets-list',
  templateUrl: './tickets-list.component.html',
  styleUrls: ['./tickets-list.component.scss']
})
export class TicketsListComponent implements OnInit {

  // Private
  private _unsubscribeAll: Subject<any>;


  @ViewChild(MatSort, { static: true }) sort: MatSort;
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;
  tenantId: string;
  public dataSource = new MatTableDataSource<Ticket>([]);
  public displayedColumns = ['ticketId', 'subject', 'status','ticketDate', 'action','notification'];
  public pageSizeOptions = [10, 20, 40];
  public search = new FormControl('');
  ticketStatus: TicketStatus;
  public total:number;
  //Modify: string[];

  constructor(
    private _store: Store<AppState>,
  ) { 
    // Set the private defaults
    this._unsubscribeAll = new Subject();
    this.ticketStatus = TicketStatus.status;
    //this.Modify = [];
  }

  ngOnInit(): void {   
   
    this._store.select(ticketsSelector)
    .pipe(takeUntil(this._unsubscribeAll))
    .subscribe((data) => {
      //console.log('Tickets data',data)
        this.dataSource.data = data.items;
        this.total=data.ticketsTotal;
    })
    this._store.select(onEventTicketSelector)
    .pipe( skip(1), // @ skip the first emit, which is emited by default using ngrx initial state 
    takeUntil(this._unsubscribeAll),
    filter(data => !!data))
    .subscribe((data) => {
      if (data.ticketEvent.event == subscriptionEventEnum.ticket_updated)
        this.updatedTicketEvent(data.ticketEvent);
        
    })
  }

  
  ngAfterViewInit(): void {

    this.loadPage();
    this.watchSearch();
    //this.subscribeToTickets();

    // @ on sort change update pageindex to 0
    this.sort.sortChange.subscribe((sort) => {
        this.paginator.pageIndex = 0;
    });

    merge(this.paginator.page, this.sort.sortChange)
        .pipe(tap(() => this.loadPage()))
        .subscribe();
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
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    private updatedTicketEvent(data) {
      // let updatedTicket = data.content;
      // if (!updatedTicket) return;
      // const index= this.Modify.findIndex(id => id === updatedTicket.ticketNumber);
      // if(index<0)
      // this.Modify.push(updatedTicket.ticketNumber);    
     

  }
    private updateTicketStatus(ticketId: string, ticketStatus: number) {

    const ticket = AppUtils.DeepClone(this.dataSource.data.find(item => {
      return item.id === ticketId;
    }));
    ticket.status = ticketStatus;
    this._store.dispatch(fromTicketsActions.updateTicket({ ticket: ticket ,broadcast:true}))
  }

    private loadPage() {

      const variables: TicketsParams = {
          page: this.paginator.pageIndex + 1,
          filter: this.search.value,
          sortBy: this.sort?.active,
          descending: (typeof this.sort.direction === 'string' && this.sort.direction === 'desc') ? true : false,
          size: this.paginator.pageSize
      };
console.log('load',variables)
      this._store.dispatch(fromTicketsActions.loadTickets({ variables }));
  }

  private watchSearch() {

      this.search
          .valueChanges
          .pipe(
              debounceTime(600),
              distinctUntilChanged(),
              tap((value: any) => {
                  console.log(value);
                  this.loadPage();
              })).subscribe();
  }
 // stopAlert(id): void {
   // this.Modify = this.Modify.filter(order => order !== id);
   
//}
}
