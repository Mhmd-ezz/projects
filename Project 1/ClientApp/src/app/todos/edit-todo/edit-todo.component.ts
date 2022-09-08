import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { TodoBase } from 'app/blocks/graphql/generated/bases';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { Subject } from 'rxjs';
import * as fromActions from '@appStore/actions';
import * as fromRoot from '@appStore/reducers';
import * as fromSelectors from '@appStore/selectors';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import { AppUtils } from 'app/blocks/utils';
import { Todo } from 'app/blocks/graphql/generated/gqlServices';

@Component({
  selector: 'app-edit-todo',
  templateUrl: './edit-todo.component.html',
  styleUrls: ['./edit-todo.component.scss']
})
export class EditTodoComponent implements OnInit {
  @ViewChild('form', { static: true }) public form: NgForm;

  private _unsubscribeAll: Subject<any>;
  private savingDelay = 4000;

  public onTodoChange: Subject<any>;
  public todo: TodoBase = new TodoBase();
  public errors = [];

  constructor(
    private _router: Router,
    private _activatedRoute: ActivatedRoute,
    private _store: Store<fromRoot.AppState>,
    private _formUtilsService: FormUtilsService,
  ) {
    this._unsubscribeAll = new Subject();
    this.onTodoChange = new Subject();
    this._store.dispatch(fromActions.loadTodo({ id: this._activatedRoute.snapshot.params.id }))
  }

  ngOnInit(): void {
    // @ On todo details
    this._store.select(fromSelectors.selectedTodoSelector)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(data => {
        if (data && data.data)
          this.todo = AppUtils.mergeForForms(this.todo, data.data);
      })

    // @ On update
    this._store.select(fromSelectors.updateTodoSelector)
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(todo => !!todo)
      )
      .subscribe(todo => {
        this._formUtilsService.formSaved()
        this.onUpdatedCallback(todo)
      })

    // @ On Todo updated locally
    this._store.select(fromSelectors.updateTodoLocallySelector)
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(data => !!data)
      )
      .subscribe((d) => {
        this._formUtilsService.formSavedLocally()
      })

    // @ On todo update failure
    this._store.select(fromSelectors.updateTodoFailureSelector)
      .pipe(
        takeUntil(this._unsubscribeAll),
        filter(data => !!data)
      )
      .subscribe((errors) => this._formUtilsService.handleErrors(errors))

    this.subscribeForFormChanges();
    this.onModelInfoChanges();
  }

  toggleCompleted(e) {
    this.todo.isCompleted = !this.todo.isCompleted;
  }

  toggleImportant(e) {
    this.todo.isImportant = !this.todo.isImportant;
  }

  toggleStarred(e) {
    this.todo.isStarred = !this.todo.isStarred;
  }

  onDone(): void {
    this._store.dispatch(fromActions.updateTodo({ todo: this.todo }));

    this._router.navigate(['../..'], { relativeTo: this._activatedRoute });
  }

  private subscribeForFormChanges(): void {
    this.form
      .valueChanges
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(
        data => {
          if (this.form.dirty) {
            this.onTodoChange.next(this.todo);
          }
        }
      );
  }

  private onModelInfoChanges(): void {
    this.onTodoChange
      .pipe(takeUntil(this._unsubscribeAll))
      .pipe(
        // @ validate the form and skip if invalid
        filter(() => this._formUtilsService.isValid(this.form)),
        tap(ev => this._formUtilsService.formPending()),
        debounceTime(this.savingDelay),
        tap(() => {
          this._store.dispatch(fromActions.updateTodo({ todo: this.todo }));
        })
      )
      .subscribe();
  }

  private onUpdatedCallback(updatedTodo: Todo): void {
    // this.errors = [];
    AppUtils.SetFormPrestine(this.form);
    const todo = Object.assign({}, this.todo);
    this.todo = AppUtils.mergeForForms(todo, updatedTodo);
  }

}
