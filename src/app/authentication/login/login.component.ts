import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  remember = false;

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  login(email: string, password: string): void{
    this.authService.login(email, password)
      .subscribe(response => { this.router.navigateByUrl('profile')
      }, error => {
        alert('Неверно введен логин или пароль');
      });
  }
}
