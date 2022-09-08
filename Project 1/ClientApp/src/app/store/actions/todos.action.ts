import { createAction, props } from "@ngrx/store";
import { TodoBase } from "app/blocks/graphql/generated/bases";
import { Todo } from "app/blocks/graphql/generated/gqlServices";

export const todoSavedLocally = createAction('[TODOS] Todo Saved Locally');

export const loadAllTodos = createAction('[TODOS] Load Todos', props<{ filter: string, page: number, size: number, patientId: string, options: any }>());
export const loadAllTodosSuccess = createAction('[TODOS] Load Todos Success', props<{ todos: TodoBase[], fromServer: boolean }>());
export const loadAllTodosFailure = createAction('[TODOS] Load Todos Failure', props<{ error: any }>());

export const loadAllTodosTotal = createAction('[TODOS] Load Todos Total', props<{ filter: string, page: number, size: number, patientId: string, options: any }>());
export const loadAllTodosTotalSuccess = createAction('[TODOS] Load Todos Total Success', props<{ total: number, fromServer: boolean }>());
export const loadAllTodosTotalFailure = createAction('[TODOS] Load Todos Total Failure', props<{ error: any }>());

export const loadTodo = createAction('[TODOS] Load Todo', props<{ id: string }>());
export const loadTodoSuccess = createAction('[TODOS] Load Todo Success', props<{ todo: Todo, fromServer: boolean }>());
export const loadTodoFailure = createAction('[TODOS] Load Todo Failure', props<{ error: readonly any[] }>());

export const createTodo = createAction('[TODOS] Create Todo', props<{ todo: Todo }>());
export const createTodoSuccess = createAction('[TODOS] Create Todo Success', props<{ todo: Todo }>());
export const createTodoFailure = createAction('[TODOS] Create Todo Failure', props<{ error: readonly any[] }>());

export const updateTodo = createAction('[TODOS] Update Todo', props<{ todo: Todo }>());
export const updateTodoSuccess = createAction('[TODOS] Update Todo Success', props<{ todo: Todo }>());
export const updateTodoFailure = createAction('[TODOS] Update Todo Failure', props<{ error: readonly any[] }>());

export const deleteTodo = createAction('[TODOS] Delete Todo', props<{ id: string }>());
export const deleteTodoSuccess = createAction('[TODOS] Delete Todo Success', props<{ todo: any }>());
export const deleteTodoFailure = createAction('[TODOS] Delete Todo Failure', props<{ error: readonly any[] }>());