import { Action, createReducer, on } from "@ngrx/store";
import { Todo } from "app/blocks/graphql/generated/gqlServices";
import * as todosActions from '../actions/todos.action';

export class TodosState {
    todos: { data: Todo[], fromServer: boolean };
    todosTotal:{ total: number, fromServer: boolean};
    error:any;
    deleteTodo: any;
    selectedTodo: { data: Todo, fromServer: boolean };

    updateTodo: Todo;
    updateTodoLocally: boolean;
    updateTodoFailure: any;

    createTodo: Todo;
    createTodoLocally: boolean;
    createTodoFailure: any;

    todoSavedLocally: boolean;
}

const initialState: TodosState = {  
    todos:{ data: [], fromServer: false },
    todosTotal:{ total: 0, fromServer: false },
    error:null,
    deleteTodo: null,
    selectedTodo: { data: null, fromServer: false },

    updateTodo: null,
    updateTodoLocally: false,
    updateTodoFailure: [],

    createTodo: null,
    createTodoLocally: false,
    createTodoFailure: [],

    todoSavedLocally: true
};

const todosReducer = createReducer(initialState,

       // -------------------------------------
    // @ READ LOOKUPS
    // -------------------------------------
    on(todosActions.loadAllTodos, (state: TodosState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(todosActions.loadAllTodosSuccess, (state: TodosState, payload) => {
        return {
            ...state,
            todos: {data: payload.todos, fromServer: payload.fromServer},
            error: null
        };
    }),
    on(todosActions.loadAllTodosFailure, (state: TodosState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    on(todosActions.loadAllTodosTotal, (state: TodosState, payload) => {
        return {
            ...state,
            error: null
        };
    }),
    on(todosActions.loadAllTodosTotalSuccess, (state: TodosState, payload) => {
        return {
            ...state,
            todosTotal:{ total: payload.total, fromServer: payload.fromServer},
            error: null
        };
    }),
    on(todosActions.loadAllTodosTotalFailure, (state: TodosState, payload) => {
        return {
            ...state,
            error:payload.error,
        };
    }),
    on(todosActions.loadTodoSuccess, (state: TodosState, payload) => {
        return {
            ...state,
            selectedTodo: { data: payload.todo, fromServer: payload.fromServer }
        };
    }),
    // -------------------------------------
    // @ DELETE GRANTOR
    // -------------------------------------
    on(todosActions.deleteTodo, (state: TodosState, payload) => {
        return {
            ...state,
            deleteGrantor: null,
            error: null,
        };
    }),
    on(todosActions.deleteTodoSuccess, (state: TodosState, payload) => {
        return {
            ...state,
            deleteTodo: payload.todo,
            error: null,
        };
    }),
    on(todosActions.deleteTodoFailure, (state: TodosState, payload) => {
        return {
            ...state,
            error: payload.error,
        };
    }),
    // -------------------------------------
    // @ UPDATE TODO
    // -------------------------------------

    on(todosActions.updateTodoSuccess, (state: TodosState, payload) => {
        return {
            ...state,
            updateTodo: payload.todo
        };
    }),

    on(todosActions.updateTodoFailure, (state: TodosState) => {
        return {
            ...state,
            updateTodoFailure: true,
        };
    }),

    // -------------------------------------
    // @ CREATE TODO
    // -------------------------------------

    on(todosActions.createTodoSuccess, (state: TodosState, payload) => {
        return {
            ...state,
            createTodoFailure: false,
            createTodo: payload.todo
        };
    }),

    on(todosActions.todoSavedLocally, (state: TodosState) => {
        return {
            ...state,
            todoSavedLocally: true,
        };
    }),

    on(todosActions.createTodoFailure, (state: TodosState) => {
        return {
            ...state,
            createTodoFailure: true,
        };
    }),
);

export function reducer(
    state: TodosState,
    action: Action
): TodosState {
    return todosReducer(state, action);
}
export const getTodos = (state: TodosState) => state.todos;
export const getTodosTotal = (state: TodosState) => state.todosTotal;
export const getSelectedTodo = (state: TodosState) => state.selectedTodo;

export const getUpdatedTodo = (state: TodosState) => state.updateTodo;
export const getUpdatedTodoFailure = (state: TodosState) => state.updateTodoFailure;
export const getUpdatedTodoLocally = (state: TodosState) => state.updateTodoLocally;

export const getCreatedTodo = (state: TodosState) => state.createTodo;
export const getCreatedTodoFailure = (state: TodosState) => state.createTodoFailure;
export const getCreatedTodoLocally = (state: TodosState) => state.createTodoLocally;

export const getTodoSavedLocally = (state: TodosState) => state.todoSavedLocally;

