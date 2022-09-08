/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
/* eslint-disable no-trailing-spaces */
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { Product } from 'app/core/interface/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from './../../../../core/common/form-utils.service';
import { ProductsService } from './../../../../core/services/products.service';

@Component({
  selector: 'app-new',
  templateUrl: './new.component.html',
  styleUrls: ['./new.component.scss']
})
export class NewComponent {

  private _unsubscribeAll: Subject<any> = new Subject<any>();

  form: FormGroup;
  error: any;
  loading: boolean = false;

  constructor(
    private _productsService: ProductsService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _formUtilsService: FormUtilsService,
    private _snackBar: MatSnackBar
  ) { }

  ngOnInit() {
    // Initialize the form
    this.form = this._formBuilder.group({
      name: ['', Validators.required],
    });
  }

  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  //--------------------------------------
  // Public Methods
  //--------------------------------------
  save() {

    if (!this.form.valid) {
      this._formUtilsService.validateFormGroup(this.form);
      return;
    }

    this.loading = true;
    const product: Product = {
      name: this.form.get('name').value
    };

    this._productsService
      .createProduct(product)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.loading = false;
        this._snackBar.open('Opportunity created.', 'Ok', {
          duration: 4000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
        });
        this.router.navigate(['/products']);
      },
        (error) => {
          console.log(error);
          this.error = error.error;
          this.loading = false;
        });
  }

}
