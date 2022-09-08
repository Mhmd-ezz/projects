/* eslint-disable @typescript-eslint/naming-convention */
import { switchMap } from 'rxjs/operators';
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';
import { MatDrawer } from '@angular/material/sidenav';
import { fromEvent, of, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { FuseMediaWatcherService } from '@fuse/services/media-watcher';
import { FuseNavigationService, FuseVerticalNavigationComponent } from '@fuse/components/navigation';
import { Task } from '../tasks.types';
import { TasksService } from '../tasks.service';

@Component({
    selector: 'tasks-list',
    templateUrl: './list.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksListComponent implements OnInit, OnDestroy {
    @ViewChild('matDrawer', { static: true }) matDrawer: MatDrawer;

    isLoading: boolean = false;
    drawerMode: 'side' | 'over';
    selectedTask: Task;
    tasks: Task[];
    tasksCount: any = {
        completed: 0,
        incomplete: 0,
        total: 0
    };
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        @Inject(DOCUMENT) private _document: any,
        private _router: Router,
        private _tasksService: TasksService,
        private _fuseMediaWatcherService: FuseMediaWatcherService,
        private _fuseNavigationService: FuseNavigationService
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {

        // Get the tasks
        this._tasksService.tasks$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks;

                // Update the counts
                this.tasksCount.total = this.tasks.filter(task => task.type === 'task').length;
                this.tasksCount.completed = this.tasks.filter(task => task.type === 'task' && task.completed).length;
                this.tasksCount.incomplete = this.tasksCount.total - this.tasksCount.completed;

                // Mark for check
                this._changeDetectorRef.markForCheck();

                // Update the count on the navigation
                // setTimeout(() => {

                //     // Get the component -> navigation data -> item
                //     const mainNavigationComponent = this._fuseNavigationService.getComponent<FuseVerticalNavigationComponent>('mainNavigation');
                //     console.log(mainNavigationComponent);
                //     // If the main navigation component exists...
                //     if (mainNavigationComponent) {
                //         const mainNavigation = mainNavigationComponent.navigation;
                //         const menuItem = this._fuseNavigationService.getItem('apps.tasks', mainNavigation);
                //         console.log(menuItem,mainNavigation);

                //         // Update the subtitle of the item
                //         menuItem.subtitle = this.tasksCount.incomplete + ' remaining tasks';

                //         // Refresh the navigation
                //         mainNavigationComponent.refresh();
                //     }
                // });
            });

        // Get the task
        this._tasksService.task$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((task: Task) => {
                this.selectedTask = task;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Subscribe to media query change
        this._fuseMediaWatcherService.onMediaQueryChange$('(min-width: 1440px)')
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((state) => {

                // Calculate the drawer mode
                this.drawerMode = state.matches ? 'side' : 'over';

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Listen for shortcuts
        fromEvent(this._document, 'keydown')
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter<KeyboardEvent>(event =>
                    (event.ctrlKey === true || event.metaKey) // Ctrl or Cmd
                    && (event.key === '/' || event.key === '.') // '/' or '.' key
                )
            )
            .subscribe((event: KeyboardEvent) => {

                // If the '/' pressed
                if (event.key === '/') {
                    this.createTask('task');
                }

                // If the '.' pressed
                if (event.key === '.') {
                    this.createTask('section');
                }
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    loading(): void {
        this.isLoading = true;
        this._tasksService.setOverlayLoading(true);
    }

    /**
     * On backdrop clicked
     */
    onBackdropClicked(): void {
        // Go back to the list
        this._router.navigate(['./'], { relativeTo: this._activatedRoute });

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Create task
     *
     * @param type
     */
    createTask(type: 'task' | 'section'): void {

        this._activatedRoute.params
            .pipe(
                switchMap((params) => {
                    const opportunity_id = params['opportunity-id'];
                    const priority = 1;
                    const task: Task = { type, opportunity_id, priority };

                    // Create the task
                    return this._tasksService.createTask(task);

                })
            ).subscribe((newTask) => {

                // Go to the new task
                this._router.navigate(['./', newTask.id], { relativeTo: this._activatedRoute });

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

    }

    /**
     * Toggle the completed status
     * of the given task
     *
     * @param task
     */
    toggleCompleted(task: Task): void {
        // Toggle the completed status
        task.completed = !task.completed;

        // Update the task on the server
        this._tasksService.updateTask(task.id, task).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Task dropped
     *
     * @param event
     */
    dropped(event: CdkDragDrop<Task[]>): void {
        // Move the item in the array
        moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);

        // Save the new order
        this._tasksService.updateTasksOrders(event.container.data).subscribe();

        // Mark for check
        this._changeDetectorRef.markForCheck();
    }

    /**
     * Track by function for ngFor loops
     *
     * @param index
     * @param item
     */
    trackByFn(index: number, item: any): any {
        return item.id || index;
    }
}
