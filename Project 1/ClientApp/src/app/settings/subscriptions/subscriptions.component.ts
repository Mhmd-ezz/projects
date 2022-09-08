import { Component, OnInit } from '@angular/core';
import { fuseAnimations } from '@fuse/animations';

@Component({
  selector: 'subscriptions',
  templateUrl: './subscriptions.component.html',
  styleUrls: ['./subscriptions.component.scss'],
  animations   : fuseAnimations
})
export class SubscriptionsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
