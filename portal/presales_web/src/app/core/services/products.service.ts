/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-trailing-spaces */
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'environments/environment';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IPaginateInfo } from '../interface/IpaginatedInfo.interface';
import { Product } from '../interface/product.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private backendUrl: string = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) {
  }

  getProducts(
    page: number = 0,
    limit: number = 10,
    filter: string = '',
    sortBy: string = 'description',
    descending: string | boolean = false,
  ): Observable<IPaginateInfo<Product>> {

    if (typeof descending == 'string' || !descending) {
      descending = descending === 'desc' ? true : false;
    }
    // console.log(releaseTo, releaseFrom);
    return this.httpClient.get<IPaginateInfo<Product>>(`${this.backendUrl}/api/products/list`, {

      // @ http params doesn't accept boolean
      // @ server should parse 
      params: new HttpParams()
        .set('page', page.toString())
        .set('limit', limit.toString())
        .set('filter', filter)
        .set('sortBy', sortBy)
        .set('descending', descending.toString())
    });
  }

  createProduct(obj: Product) {
    return this.httpClient.post<Product>(`${this.backendUrl}/api/products`, obj);
    // .pipe(map((data: Product) => data as ));
  }

  updateProduct(product) {
    return this.httpClient.put<Product>(`${this.backendUrl}/api/products/${product.id}`, product)
      .pipe(map((data: any) => data.data));
  }

  getProductById(id) {
    return this.httpClient.get<Product>(`${this.backendUrl}/api/products/${id}`)
      .pipe(map((data: any) => data.data));
  }

  deleteProduct(id) {
    return this.httpClient.delete(`${this.backendUrl}/api/products/${id}`);
  }
}
