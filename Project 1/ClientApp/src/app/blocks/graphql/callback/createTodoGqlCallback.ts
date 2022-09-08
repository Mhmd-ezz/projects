import { gql, InMemoryCache } from '@apollo/client/core';
import { CreateTodoMutation, Todo } from '../generated/gqlServices';
import { todoQ } from './../gqlQueries';

export class createTodoGqlCallback {

    /**
     * 
     * 
     * @static
     * @param {any} variables 
     * @returns 
     * 
     * @memberOf createTodoGqlCallback
     */
    public static optimisticResponse(variables) : CreateTodoMutation {

        // @ Random ID
        // variables.id = !variables.id ? Math.round(Math.random() * -1000000) : variables.id
        const response = {
            __typename: "Mutation",
            createTodo: variables
        };
        return response as CreateTodoMutation ;
    }

    /**
     * 
     * 
     * @static
     * @param {any} proxy_ 
     * @param {any} ev 
     * @returns 
     * 
     * @memberOf createTodoGqlCallback
     */
    public static update(proxy_, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.createTodo === null)
            return;

        let proxy: InMemoryCache = proxy_;

        let createdTodo: Todo = ev.data.createTodo

        // @ add a todo query args :id
        this.writeTodoQuery(proxy, createdTodo);


    }

    private static writeTodoQuery(proxy: InMemoryCache, todo: Todo) {

        try {
            // @ note: todo fragment will be created automatically
            proxy.writeQuery({ query: todoQ, variables: { id: todo.id }, data: { todo: todo } });
        } catch (error) {
            throw new error(error)
        }
    }

}
