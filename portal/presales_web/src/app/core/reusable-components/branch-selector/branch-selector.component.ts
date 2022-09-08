import { BranchesService } from './../../services/branches.service';
import { Validators } from '@angular/forms';
/* eslint-disable */
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { of } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { debounceTime, distinctUntilChanged, filter, map, startWith, switchMap, tap } from 'rxjs/operators';
import { Branch } from 'app/core/interface/branch.interface';

@Component({
  selector: 'app-branch-selector',
  templateUrl: './branch-selector.component.html',
  styleUrls: ['./branch-selector.component.scss']
})
export class BranchSelectorComponent implements OnInit {

  @Output() onSelectChange: EventEmitter<any> = new EventEmitter();
  @Input() form: any;

  filteredOptions: Observable<Branch[]>;
  loading = false;
  branchControl = new FormControl('', [Validators.required]);
  // clientControl = new FormControl('');

  constructor(
    private _branchesService: BranchesService,
  ) { }

  ngOnInit(): void {
    this.initFilter();

    if (this.form) {
      this.form.addControl("branch", this.branchControl);
    }
  }

  //--------------------------------------------------
  // Public Method
  //--------------------------------------------------
  onBranchSelected(event: MatAutocompleteSelectedEvent) {
    this.onSelectChange.emit(event.option.value);
  }

  displayFn(branch: Branch): string {
    return branch && branch.name ? `${branch.name}` : '';
  }
  forceSelection() {
    console.log(this.branchControl.value, this.form);

    setTimeout(() => {
      // if (!this.branchControl || this.branchControl !== this.form.controls['branch'].value) {
      //   this.form.controls['branch'].setValue(null);
      //   this.branchControl.setValue('');
      //   console.log(this.branchControl.value);
      // }
    }, 1000);
  }

  //--------------------------------------------------
  // Private Method
  //--------------------------------------------------
  private initFilter() {

    this.filteredOptions = this.branchControl
      .valueChanges.pipe(
        distinctUntilChanged(),
        debounceTime(600),
        tap((e) => !e ? this.onSelectChange.emit(null) : null),
        filter((e) => (typeof e === 'string')),
        tap(() => this.loading = true),
        tap((v) => console.log(v)),
        startWith(''),
        switchMap(text =>
          this._branchesService.getBranches(0, 5, text, 'name', false)
            .pipe(
              tap(() => this.loading = false),
              map(response => response.data),
            ))
      )
  }

}
