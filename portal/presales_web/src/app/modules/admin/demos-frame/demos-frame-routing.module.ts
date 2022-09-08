import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DemosFrameComponent } from './demos-frame.component';

const routes: Routes = [
  {
    path: '',
    component: DemosFrameComponent,
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DemosFrameRoutingModule { }
