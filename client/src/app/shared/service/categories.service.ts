import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Category, FbCreateResponse} from '../interface';
import {Observable} from 'rxjs';
import {environment} from '../../../environments/environment';
import {map} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class CategoriesService {
  constructor(private _http: HttpClient) {
  }

  create(category: Category): Observable<Category> {
    return this._http.post(`${environment.fbDbUrl}/categories.json`, category)
      .pipe(map((response: FbCreateResponse) => {
        return {
          ...category,
          id: response.name,
          date: new Date(category.date)
        };
      }));
  }

  getAll(): Observable<Category[]> {
    return this._http.get(`${environment.fbDbUrl}/categories.json`)
      .pipe(
        map((response: {[key: string]: any}) => {
          return Object
            .keys(response)
            .map(key => ({
              ...response[key],
              id: key,
              date: new Date(response[key].date)
            }))
        })
      )
  }
}
