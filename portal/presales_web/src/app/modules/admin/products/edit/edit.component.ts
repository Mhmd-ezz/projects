/* eslint-disable @angular-eslint/use-lifecycle-interface */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable @typescript-eslint/member-ordering */
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Product } from 'app/core/interface/product.interface';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FormUtilsService } from './../../../../core/common/form-utils.service';
import { ProductsService } from './../../../../core/services/products.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  private _unsubscribeAll: Subject<any> = new Subject<any>(); //not sure

  form: FormGroup;
  error: any;
  loading: boolean = false;
  isSaveLoading: boolean = false;
  isFormLoading: boolean = false;

  constructor(
    private _productsService: ProductsService,
    private router: Router,
    private _formBuilder: FormBuilder,
    private _formUtilsService: FormUtilsService,
    private _snackBar: MatSnackBar,
    private _route: ActivatedRoute

  ) { }

  ngOnInit() {
    this.loadProduct();

    // Initialize the form
    this.form = this._formBuilder.group({
      id: ['', Validators.required],
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
      id: this.form.get('id').value,
      name: this.form.get('name').value
    };

    this._productsService
      .updateProduct(product)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe(() => {
        this.loading = false;
        this._snackBar.open('Product updated.', 'Ok', {
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

  //--------------------------------------
  // Public Methods
  //--------------------------------------
  private loadProduct() {
    this._route.params
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((params) => {
        this.getProduct(params.id);
      });
  }

  getProduct(id: string) {
    this.isFormLoading = true;
    this._productsService
      .getProductById(id)
      .pipe(
        takeUntil(this._unsubscribeAll)
      )
      .subscribe((product: Product) => {

        this.form.patchValue(product);

        console.log(product);
        this.isFormLoading = false;
      });
  }
}
