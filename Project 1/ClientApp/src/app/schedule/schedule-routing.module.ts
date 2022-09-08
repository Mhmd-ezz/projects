import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppScheduleComponent } from './schedule.component';

const routes: Routes = [
    {
        path: '',
        component: AppScheduleComponent,
        data: { breadcrumb: 'Schedule' },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ScheduleRoutingModule { }
