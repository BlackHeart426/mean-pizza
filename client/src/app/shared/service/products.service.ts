import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {FbCreateResponse, Product} from '../interface';
import {environment} from '../../../environments/environment';
import {Observable} from 'rxjs';
import {map, tap} from 'rxjs/operators';

// @ts-ignore
@Injectable({providedIn: 'root'})
export class ProductsService {
  constructor(private _http: HttpClient) {
  }

  // create(product: Product, category): Observable<Product> {
  //   return this._http.post(`${environment.fbDbUrl}/products/${category}.json`, product)
  //     .pipe(
  //       map((response: FbCreateResponse) => {
  //         return {
  //           ...product,
  //           id: response.name,
  //           date: new Date(product.date)
  //         }
  //       })
  //     )
  // }
  //
  // getByIdIdAndCategory(id, category): Observable<Product> {
  //   return this._http.get<Product>(`${environment.fbDbUrl}/products/${category}/${id}.json`)
  //     .pipe(
  //       map((product: Product) => {
  //         return {
  //           ...product,
  //           id,
  //           date: new Date(product.date)
  //         }
  //       })
  //     )
  // }
  //
  // update(product, category): Observable<any> {
  //   return this._http.patch<Product>(`${environment.fbDbUrl}/${category}/${product.id}.json`, product)
  // }
  //
  // remove(id: string, category): Observable<void> {
  //   return this._http.delete<void>(`${environment.fbDbUrl}/products/${category}/${id}.json`)
  // }
  //
  // getAllByCategory(category): Observable<Product[]> {
  //   return this._http.get(`${environment.fbDbUrl}/products/${category}.json`)
  //     .pipe(
  //       map((response: {[key: string]: any}) => {
  //         if (response === null) {
  //           return null
  //         }
  //         return Object
  //           .keys(response)
  //           .map(key => ({
  //             ...response[key],
  //             id: key,
  //             date: new Date(response[key].date)
  //           }))
  //       })
  //     )
  // }
  //
  // getAll(): Observable<Product[]> {
  //   return this._http.get(`${environment.fbDbUrl}/products.json`)
  //     .pipe(
  //       map((response: {[category: string]: any}) => {
  //         const data = Object
  //           .values(response)
  //           .map(product => {
  //             return Object
  //               .keys(product)
  //               .map(key => ({
  //                 ...product[key],
  //                 id: key,
  //                 date: new Date(product[key].date)
  //               }))
  //           })
  //         return [].concat(...data)
  //       })
  //     )
  // }
}
//
// Object
//   .keys(response)
//   .map(key => ({
//     ...response[key],
//     id: key,
//     date: new Date(response[key].date)
//   }))
