import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'mdc-form-group',
  templateUrl: './mdc-form-group.component.html',
  styleUrls: ['./mdc-form-group.component.scss']
})
export class MdcFormGroupComponent implements OnInit {
  showBack: boolean;
  
  @Input('containImages') containImages : boolean ;

  constructor() { }

  ngOnInit() {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Toggle source view
   */
  toggleSourceView(): void {
    this.showBack = !this.showBack;
  }

}
