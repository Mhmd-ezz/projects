import { ViewComponent } from './view/view.component';
import { ManageComponent } from './manage/manage.component';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { NewComponent } from './new/new.component';
import { EditComponent } from './edit/edit.component';
import { ListComponent } from './list/list.component';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { OpportunitiesComponent } from './opportunities.component';

const routes: Routes = [
  {
    path: '',
    component: OpportunitiesComponent,
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
        path: 'view/:id',
        component: ViewComponent,
        data: {}
      },
      {
        path: 'tasks/:opportunity-id',
        // component: ManageComponent,
        loadChildren: () => import('app/modules/admin/opportunities/tasks/tasks.module').then(m => m.TasksModule),
        data: {}
      },
      {
        path: 'manage/:id',
        component: ManageComponent,
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
export class OpportunitiesRoutingModule { }
