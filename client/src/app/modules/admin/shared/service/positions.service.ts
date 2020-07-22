import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Message, Position} from '../interfaces'


@Injectable({providedIn: 'root'})
export class PositionsService {
  constructor(
    private http: HttpClient
  ) {
  }

  getAll(): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/`)
  }

  fetch(categoryId: string): Observable<Position[]> {
    return this.http.get<Position[]>(`/api/position/category/${categoryId}`)
  }

  getById(id: string): Observable<Position> {
    return this.http.get<Position>(`/api/position/${id}`)
  }

  create(position: Position, image: File): Observable<Position> {
    const fd = new FormData()

    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', position.name)
    fd.append('subtitle', position.subtitle)
    fd.append('description', position.description)
    fd.append('category', position.category)
    fd.append('sale', position.sale)
    fd.append('cost', position.cost)
    return this.http.post<Position>('/api/position', fd)
  }

  update(position: Position, image: File): Observable<Position> {

    const fd = new FormData()
    if (image) {
      fd.append('image', image, image.name)
    }
    fd.append('name', position.name)
    fd.append('subtitle', position.subtitle)
    fd.append('description', position.description)
    fd.append('sale', position.sale)
    fd.append('cost', position.cost)
    console.log(position)
    this.http.patch<Position>(`/api/position/${position._id}`, fd).subscribe(
      item => {
          console.log('123')
        },
      () => {
        console.log('error')})
    return this.http.patch<Position>(`/api/position/${position._id}`, fd)
  }

  delete(position: Position): Observable<Message> {
    return this.http.delete<Message>(`/api/position/${position._id}`)
  }
}
