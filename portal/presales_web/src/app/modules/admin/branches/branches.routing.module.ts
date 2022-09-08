import { BranchesComponent } from './branches.component';
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: BranchesComponent,
    children: [
      {
        path: '',
        component: ListComponent,
        data: {}
      },
      {
        path: 'edit/:id',
        component: EditComponent,
        data: {}
      },
      {
        path: 'new',
        component: NewComponent,
        data: {}
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BranchesRoutingModule { }
