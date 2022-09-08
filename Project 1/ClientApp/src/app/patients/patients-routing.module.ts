import { CardiologyFollowupFormComponent } from './patient/cardiology/cardiology-followup-form/cardiology-followup-form.component';
import { CardiologyConditionFormComponent } from './patient/cardiology/cardiology-condtion-form/cardiology-condtion-form.component';
import { SpecialityRedirectGuard } from './../blocks/guards/speciality-router-guard.service';
import { MediaComponent } from './patient/media/media.component';
import { EditPatientComponent } from './patient/edit-patient/edit-patient.component';
import { EditPatientCardiologyComponent } from './patient/edit-patient-cardiology/edit-patient-cardiology.component';
import { EditOperationComponent } from './patient/general/edit-operation/edit-operation.component';
import { EditFollowupComponent } from './patient/general/edit-followup/edit-followup.component';
import { EditConditionComponent } from './patient/general/edit-condition/edit-condition.component';
import { NewOperationComponent } from './patient/general/new-operation/new-operation.component';
import { NewFollowupComponent } from './patient/general/new-followup/new-followup.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientsComponent } from './patients.component';
import { PatientComponent } from './patient/patient.component';
import { PatientsListComponent } from './patients-list/patients-list.component';
import { GeneralConditionsComponent } from './patient/general/conditions/conditions.component';
import { GeneralMainComponent } from './patient/general/main.component';
import { NewConditionComponent } from './patient/general/new-condition/new-condition.component';
import { NewPatientComponent } from './patient/new-patient/new-patient.component';
import { NewPatientCardiologyComponent } from './patient/new-patient-cardiology/new-patient-cardiology.component';
import { CardiologyConditionsComponent } from './patient/cardiology/conditions/conditions.component';
import { CardiologyEditOperationComponent } from './patient/cardiology/edit-operation/edit-operation.component';
import { CardiologyNewOperationComponent } from './patient/cardiology/new-operation/new-operation.component';
import { CardiologyMainComponent } from './patient/cardiology/cardiology-main.component';
import { EditTodoComponent } from 'app/todos/edit-todo/edit-todo.component';
import { NewTodoComponent } from 'app/todos/new-todo/new-todo.component';
import { TodoListComponent } from 'app/todos/todo-list/todo-list.component';
import { TodosComponent } from 'app/todos/todos.component';
import { AllMediaComponent } from './patient/all-media/all-media.component';

const routes: Routes = [
    {
        path: '',
        component: PatientsComponent,
        data: { breadcrumb: 'Patients' },  
          
        children: [
            {
                path: '',
                component: PatientsListComponent,
                data: { breadcrumb: 'Patients' },
            },
            {
                path: 'new-patient',
                component: NewPatientComponent,
                data: { breadcrumb: 'New Patient' }
            },
            {
                path: 'new-patient-cardiology',
                component: NewPatientCardiologyComponent,
                data: { breadcrumb: 'New Patient Cardiology' }
            },
            {
                path: ':id',
                component: PatientComponent,
                data: { breadcrumb: 'patient' },
                canActivate: [SpecialityRedirectGuard],
                children: [
                    {
                        path: '',
                        redirectTo: 'general',
                        pathMatch: 'full'
                    },
                    {
                        path: 'edit',
                        component: EditPatientComponent,
                        data: { breadcrumb: 'Edit Personal Info' }
                    },
                    {
                        path: 'editCardio',
                        component: EditPatientCardiologyComponent,
                        data: { breadcrumb: 'Edit Personal Info' }
                    },
                    {
                        path: 'media',
                        component: MediaComponent,
                        data: { breadcrumb: 'Media' }
                    },
                    {
                        path: 'all-media',
                        component: AllMediaComponent,
                        data: { breadcrumb: 'allMedia' }
                    },
                    {
                        path: 'general',
                        component: GeneralMainComponent,
                        data: { breadcrumb: 'General' },
                        children: [
                            {
                                path: '',
                                component: GeneralConditionsComponent,
                                data: { breadcrumb: 'General' },
                            },
                            {
                                path: 'new-condition',
                                component: NewConditionComponent,
                                data: { breadcrumb: 'New Condition' },
                            },
                            {
                                path: 'edit-condition/:id',
                                component: EditConditionComponent,
                                data: { breadcrumb: 'Edit Condition' },
                            },
                            {
                                path: 'new-followup',
                                component: NewFollowupComponent,
                                data: { breadcrumb: 'New Followup' },
                            },
                            {
                                // @ QueryParams ConditionId and patientId
                                path: 'edit-followup/:id',
                                component: EditFollowupComponent,
                                data: { breadcrumb: 'Edit Followup' },
                            },
                            {
                                path: 'new-operation',
                                component: NewOperationComponent,
                                data: { breadcrumb: 'New Operation' },
                            },
                            {
                                // @ QueryParams ConditionId and patientId
                                path: 'edit-operation/:id',
                                component: EditOperationComponent,
                                data: { breadcrumb: 'Edit operation' },
                            },
                        ]
                    },
                    {
                        path: 'cardiology',
                        component: CardiologyMainComponent,
                        data: { breadcrumb: 'Cardiology' },
                        children: [
                            {
                                path: '',
                                component: CardiologyConditionsComponent,
                                data: { breadcrumb: 'Cardiology' },
                            },
                            {
                                path: 'new-condition',
                                component: CardiologyConditionFormComponent,
                                data: { breadcrumb: 'New Condition' },
                            },
                            {
                                path: 'edit-condition/:id',
                                component: CardiologyConditionFormComponent,
                                data: { breadcrumb: 'Edit Condition' },
                            },
                            {
                                path: 'new-followup',
                                component: CardiologyFollowupFormComponent,
                                data: { breadcrumb: 'New Followup' },
                            },
                            {
                                // @ QueryParams ConditionId and patientId
                                path: 'edit-followup/:id',
                                component: CardiologyFollowupFormComponent,
                                data: { breadcrumb: 'Edit Followup' },
                            },
                            {
                                path: 'new-operation',
                                component: CardiologyNewOperationComponent,
                                data: { breadcrumb: 'New Operation' },
                            },
                            {
                                // @ QueryParams ConditionId and patientId
                                path: 'edit-operation/:id',
                                component: CardiologyEditOperationComponent,
                                data: { breadcrumb: 'Edit operation' },
                            },
                        ]
                    },
                    {
                        path: 'todos',
                        component: TodosComponent,
                        data: { breadcrumb: 'Todos' },
                        children: [
                            {
                                path: '',
                                component: TodoListComponent,
                                data: { breadcrumb: 'Todos' }
                            },
                            {
                                path: 'new-todo',
                                component: NewTodoComponent,
                                data: { breadcrumb: 'New Todo' }
                            },
                            {
                                path: 'edit-todo/:id',
                                component: EditTodoComponent,
                                data: { breadcrumb: 'Edit Todo' }
                            },
                        ]
                    }
                ]
            },
        ]
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class PatientsRoutingModule { }
