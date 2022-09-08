import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { EditTodoComponent } from "./edit-todo/edit-todo.component";
import { NewTodoComponent } from "./new-todo/new-todo.component";
import { TodoListComponent } from "./todo-list/todo-list.component";
import { TodosComponent } from "./todos.component";

const routes: Routes = [
    {
        path: '',
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
    },
    {
        path: '**',
        redirectTo: ''
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class TodosRoutingModule { }