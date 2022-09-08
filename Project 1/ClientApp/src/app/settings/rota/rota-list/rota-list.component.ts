import { ChangeDetectionStrategy, Component, Input, OnInit } from '@angular/core';
import { MatBottomSheet} from '@angular/material/bottom-sheet';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ConfirmActionSheetComponent } from 'app/blocks/components/confirm-action-sheet/confirm-action-sheet.component';
import { EventActionTypesEnum } from 'app/blocks/enum/event-action-types.enum';
import { RotaBase } from 'app/blocks/graphql/generated/bases';
import { ConfirmActionSheetArgs } from 'app/blocks/interface/confirm-action-sheet-args';

import { DeleteRotaGQL } from './../../../blocks/graphql/generated/gqlServices';
import { RotaFormDialogComponent } from './../rota-form-dialog/rota-form-dialog.component';
import { RotaService } from './../rota.service';

@Component({
    selector: 'app-rota-list',
    templateUrl: './rota-list.component.html',
    styleUrls: ['./rota-list.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class RotaListComponent implements OnInit {

    @Input() data: RotaBase;
    EventActionTypesEnum = EventActionTypesEnum;


    constructor(
        private _dialog: MatDialog,
        private _bottomSheet: MatBottomSheet,
        private _rotaService: RotaService,
        private _deleteRotaGQL: DeleteRotaGQL
    ) {
    }

    ngOnInit() {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------


    onEdit(data: RotaBase) {

        const dialogRef = this._dialog.open(RotaFormDialogComponent, {
            disableClose: true,
            height: '90vh',
            // minWidth: '320px',
            data: data,
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

    onDelete(rota: RotaBase) {
        this.confirmDeleteRota(rota);
    }


    // -----------------------------------------------------------------------------------------------------
    // @ Private methods
    // -----------------------------------------------------------------------------------------------------
    deleteRotaProcessor(id: string) {

        this._deleteRotaGQL
            .mutate({ id })
            .subscribe(({ data }) => {
                if (data && data.deleteRota) {
                    this._rotaService.delete(data.deleteRota);
                }
            });
    }

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

    /**
     * 
     * 
     * @private
     * 
     * @memberOf RotaListComponent
     */
    private confirmDeleteRota(rota: RotaBase) {

        const args: ConfirmActionSheetArgs = {
            yes: 'I want to delete',
            no: 'Don\'t delete'
        };
        const Confirmsheet = this._bottomSheet.open(ConfirmActionSheetComponent, {
            data: args,
            disableClose: true
        });

        Confirmsheet.afterDismissed().subscribe(result => {
            if (result) {
                this.deleteRotaProcessor(rota.id);
            }
        });
    }

}
