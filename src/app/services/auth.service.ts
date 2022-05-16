import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {server} from "../../environments/environment";
import {Token} from "@angular/compiler"

export const ACCESS_TOKEN_KEY = 'token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService,
              private router: Router) {
  }

  login(email: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>(`${server}/authorization/login`, {email, password})
      .pipe(tap((token: any) => {
        if (token)
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
      }))
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!token && token != "undefined" && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    this.router.navigateByUrl('auth/login');
  }

  register(email: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>(`${server}/authorization/register`, {email, password})
      .pipe(tap((token: any) => {
        if (token)
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
      }));
  }
}
