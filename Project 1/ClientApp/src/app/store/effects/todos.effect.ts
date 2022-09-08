import { Injectable } from "@angular/core";
import { Actions, Effect, ofType } from "@ngrx/effects";
import { createTodoGqlCallback } from "app/blocks/graphql/callback/createTodoGqlCallback";
import { deleteTodoGqlCallback } from "app/blocks/graphql/callback/deleteTodoGqlCallback";
import { updateTodoGqlCallback } from "app/blocks/graphql/callback/updateTodoGqlCallback";
import { TodosGQL, DeleteTodoGQL, TodosTotalGQL, TodoInput, CreateTodoGQL, UpdateTodoGQL, TodoGQL } from "app/blocks/graphql/generated/gqlServices";
import { data } from "app/dashboard/data";
import { map, switchMap } from "rxjs/operators";

import * as fromTodosActions from '../actions/todos.action';
@Injectable()
export class TodosEffects {

    constructor(
        private actions$: Actions,
        private _todosGQL: TodosGQL,
        private _todoGQL: TodoGQL,
        private _createTodoGQL: CreateTodoGQL,
        private _updateTodoGQL: UpdateTodoGQL,
        private _deleteTodoGQL: DeleteTodoGQL,
        private _todosTotalGQL: TodosTotalGQL,
    ) {

    }

    @Effect()
    loadTodos$ = this.actions$.pipe(
        ofType(fromTodosActions.loadAllTodos),
        switchMap((data) => this._todosGQL.watch({
            filter: data.filter,
            page: data.page,
            size: data.size,
            patientId: data.patientId
        },
            data.options)
            .valueChanges),
        map(({ data, errors, loading }) => {

            const todos = data && data.todos ? data.todos : [];
            if (errors) {
                return fromTodosActions.loadAllTodosFailure({ error: errors });
            }

            if (loading) {
                return fromTodosActions.loadAllTodosSuccess({ todos: todos, fromServer: false });
            } else {
                return fromTodosActions.loadAllTodosSuccess({ todos: todos, fromServer: true });
            }

        })

    );

    @Effect()
    loadTodosTotal$ = this.actions$.pipe(
        ofType(fromTodosActions.loadAllTodosTotal),
        switchMap((data) => this._todosTotalGQL.watch({
            filter: data.filter,
            page: data.page,
            size: data.size,
            patientId: data.patientId
        },
            data.options)
            .valueChanges),
        map(({ data, errors, loading }) => {

            const total = data && data.todosTotal ? data.todosTotal : 0;

            if (errors) {
                return fromTodosActions.loadAllTodosFailure({ error: errors });
            }

            if (loading) {
                return fromTodosActions.loadAllTodosTotalSuccess({ total, fromServer: false });
            }
            else {
                return fromTodosActions.loadAllTodosTotalSuccess({ total, fromServer: true });
            }
        })
    );

    @Effect()
    loadTodo$ = this.actions$.pipe(
        ofType(fromTodosActions.loadTodo),
        switchMap((data) => this._todoGQL.watch({ id: data.id }).valueChanges),
        map(({ data, errors, loading }) => {

            const todo = data && data.todo ? data.todo : null;

            if (errors) {
                return fromTodosActions.loadTodoFailure({ error: errors });
            }

            if (loading) {
                return fromTodosActions.loadTodoSuccess({ todo, fromServer: false });
            }
            else {
                return fromTodosActions.loadTodoSuccess({ todo, fromServer: true });
            }
        })
    );

    @Effect()
    createTodo$ = this.actions$.pipe(
        ofType(fromTodosActions.createTodo),
        switchMap((data) => this._createTodoGQL.mutate({ todo: data.todo as TodoInput },
            {
                optimisticResponse: createTodoGqlCallback.optimisticResponse(data.todo),
                update: (proxy, ev) => createTodoGqlCallback.update(proxy, ev)
            }
        )),
        map((data) => {

            const todo = data && data.data && data.data.createTodo ? data.data.createTodo : null;

            if (data['dataPresent']) {
                return fromTodosActions.todoSavedLocally();
            }

            if (data.errors) {
                return fromTodosActions.createTodoFailure({ error: data.errors });
            }

            return fromTodosActions.createTodoSuccess({ todo });
        })
    );

    @Effect()
    updateTodo$ = this.actions$.pipe(
        ofType(fromTodosActions.updateTodo),
        switchMap((data) => this._updateTodoGQL.mutate({ todo: data.todo as TodoInput },
            {
                optimisticResponse: updateTodoGqlCallback.optimisticResponse(data.todo),
                update: (proxy, ev) => updateTodoGqlCallback.update(proxy, ev)
            }

        )),
        map((data) => {

            const todo = data && data.data && data.data.updateTodo ? data.data.updateTodo : null;
            if (data['dataPresent']) {
                return fromTodosActions.todoSavedLocally();
            }

            if (data.errors) {
                return fromTodosActions.updateTodoFailure({ error: data.errors });
            }

            return fromTodosActions.updateTodoSuccess({ todo });
        })
    );

    @Effect()
    deleteTodo$ = this.actions$.pipe(
        ofType(fromTodosActions.deleteTodo),
        switchMap((data) => this._deleteTodoGQL.mutate({ id: data.id },
            {
                optimisticResponse: deleteTodoGqlCallback.optimisticResponse(data.id),
                update: (proxy, ev) => deleteTodoGqlCallback.update(proxy, ev)
            }
        )),
        map((data) => {
            const todo = data && data.data && data.data.deleteTodo ? data.data.deleteTodo : null;

            if (data['dataPresent']) {
                return fromTodosActions.todoSavedLocally();
            }

            if (data.errors) {
                return fromTodosActions.deleteTodoFailure({ error: data.errors });
            }

            return fromTodosActions.deleteTodoSuccess({ todo });
        })
    );
}

