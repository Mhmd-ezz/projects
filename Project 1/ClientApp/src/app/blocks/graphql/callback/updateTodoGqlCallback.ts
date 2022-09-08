
import { gql, InMemoryCache } from '@apollo/client/core';
import { Todo, UpdateTodoMutation } from '../generated/gqlServices';
import { todoQ } from '../gqlQueries';


export class updateTodoGqlCallback {

    public static optimisticResponse(variables) :UpdateTodoMutation {
        const response = {
            __typename: "Mutation",
            updateTodo: variables
        };
        return response as UpdateTodoMutation;
    }

    public static update(proxy_, ev) {

        // @ If errors exists, do nothing
        if (ev.data.errors && ev.data.updateTodo === null)
            return;

        let proxy: InMemoryCache = proxy_;

        let updatedTodo = Object.assign({}, ev.data.updateTodo);

        // @ update light todo fragment

        this.writeTodoQuery(proxy, updatedTodo);

    }
    private static writeTodoQuery(proxy: InMemoryCache, todo: Todo) {

        try {
            // @ Note: writeQuery will update todo Fragment
            proxy.writeQuery({ query: todoQ, variables: { id: todo.id }, data: { todo: todo } });
        } catch (error) {
            throw new error(error)
        }
    }
}
