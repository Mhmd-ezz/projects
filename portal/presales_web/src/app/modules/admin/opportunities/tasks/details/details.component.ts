/* eslint-disable @typescript-eslint/naming-convention */
import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, OnDestroy, OnInit, Renderer2, TemplateRef, ViewChild, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { FormBuilder, FormGroup } from '@angular/forms';
import { TemplatePortal } from '@angular/cdk/portal';
import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { MatDrawerToggleResult } from '@angular/material/sidenav';
import { merge, Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { assign } from 'lodash-es';
import * as moment from 'moment';
import { TasksListComponent } from '../list/list.component';
import { TasksService } from '../tasks.service';
import { Task } from '../tasks.types';

@Component({
    selector: 'tasks-details',
    templateUrl: './details.component.html',
    encapsulation: ViewEncapsulation.None,
    changeDetection: ChangeDetectionStrategy.OnPush
})
export class TasksDetailsComponent implements OnInit, AfterViewInit, OnDestroy {
    @ViewChild('tagsPanelOrigin') private _tagsPanelOrigin: ElementRef;
    @ViewChild('tagsPanel') private _tagsPanel: TemplateRef<any>;
    @ViewChild('titleField') private _titleField: ElementRef;

    tagsEditMode: boolean = false;
    isOverlayLoading: boolean = false;
    isLoading: boolean = false;
    task: Task;
    taskForm: FormGroup;
    tasks: Task[];
    private _tagsPanelOverlayRef: OverlayRef;
    private _unsubscribeAll: Subject<any> = new Subject<any>();

    /**
     * Constructor
     */
    constructor(
        private _activatedRoute: ActivatedRoute,
        private _changeDetectorRef: ChangeDetectorRef,
        private _formBuilder: FormBuilder,
        private _renderer2: Renderer2,
        private _router: Router,
        private _tasksListComponent: TasksListComponent,
        private _tasksService: TasksService,
        private _overlay: Overlay,
        private _viewContainerRef: ViewContainerRef
    ) {
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Lifecycle hooks
    // -----------------------------------------------------------------------------------------------------

    /**
     * On init
     */
    ngOnInit(): void {
        // this._activatedRoute.params
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((data) => {
        //         this._tasksListComponent.isLoading = true;
        //     });

        // Open the drawer
        this._tasksListComponent.matDrawer.open();

        // Create the task form
        this.taskForm = this._formBuilder.group({
            id: [''],
            type: [''],
            title: [''],
            notes: [''],
            opportunity_id: [null],
            created_by: [null],
            // assigned_to: [null],
            completed: [false],
            dueDate: [null],
            priority: [0],
            tags: [[]],
            order: [0]
        });

        // Get the tags
        // this._tasksService.tags$
        //     .pipe(takeUntil(this._unsubscribeAll))
        //     .subscribe((tags: Tag[]) => {
        //         this.tags = tags;
        //         this.filteredTags = tags;

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //     });

        // Get the tasks
        this._tasksService.tasks$
            .pipe(takeUntil(this._unsubscribeAll)
            )
            .subscribe((tasks: Task[]) => {
                this.tasks = tasks;

                // Mark for check
                this._changeDetectorRef.markForCheck();
            });

        // Get the task
        this._tasksService.task$
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe((task: Task) => {
                console.log('Task loaded=>', task);

                // Open the drawer in case it is closed
                this._tasksListComponent.matDrawer.open();

                // Get the task
                this.task = task;

                // Patch values to the form from the task
                this.taskForm.patchValue(task, { emitEvent: false });

                // Mark for check
                this._changeDetectorRef.markForCheck();
                setTimeout(() => {
                    this._tasksListComponent.isLoading = false;
                    this.isOverlayLoading = false;
                    this._changeDetectorRef.markForCheck();
                }, 100);

            });

        this._tasksService.overlayLoading$
            .pipe(
                takeUntil(this._unsubscribeAll),
            ).subscribe((value) => {
                this.isOverlayLoading = value;
                this._changeDetectorRef.markForCheck();
            });

        // this.taskForm.controls['completed']
        //     .valueChanges
        //     .pipe(
        //         tap(value => console.log(value)),
        //         // tap(value => this.task = assign(this.task.completed, value))
        //     )
        //     .subscribe(() => this.updateTask());

        merge(
            this.taskForm.controls['priority'].valueChanges,
            this.taskForm.controls['dueDate'].valueChanges,
        )
            .pipe(
                tap(value => console.log(this.taskForm)),
                tap(value => this.task.priority = this.taskForm.controls['priority'].value),
                tap(value => this.task.dueDate = this.taskForm.controls['dueDate'].value),
            )
            .subscribe();

        // Update task when there is a value change on the task form
        this.taskForm.valueChanges
            .pipe(
                tap((value) => {
                    // Update the task object
                    // this.task = assign(this.task, value);
                }),
                debounceTime(10),
                takeUntil(this._unsubscribeAll)
            )
            .subscribe();

        // Listen for NavigationEnd event to focus on the title field
        this._router.events
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(event => event instanceof NavigationEnd)
            )
            .subscribe(() => {

                // Focus on the title field
                this._titleField.nativeElement.focus();
            });
    }

    /**
     * After view init
     */
    ngAfterViewInit(): void {
        // Listen for matDrawer opened change
        this._tasksListComponent.matDrawer.openedChange
            .pipe(
                takeUntil(this._unsubscribeAll),
                filter(opened => opened)
            )
            .subscribe(() => {

                // Focus on the title element
                this._titleField.nativeElement.focus();
            });
    }

    /**
     * On destroy
     */
    ngOnDestroy(): void {
        // Unsubscribe from all subscriptions
        this._unsubscribeAll.next();
        this._unsubscribeAll.complete();

        // Dispose the overlay
        if (this._tagsPanelOverlayRef) {
            this._tagsPanelOverlayRef.dispose();
        }
    }

    // -----------------------------------------------------------------------------------------------------
    // @ Public methods
    // -----------------------------------------------------------------------------------------------------

    updateTask(): void {
        this._tasksListComponent.isLoading = true;
        this.isOverlayLoading = true;

        const task = this.taskForm.value;
        this.task = assign(this.task, task);
        task.assigned_to = task.assigned_to && task.assigned_to.id ? task.assigned_to.id : task.assigned_to as any;
        task.created_by = task.created_by && task.created_by.id ? task.created_by.id : task.created_by as any;

        this._tasksService.updateTask(task.id, task)
            .pipe(
                takeUntil(this._unsubscribeAll)
            )
            .subscribe(
                () => {
                    this._tasksListComponent.isLoading = false;
                    this.isOverlayLoading = false;
                    // Mark for check
                    this._changeDetectorRef.markForCheck();
                },
                (error) => {
                    this._tasksListComponent.isLoading = false;
                    this.isOverlayLoading = false;
                    this._changeDetectorRef.markForCheck();
                });

        // this.taskForm.value
        //     .pipe(
        //         tap((value) => {
        //             this._tasksListComponent.isLoading = true;
        //             // Update the task object
        //             this.task = assign(this.task, value);
        //         }),
        //         debounceTime(2000),
        //         takeUntil(this._unsubscribeAll)
        //     )
        //     .subscribe((task: Task) => {

        //         task.assigned_to = task.assigned_to && task.assigned_to.id ? task.assigned_to.id : task.assigned_to as any;
        //         task.created_by = task.created_by && task.created_by.id ? task.created_by.id : task.created_by as any;

        //         // Update the task on the server
        //         this._tasksService.updateTask(task.id, task).subscribe();

        //         // Mark for check
        //         this._changeDetectorRef.markForCheck();
        //         this._tasksListComponent.isLoading = false;
        //     });
    }
    /**
     * Close the drawer
     */
    closeDrawer(): Promise<MatDrawerToggleResult> {
        return this._tasksListComponent.matDrawer.close();
    }

    /**
     * Toggle the completed status
     */
    toggleCompleted(): void {
        // Get the form control for 'completed'
        const completedFormControl = this.taskForm.get('completed');

        // Toggle the completed status
        completedFormControl.setValue(!completedFormControl.value);
    }

    /**
     * Set the task priority
     *
     * @param priority
     */
    setTaskPriority(priority): void {
        // Set the value
        this.taskForm.get('priority').setValue(priority);
    }

    /**
     * Check if the task is overdue or not
     */
    isOverdue(): boolean {
        return moment(this.task.dueDate, moment.ISO_8601).isBefore(moment(), 'days');
    }

    /**
     * Delete the task
     */
    deleteTask(): void {
        this._tasksListComponent.isLoading = true;
        this.isOverlayLoading = true;
        // Get the current task's id
        const id = this.task.id;

        // Get the next/previous task's id
        const currentTaskIndex = this.tasks.findIndex(item => item.id === id);
        const nextTaskIndex = currentTaskIndex + ((currentTaskIndex === (this.tasks.length - 1)) ? -1 : 1);
        const nextTaskId = (this.tasks.length === 1 && this.tasks[0].id === id) ? null : this.tasks[nextTaskIndex].id;

        // Delete the task
        this._tasksService.deleteTask(id)
            .pipe(
                tap(() => this._tasksListComponent.isLoading = false),
                tap(() => this.isOverlayLoading = false),
            )
            .subscribe((isDeleted) => {

                // Return if the task wasn't deleted...
                if (!isDeleted) {
                    return;
                }

                // Navigate to the next task if available
                if (nextTaskId) {
                    this._router.navigate(['../', nextTaskId], { relativeTo: this._activatedRoute });
                }
                // Otherwise, navigate to the parent
                else {
                    this._router.navigate(['../'], { relativeTo: this._activatedRoute });
                }
            },
                (error) => {

                });

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
