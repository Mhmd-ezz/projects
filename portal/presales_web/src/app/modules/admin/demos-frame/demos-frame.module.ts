import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DemosFrameRoutingModule } from './demos-frame-routing.module';
import { DemosFrameComponent } from './demos-frame.component';


@NgModule({
  declarations: [
    DemosFrameComponent
  ],
  imports: [
    CommonModule,
    DemosFrameRoutingModule
  ]
})
export class DemosFrameModule { }
