import { createSelector } from '@ngrx/store';
import * as fromTodos from '../reducers/todos.reducer';
import { AppState } from '@appStore/reducers';

export const getTodosState = (state: AppState) => state.todos;

export const getTodos = createSelector(getTodosState, fromTodos.getTodos);
export const getTodosTotal = createSelector(getTodosState, fromTodos.getTodosTotal);

export const todosSelector = createSelector(getTodosState, fromTodos.getTodos);
export const todosTotalSelector = createSelector(getTodosState, fromTodos.getTodosTotal);
export const selectedTodoSelector = createSelector(getTodosState, fromTodos.getSelectedTodo);

export const updateTodoSelector = createSelector(getTodosState, fromTodos.getUpdatedTodo);
export const updateTodoLocallySelector = createSelector(getTodosState, fromTodos.getUpdatedTodoLocally);
export const updateTodoFailureSelector = createSelector(getTodosState, fromTodos.getUpdatedTodoFailure);

export const createTodoSelector = createSelector(getTodosState, fromTodos.getCreatedTodo);
export const createTodoLocallySelector = createSelector(getTodosState, fromTodos.getCreatedTodoLocally);
export const createTodoFailureSelector = createSelector(getTodosState, fromTodos.getCreatedTodoFailure);

export const TodoSavedLocallySelector = createSelector(getTodosState, fromTodos.getTodoSavedLocally);
