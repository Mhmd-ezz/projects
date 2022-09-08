import { NgModule } from '@angular/core';
import { NgxDnDModule } from '@swimlane/ngx-dnd';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseSidebarModule } from '@fuse/components';

import { TodosComponent } from './todos.component';
import { TodoListComponent } from './todo-list/todo-list.component';
import { SharedUIModule } from 'app/blocks/common/shared-ui.module';
import { NewTodoComponent } from './new-todo/new-todo.component';
import { EditTodoComponent } from './edit-todo/edit-todo.component';
import { SharedMaterialModule } from 'app/blocks/common/shared-material.module';
import { DeleteTodoSheetComponent } from './todo-list/delete-todo.component';
import { TodosRoutingModule } from './todos-routing.module';


@NgModule({
    declarations: [
        TodosComponent,
        TodoListComponent,
        NewTodoComponent,
        EditTodoComponent,
        DeleteTodoSheetComponent
    ],
    imports: [
        SharedUIModule,
        SharedMaterialModule,

        TodosRoutingModule,

        NgxDnDModule,

        FuseSharedModule,
        FuseSidebarModule
    ]
})
export class TodosModule {
}
