import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { FormUtilsService } from 'app/blocks/utils/form-utils.service';
import { Subject } from 'rxjs';
import { debounceTime, filter, takeUntil, tap } from 'rxjs/operators';
import * as fromActions from '@appStore/actions';
import * as fromRoot from '@appStore/reducers';
import { TodoBase } from 'app/blocks/graphql/generated/bases';
import { AppUtils } from 'app/blocks/utils';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-todo',
  templateUrl: './new-todo.component.html',
  styleUrls: ['./new-todo.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class NewTodoComponent implements OnInit {
  @ViewChild('form', { static: true }) public form: NgForm;

  private _unsubscribeAll: Subject<any>;
  private savingDelay = 4000;
  private patientId: string = null;

  public onTodoChange: Subject<any>;
  public todo: TodoBase = new TodoBase();
  public errors = [];

  constructor(
    private _router: Router,
    private _store: Store<fromRoot.AppState>,
    private _formUtilsService: FormUtilsService,
    private _activatedRoute: ActivatedRoute
  ) {
    this._unsubscribeAll = new Subject();
    this.onTodoChange = new Subject();
  }

  ngOnInit(): void {
    this.todo.isImportant = false;
    this.todo.isStarred = false;

    this.subscribeForFormChanges();
    this.onModelInfoChanges();

    let urlSegments = this._router.url.split('/');
    if (urlSegments.includes('patients')) {
      let index = urlSegments.indexOf("patients");
      if (index + 1 < urlSegments.length - 1) {
        this.patientId = urlSegments[index + 1];
      }
    }
  }

  toggleImportant(e) {
    this.todo.isImportant = !this.todo.isImportant;
  }

  toggleStarred(e) {
    this.todo.isStarred = !this.todo.isStarred;
  }

  onDone(): void {
    if (this.todo.id) {
      this._store.dispatch(fromActions.updateTodo({ todo: this.todo }))
    } else {
      this.todo.id = AppUtils.GenerateObjectId();
      this.todo.patientId = this.patientId;
      this.todo.isCompleted = false;
      this.todo.startDate = new Date(this.todo.startDate);
      this.todo.dueDate = new Date(this.todo.dueDate);
      this._store.dispatch(fromActions.createTodo({ todo: this.todo }))
    }

    this._router.navigate(['..'], { relativeTo: this._activatedRoute });
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
          if (this.todo.id) {
            this._store.dispatch(fromActions.updateTodo({ todo: this.todo }))
          } else {
            this.todo.id = AppUtils.GenerateObjectId();
            this.todo.patientId = this.patientId;
            this.todo.isCompleted = false;
            if (this.todo.startDate) {
              this.todo.startDate = new Date(this.todo.startDate);
            }
            if (this.todo.dueDate) {
              this.todo.dueDate = new Date(this.todo.dueDate);
            }
            this._store.dispatch(fromActions.createTodo({ todo: this.todo }))
          }
        })
      )
      .subscribe();
  }

}
