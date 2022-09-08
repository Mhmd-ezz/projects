import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { fuseAnimations } from '@fuse/animations';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';
import { EventActionTypesEnum } from 'app/blocks/enum/event-action-types.enum';
import { RotaBase } from 'app/blocks/graphql/generated/bases';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';
import { Subject ,  BehaviorSubject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { RotaFormDialogComponent } from './rota-form-dialog/rota-form-dialog.component';
import { RotaService } from './rota.service';
const dcopy = require('deep-copy');

@Component({
    selector: 'app-rota',
    templateUrl: './rota.component.html',
    styleUrls: ['./rota.component.scss'],
    animations: fuseAnimations,
    changeDetection: ChangeDetectionStrategy.OnPush,

})
export class RotaComponent implements OnInit {


    // Private
    private _unsubscribeAll: Subject<any>;
    public rota$ = new BehaviorSubject<RotaBase[]>([]);
    public rota: RotaBase[] = [];
    public rota2: RotaBase[] = [];


    constructor(
        private _dialog: MatDialog,
        private _bottomSheet: MatBottomSheet,
        private _rotaService: RotaService,
    ) {
        this._unsubscribeAll = new Subject();

        this._rotaService.getAllRota();
    }


    ngOnInit() {


        this._rotaService.allRota$
            .pipe(
                takeUntil(this._unsubscribeAll))
            .subscribe(data => {
                this.rota$.next(data);
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

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------
    add() {

        const dialogRef = this._dialog.open(RotaFormDialogComponent, {
            disableClose: true,
            height: '90vh',
            // minWidth: '320px',
            data: null,
        });

        // @ Exit On escape keydown
        dialogRef.keydownEvents().subscribe((keyboardEvent: KeyboardEvent) => {
            if (keyboardEvent && keyboardEvent.which === 27) {
                this.confirmDialogClose(dialogRef);
            }
        });

        dialogRef.afterClosed()
            .subscribe(data => {

                if (typeof data === 'undefined') { return; }

                if (data.rota && data.actionType === EventActionTypesEnum.edit) {
                    this._rotaService.update(data.rota);
                }

                if (data.rota && data.actionType === EventActionTypesEnum.new) {
                    this._rotaService.add(data.rota);
                }
            });
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------


    /**
      * @Description Confirm if appointment dialog should be closed
      * 
      * @private
      * @param {MatDialogRef<any, any>} dialog 
      * 
      * @memberOf AppScheduleComponent
      */
    private confirmDialogClose(dialog: MatDialogRef<any, any>) {

        const args: ConfirmActionSheetArgs = {
            yes: 'Exit and discard changes',
            no: 'Don\'t exit'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                dialog.close(null);
            }
        });
    }

}
