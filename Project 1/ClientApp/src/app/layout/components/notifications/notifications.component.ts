import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnDestroy, OnInit, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { TemplatePortal } from '@angular/cdk/portal';
import { MatButton } from '@angular/material/button';
import { Subject } from 'rxjs';
import { filter, skip, takeUntil } from 'rxjs/operators';
import { onEventTicketSelector } from 'app/store/selectors';
import { AppState } from 'app/store/reducers';
import { Store } from '@ngrx/store';

@Component({
    selector       : 'notifications',
    templateUrl    : './notifications.component.html',
    styleUrls: ['./notifications.component.scss'],
    encapsulation  : ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush,
    exportAs       : 'notifications'
})
export class NotificationsComponent implements OnInit, OnDestroy
{
    @ViewChild('notificationsOrigin') private _notificationsOrigin: MatButton;
    @ViewChild('notificationsPanel') private _notificationsPanel: TemplateRef<any>;

    notifications: any[];
    unreadCount: number = 0;
    private _overlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _changeDetectorRef: ChangeDetectorRef,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef,        
        private _store: Store<AppState>,
    )
    {
        this.notifications=[];
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void
    {
        // // Subscribe to notification changes
        // this._notificationsService.notifications$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((notifications: Notification[]) => {

        //         // Load the notifications
        //         this.notifications = notifications;

        //         // Calculate the unread count
        //         this._calculateUnreadCount();

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

            this._store.select(onEventTicketSelector)
            .pipe(
            takeUntil(this._unsubscribeAll),
            filter(data => !!data))
            .subscribe((data) => {
                console.log('notification',data)
                const index= this.notifications.findIndex(ticket => ticket.content.ticketNumber === data.ticketEvent.content.ticketNumber);
                if(index<0)
               this.notifications.push(data.ticketEvent);
               else
               this.notifications[index]=data.ticketEvent;
                        // Mark for check
              this._changeDetectorRef.markForCheck();

                       // Calculate the unread count
                this._calculateUnreadCount();
          
            })
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void
    {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if ( this._overlayRef )
        {
            this._overlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Open the notifications panel
     */
    openPanel(): void
    {
        // Return if the notifications panel or its origin is not defined
        if ( !this._notificationsPanel || !this._notificationsOrigin )
        {
            return;
        }

        // Create the overlay if it doesn't exist
        if ( !this._overlayRef )
        {
            this._createOverlay();
        }

        // Attach the portal to the overlay
        this._overlayRef.attach(new TemplatePortal(this._notificationsPanel, this._viewContainerRef));
    }

    /**
     * Close the messages panel
     */
    closePanel(): void
    {
        this._overlayRef.detach();
    }

    /**
     * Mark all notifications as read
     */
    markAllAsRead(): void
    {
        // Mark all as read
       //this._notificationsService.markAllAsRead().subscribe();
    }

    /**
     * Toggle read status of the given notification
     */
    toggleRead(notification: Notification): void
    {
        // Toggle the read status
       // notification.read = !notification.read;

        // Update the notification
       // this._notificationsService.update(notification.id, notification).subscribe();
    }

    /**
     * Delete the given notification
     */
    delete(notification): void
    {
        // Delete the notification
        //this._notificationsService.delete(notification.id).subscribe();
        const index= this.notifications.findIndex(ticket => ticket.content.ticketNumber === notification.content.ticketNumber);
      
                if(index!==-1)
               this.notifications.splice(index,1);
               // Mark for check
              this._changeDetectorRef.markForCheck();

              // Calculate the unread count
       this._calculateUnreadCount();
       //if(close===0)
       //this.closePanel();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any
    {
        return item.id || index;
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Create the overlay
     */
    private _createOverlay(): void
    {
        // Create the overlay
        this._overlayRef = this._overlay.create({
            hasBackdrop     : true,
            backdropClass   : 'fuse-backdrop-on-mobile',
            scrollStrategy  : this._overlay.scrollStrategies.block(),
            positionStrategy: this._overlay.position()
                                  .flexibleConnectedTo(this._notificationsOrigin._elementRef.nativeElement)
                                  .withLockedPosition(true)
                                  .withPush(true)
                                  .withPositions([
                                      {
                                          originX : 'start',
                                          originY : 'bottom',
                                          overlayX: 'start',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'start',
                                          originY : 'top',
                                          overlayX: 'start',
                                          overlayY: 'bottom'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'bottom',
                                          overlayX: 'end',
                                          overlayY: 'top'
                                      },
                                      {
                                          originX : 'end',
                                          originY : 'top',
                                          overlayX: 'end',
                                          overlayY: 'bottom'
                                      }
                                  ])
        });

        // Detach the overlay from the portal on backdrop click
        this._overlayRef.backdropClick().subscribe(() => {
            this._overlayRef.detach();
        });
    }

    /**
     * Calculate the unread count
     *
     * @private
     */
    private _calculateUnreadCount(): void
    {
        let count = 0;

        if ( this.notifications && this.notifications.length )
        {
            //count = this.notifications.filter(notification => !notification.read).length;
             count = this.notifications.length;
        }

        this.unreadCount = count;
    }
}
