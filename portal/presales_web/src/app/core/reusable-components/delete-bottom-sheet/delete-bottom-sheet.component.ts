import { Component, Inject, OnInit } from '@angular/core';
import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';

@Component({
  selector: 'app-delete-bottom-sheet',
  templateUrl: './delete-bottom-sheet.component.html',
  styleUrls: ['./delete-bottom-sheet.component.scss']
})
export class DeleteBottomSheetComponent implements OnInit {

  constructor(
    private _bottomSheetRef: MatBottomSheetRef<DeleteBottomSheetComponent>,
    @Inject(MAT_BOTTOM_SHEET_DATA) public data: any
    ) { }

  ngOnInit(): void {
  }

  openLink(event: MouseEvent): void {
    this._bottomSheetRef.dismiss();
    event.preventDefault();
  }
  yes(): void {
    this._bottomSheetRef.dismiss(true);
    event.preventDefault();
  }

  no(): void {
    this._bottomSheetRef.dismiss(false);
    event.preventDefault();
  }
}
