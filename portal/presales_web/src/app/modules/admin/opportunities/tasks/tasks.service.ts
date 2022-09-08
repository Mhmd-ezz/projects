/* eslint-disable @typescript-eslint/naming-convention */
import { TasksRequestParams, TasksService as tservice } from './../../../../core/services/tasks.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject, throwError } from 'rxjs';
import { filter, map, switchMap, take, tap } from 'rxjs/operators';
import { Task } from './tasks.types';
// import { Task } from '../../../../core/interface/task.interface';

@Injectable({
    providedIn: 'root'
})
export class TasksService {
    // Private
    private _task: BehaviorSubject<Task | null> = new BehaviorSubject(null);
    private _tasks: BehaviorSubject<Task[] | null> = new BehaviorSubject(null);
    private _isOverlayLoading: BehaviorSubject<boolean | null> = new BehaviorSubject(false);

    /**
     * Constructor
     */
    constructor(
        private _httpClient: HttpClient,
        private _tasksService: tservice
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Accessors
    // -----------------------------------------------------------------------------------------------------

    /**
     * Getter for task
     */
    get task$(): Observable<Task> {
        return this._task.asObservable();
    }

    /**
     * Getter for tasks
     */
    get tasks$(): Observable<Task[]> {
        return this._tasks.asObservable();
    }

    get overlayLoading$(): Observable<boolean> {
        return this._isOverlayLoading.asObservable();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    /**
     * Get tasks
     */
    getTasks(oppId: number): Observable<Task[]> {
        const params: TasksRequestParams = {
            page: 1,
            limit: 100,
            filter: '',
            sortBy: 'title',
            descending: false,
            dueDateFrom: null,
            dueDateTo: null,
            created_by: [],
            assigned_to: [],
            priority: null,
            completed: null,
            opportunity_id: [oppId],
        };

        return this._tasksService.getTasks(params)
            .pipe(
                map((data: any) => data.data),
                tap((data) => {
                    this._tasks.next(data);
                })
            );

        return this._httpClient.get<Task[]>('api/apps/tasks/all').pipe(
            tap((response) => {
                this._tasks.next(response);
            })
        );
    }

    /**
     * Update tasks orders
     *
     * @param tasks
     */
    updateTasksOrders(tasks: Task[]): Observable<Task[]> {
        return this._httpClient.patch<Task[]>('api/apps/tasks/order', { tasks });
    }

    /**
     * Search tasks with given query
     *
     * @param query
     */
    searchTasks(query: string): Observable<Task[] | null> {
        return this._httpClient.get<Task[] | null>('api/apps/tasks/search', { params: { query } });
    }

    /**
     * Get task by id
     */
    getTaskById(id: string): Observable<Task> {
        return this._tasksService.getTaskById(id).pipe(
            map((task) => {
                this._task.next(task);

                // Return the task
                return task;
            })
        );

        // return this._tasks.pipe(
        //     take(1),
        //     map((tasks) => {

        //         // Find the task
        //         // const task = tasks.find(item => item.id === id) || null;

        //         // Update the task
        //         // this._task.next(task);

        //         // Return the task
        //         // return task;
        //     }),
        //     switchMap((task) => {

        //         if (!task) {
        //             return throwError('Could not found task with id of ' + id + '!');
        //         }

        //         return of(task);
        //     })
        // );
    }

    /**
     * Create task
     *
     * @param type
     */
    createTask(task: Task): Observable<Task> {
        return this._tasksService.createTask(task).pipe(
            map((newTask) => {

                this._task.next(newTask);

                const tasks = this._tasks.getValue();

                this._tasks.next([newTask, ...tasks]);

                return newTask;
            })
        );
        // return this.tasks$.pipe(
        //     take(1),
        //     switchMap(tasks => this._httpClient.post<Task>('api/apps/tasks/task', { type }).pipe(
        //         map((newTask) => {

        //             // Update the tasks with the new task
        //             this._tasks.next([newTask, ...tasks]);

        //             // Return the new task
        //             return newTask;
        //         })
        //     ))
        // );
    }

    /**
     * Update task
     *
     * @param id
     * @param task
     */
    updateTask(id: string, task: Task): Observable<Task> {
        return this._tasksService.updateTask(task)
            .pipe(
                map((updatedTask) => {

                    // eslint-disable-next-line prefer-const
                    let tasks = this._tasks.getValue();
                    // Find the index of the updated task
                    const index = tasks.findIndex(item => item.id === id);

                    // Update the task
                    tasks[index] = updatedTask;

                    // Update the tasks
                    this._tasks.next(tasks);

                    this._task.next(updatedTask);

                    // Return the updated task
                    return updatedTask;
                }),
            );
        // return this.tasks$
        //     .pipe(
        //         take(1),
        //         switchMap(tasks => this._httpClient.patch<Task>('api/apps/tasks/task', {
        //             id,
        //             task
        //         }).pipe(
        //             map((updatedTask) => {

        //                 // Find the index of the updated task
        //                 // const index = tasks.findIndex(item => item.id === id);

        //                 // Update the task
        //                 // tasks[index] = updatedTask;

        //                 // Update the tasks
        //                 this._tasks.next(tasks);

        //                 // Return the updated task
        //                 return updatedTask;
        //             }),
        //             switchMap(updatedTask => this.task$.pipe(
        //                 take(1),
        //                 // filter(item => item && item.id === id),
        //                 tap(() => {

        //                     // Update the task if it's selected
        //                     this._task.next(updatedTask);

        //                     // Return the updated task
        //                     return updatedTask;
        //                 })
        //             ))
        //         ))
        //     );
    }

    /**
     * Delete the task
     *
     * @param id
     */
    deleteTask(id: string): Observable<boolean> {

        return this._tasksService.deleteTask(id)
            .pipe(
                map((isDeleted: boolean) => {
                    const tasks = this._tasks.getValue();

                    const index = tasks.findIndex(item => item.id === id);

                    tasks.splice(index, 1);

                    // Update the tasks
                    this._tasks.next(tasks);

                    // Return the deleted status
                    return isDeleted;
                })
            );

        return this.tasks$.pipe(
            take(1),
            switchMap(tasks => this._httpClient.delete('api/apps/tasks/task', { params: { id } }).pipe(
                map((isDeleted: boolean) => {

                    // Find the index of the deleted task
                    // const index = tasks.findIndex(item => item.id === id);

                    // Delete the task
                    // tasks.splice(index, 1);

                    // Update the tasks
                    this._tasks.next(tasks);

                    // Return the deleted status
                    return isDeleted;
                })
            ))
        );
    }

    setOverlayLoading(status: boolean): void {
        this._isOverlayLoading.next(status);
    }
}
