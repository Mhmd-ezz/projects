import { Component, Input, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { BehaviorSubject, merge, Observable, Subject } from 'rxjs';

import { fuseAnimations } from '@fuse/animations';

import { debounceTime, distinctUntilChanged, map, takeUntil, tap } from 'rxjs/operators';
import { Todo } from 'app/blocks/graphql/generated/gqlServices';
import { FormControl } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { Store } from '@ngrx/store';
import { getTodos, getTodosTotal } from '@appStore/selectors';
import * as fromTodosActions from '@appStore/actions';
import { DeleteTodoSheetComponent } from './delete-todo.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { MatPaginator } from '@angular/material/paginator';
import { TodoBase } from 'app/blocks/graphql/generated/bases';
import { PaginatorService } from 'app/blocks/utils/paginator.service';
import { ISearchOptions } from 'app/blocks/interface/search-options';
import { AppState } from '@appStore/reducers';

@Component({
  selector: 'todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class TodoListComponent implements OnInit, OnDestroy {
  @ViewChild(MatPaginator, { static: false }) paginator: MatPaginator;

  private loadingSubject = new BehaviorSubject<boolean>(false);
  private isSearchStatus = false;
  private noMoreRecordsSubject = new BehaviorSubject<boolean>(false);
  private todosSubject = new BehaviorSubject<Todo[]>([]);
  private searchOptionsDefaults: ISearchOptions = {
    keys: ['name'],
    fuzzySearchOptions: {},
    extractOriginalItem: true,
    outputLimit: 2000
  };
  private totalSubject = new BehaviorSubject<number>(0);
  // public total$ = this.totalSubject.asObservable();
  public total$: Observable<number> = this.totalSubject.asObservable();
  private patientId: string;

  hasSelectedTodos: boolean;
  isIndeterminate: boolean;
  filters: any[];
  tags: any[];
  searchInput: FormControl;
  currentTodo: Todo;

  public noData: any;
  public dataSource = new MatTableDataSource<Todo>([]);
  public pageSizeOptions = [10, 20, 40];
  public search = new FormControl('');

  page: number = 1;
  size: number = 10;
  searchValue: string = '';
  todos: Todo[] = [];

  // Private
  private _unsubscribeAll: Subject<any>;

  /**
   * Constructor
   *
   * @param {ActivatedRoute} _activatedRoute
   * @param {Location} _location
   */
  constructor(
    private _activatedRoute: ActivatedRoute,
    private _location: Location,
    private _store: Store<AppState>,
    private snackBar: MatSnackBar,
    private bottomSheet: MatBottomSheet,
    private _paginator: PaginatorService,
    private _router: Router,
  ) {
    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {
    let urlSegments = this._router.url.split('/');
    if (urlSegments.includes('patients')) {
      let index = urlSegments.indexOf("patients");
      if (index + 1 < urlSegments.length - 1) {
        this.patientId = urlSegments[index + 1];
      }
    }

    this.loadTodos();
    this.loadTodosTotal();

    this.noData = this.todosSubject.asObservable().pipe(map(data => data.length === 0));

    this.todosSubject.asObservable().subscribe(data => (this.dataSource.data = data));

    this._store.select(getTodos)
      .pipe(takeUntil(this._unsubscribeAll),
        tap((res: any) => {
          this.loadingSubject.next(false);
        }))
      .subscribe((data) => {
        if (data) {

          // @ no recordss found
          if (data.data.length > 0) { this.noMoreRecordsSubject.next(false); }
          else { this.noMoreRecordsSubject.next(true); }

          this.todos = data.data;

          this.todosSubject.next(this.todos);
        }
      });

    this.total$.subscribe();

    this._store.select(getTodosTotal)
      .pipe(takeUntil(this._unsubscribeAll),
    ).subscribe(data => {
      this.totalSubject.next(data.total);
    });
  }

  ngAfterViewInit(): void {
    this.search.valueChanges
      .pipe(
        debounceTime(600),
        distinctUntilChanged(),
        tap((value: any) => {
          if (value !== '') {
            this.searchValue = this.search.value;
            // @ reset paginator
            this.paginator.pageIndex = 0;
            // @ let matTable manage paginator
            // this.dataSource.paginator = this.paginator;
            // @ search for patients
            this.isSearchStatus = false;
            // this._store.dispatch(
            //     fromGrantorsActions.loadAllGrantors({
            //         filter: value,
            //         page: 0,
            //         size: 10,
            //         options: this.searchOptionsDefaults
            //     }))
            this.loadPage();
            // @ search for patients
            //this._grantorsDataSource.searchGrantor(value, this.searchOptionsDefaults);
          } else {
            this.searchValue = '';
            // this.isSearchStatus = false;
            // @ dispose dataSource paginator, we are going to handle pagination
            // this.dataSource.paginator = null;
            // @ reset paginator
            this.paginator.pageIndex = 0;
            // @ load patients again from backend
            this.loadPage();
          }
          // this.allGrantors.forEach((grantor) => {
          //     const idToRemove = "Grantor:" + grantor.id;
          //     this.apollo.client.cache.evict({id: idToRemove});
          // })
          // this.apollo.client.cache.gc();

        })
      )
      .subscribe();

    merge(this.paginator.page)
      .pipe(
        // @ take while search is empty
        tap(() => this.loadPage())
      )
      .subscribe();
  }

  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
    this.todosSubject.complete();
    this.loadingSubject.complete();
    this.totalSubject.complete();
  }

  loadTodos() {
    this.loadingSubject.next(true);
    this.isSearchStatus = false;
    this._store.dispatch(
      fromTodosActions.loadAllTodos({
        filter: this.searchValue,
        page: this.page,
        size: this.size,
        patientId: this.patientId,
        options: {}
      }))
  }

  loadTodosTotal() {
    this.loadingSubject.next(true);
    this.isSearchStatus = false;
    this._store.dispatch(
      fromTodosActions.loadAllTodosTotal({
        filter: this.searchValue,
        page: this.page,
        size: this.size,
        patientId: this.patientId,
        options: {}
      })
    )
  }

  loadPage() {
    this.page = this.paginator.pageIndex + 1;
    this.size = this.paginator.pageSize
    this._store.dispatch(
      fromTodosActions.loadAllTodos({
        filter: this.searchValue,
        page: this.page,
        size: this.size,
        patientId: this.patientId,
        options: {}
      }))

    this._store.dispatch(
      fromTodosActions.loadAllTodosTotal({
        filter: this.searchValue,
        page: this.page,
        size: this.size,
        patientId: this.patientId,
        options: {}
      }))

  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------
  deleteTodo(id) {

    // @ Prevent delete request when offline
    if (navigator.onLine === false) {
      // @ we are offline do something
      this.snackBar.open("To delete todo you need internet access", 'CLOSE', {
        panelClass: "m-24",
        duration: 8000,
      });
      return false
    }

    this.openBottomSheet(id);
  }

  openBottomSheet(id): void {

    const sheet = this.bottomSheet.open(DeleteTodoSheetComponent);

    sheet.afterDismissed().subscribe((result) => {

      const deleteConfirmed = typeof result !== 'undefined' ? result.deleteConfirmed : false;

      if (deleteConfirmed) {
        this.dataSource.data = this.dataSource.data.filter(obj => obj.id !== id);

        this._store.dispatch(fromTodosActions.deleteTodo({ id: id }));

        this.paginator.length--;

        if (this.dataSource.data.length % 10 === 0) {
          this.paginator.pageIndex--;
        }

        this.loadPage();

        this.snackBar.open('Todo deleted', 'CLOSE', {
          panelClass: 'm-24',
          duration: 3000,
        });
      }
    });

  }

  toggleImportant(todo: TodoBase) {
    let newTodo = new TodoBase();
    newTodo.id = todo.id;
    newTodo.title = todo.title;
    newTodo.notes = todo.notes;
    newTodo.startDate = todo.startDate;
    newTodo.dueDate = todo.dueDate;
    newTodo.isStarred = todo.isStarred;
    newTodo.isImportant = !todo.isImportant;
    newTodo.isCompleted = todo.isCompleted;
    newTodo.patientId = todo.patientId;

    this._store.dispatch(fromTodosActions.updateTodo({ todo: newTodo }));
  }

  toggleStarred(todo: TodoBase) {
    let newTodo = new TodoBase();
    newTodo.id = todo.id;
    newTodo.title = todo.title;
    newTodo.notes = todo.notes;
    newTodo.startDate = todo.startDate;
    newTodo.dueDate = todo.dueDate;
    newTodo.isStarred = !todo.isStarred;
    newTodo.isImportant = todo.isImportant;
    newTodo.isCompleted = todo.isCompleted;
    newTodo.patientId = todo.patientId;

    this._store.dispatch(fromTodosActions.updateTodo({ todo: newTodo }));
  }

  toggleCompleted(todo: TodoBase) {
    let newTodo = new TodoBase();
    newTodo.id = todo.id;
    newTodo.title = todo.title;
    newTodo.notes = todo.notes;
    newTodo.startDate = todo.startDate;
    newTodo.dueDate = todo.dueDate;
    newTodo.isStarred = todo.isStarred;
    newTodo.isImportant = todo.isImportant;
    newTodo.isCompleted = !todo.isCompleted;
    newTodo.patientId = todo.patientId;

    this._store.dispatch(fromTodosActions.updateTodo({ todo: newTodo }));
  }

  navigateToNewTodoScreen() {
    this._router.navigate(['new-todo'], { relativeTo: this._activatedRoute });
  }

  navigateToEditScreen(todo: Todo) {
    this._router.navigate(['edit-todo', todo.id], { relativeTo: this._activatedRoute });
  }
}
