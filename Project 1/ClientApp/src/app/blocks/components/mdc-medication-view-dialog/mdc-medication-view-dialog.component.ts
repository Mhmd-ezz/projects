import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MedicationBase } from 'app/blocks/graphql/generated/bases';

@Component({
  selector: 'mdc-medication-view-dialog',
  templateUrl: './mdc-medication-view-dialog.component.html',
  styleUrls: ['./mdc-medication-view-dialog.component.scss']
})
export class MdcMedicationViewDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<MdcMedicationViewDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public medication: MedicationBase,
  ) { }

  ngOnInit() {
  }

  onCloseClick() {
      this.dialogRef.close();
  }

}
