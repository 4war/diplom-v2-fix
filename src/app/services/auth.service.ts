import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {JwtHelperService} from "@auth0/angular-jwt";
import {Router} from "@angular/router";
import {server} from "../../environments/environment";
import {Token} from "@angular/compiler"
import {Account} from "../shared/Account";
import {Player} from "../shared/Player";
import {A} from "@angular/cdk/keycodes";
import {Role} from "../profile/profile.component";

export const ACCESS_TOKEN_KEY = 'token';
export const CURRENT_USER_EMAIL = 'email';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private account?: Account;
  role?: Role;

  constructor(private httpClient: HttpClient,
              private jwtHelper: JwtHelperService,
              private router: Router) {
  }

  getCurrentAccount(): Observable<Account> {
    return new Observable((subscriber => {
      if (this.account) subscriber.next(this.account);
      if (!this.account) {
        if (this.isAuthenticated()) {
          let email = localStorage.getItem(CURRENT_USER_EMAIL);
          if (email) {
            this.getAccount(email).subscribe(response => {
              this.account = response;
              this.role = this.defineRole(this.account.roles);
              subscriber.next(response);
            });
          }
        } else {
          this.router.navigateByUrl('auth/login');
        }
      }
    }))
  }

  setAccount(account: Account): void {
    this.account = account;
    this.role = this.defineRole(this.account.roles);
  }

  defineRole(roles: string): Role {
    let split = roles.split(' ');
    if (split.includes("admin"))
      return Role.Admin;

    if (split.includes("org"))
      return Role.Org;

    return Role.User;
  }

  login(email: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>(`${server}/authorization/login`, {email, password})
      .pipe(tap((token: any) => {
        if (token && token != "undefined") {
          localStorage.setItem(CURRENT_USER_EMAIL, email);
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token);
        }
      }));
  }

  isAuthenticated(): boolean {
    let token = localStorage.getItem(ACCESS_TOKEN_KEY);
    return !!token && token != "undefined" && !this.jwtHelper.isTokenExpired(token);
  }

  logout(): void {
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(CURRENT_USER_EMAIL);
    this.account = undefined;
    this.role = undefined;
    this.router.navigateByUrl('auth/login');
  }

  register(email: string, password: string): Observable<Token> {
    return this.httpClient.post<Token>(`${server}/authorization/register`, {email, password})
      .pipe(tap((token: any) => {
        if (token)
          localStorage.setItem(ACCESS_TOKEN_KEY, token.access_token)
      }));
  }

  getAccount(email: string): Observable<Account> {
    return this.httpClient.post<Account>(`${server}/authorization`, JSON.stringify(email), {
      headers: {'Content-Type': 'application/json'}
    });
  }

  bindPlayerToAccount(account: Account, rni: number): Observable<any> {
    //todo: it is possible that accounts won't be connected, if so, use email instead
    return this.httpClient.patch<any>(`${server}/profile/connect/${rni}`, account);
  }
}
