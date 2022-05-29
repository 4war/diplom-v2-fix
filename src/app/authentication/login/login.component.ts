import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {Account} from "../../shared/Account";
import {server} from "../../../environments/environment";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember = false;
  account?: Account;

  constructor(public authService: AuthService,
              private router: Router) {
    this.authService.getCurrentAccount().subscribe(x => this.account = x);
  }

  ngOnInit(): void {
  }

  login(email: string, password: string): void {
    this.authService.login(email, password)
      .subscribe(response => {
        this.router.navigateByUrl('profile');
        this.authService.getAccount(email).subscribe(account => {
          this.authService.setAccount(account);
          this.account = account;
        });
      }, error => {
        alert('Неверно введен логин или пароль');
      });
  }
}
