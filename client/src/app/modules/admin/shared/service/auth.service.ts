import {Injectable, NgModule} from '@angular/core';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {environment} from '../../../../../environments/environment';
import {Observable, Subject, throwError} from 'rxjs';
import {FbAuthResponse, User} from '../../../../shared/interface';
import {catchError, tap} from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class AuthService {

  private token = null

  constructor(
    private http: HttpClient) {
  }

  error$: Subject<string> = new Subject<string>()

  getToken(): string {
    return localStorage.getItem('auth-token')
  }

  setToken(token: string): void {
    this.token = token
  }

  logout(): void {
    this.setToken(null)
  }

  loginAdmin(user: User): Observable<{token: string}> {
    console.log('loginAdmin')
    return this.http.post<{token: string}>(`/api/auth/admin/login`, user)
      .pipe(
        tap(
          ({token}) => {
            console.log('loginAdminToken')
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }

        ),
        catchError(this.handleError.bind(this))
      )
  }

  login(user: User): Observable<{token: string}> {
    return this.http.post<{token: string}>(`/api/auth/login`, user)
      .pipe(
        tap(
          ({token}) => {
            localStorage.setItem('auth-token', token)
            this.setToken(token)
          }

        ),
        catchError(this.handleError.bind(this))
      )
  }

  register(user: User): Observable<{token: string}> {
    console.log(user);
    return this.http.post<{token: string}>(`/api/auth/register`, user)
      // .pipe(
      //   tap(
      //     ({token}) => {
      //       localStorage.setItem('auth-token', token)
      //       this.setToken(token)
      //     }
      //
      //   ),
      //   catchError(this.handleError.bind(this))
      // )
  }

  isAuthenticated(): boolean {
    return !!this.getToken()
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.log(error)
    const {message} = error.error.error

    switch (message) {
      case 'INVALID_EMAIL':
        this.error$.next('Неверный email')
        break
      case 'INVALID_PASSWORD':
        this.error$.next('Неверный пароль')
        break
      case 'EMAIL_NOT_FOUND':
        this.error$.next('Email не найден')
        break
    }

    return throwError(error)
  }
}
