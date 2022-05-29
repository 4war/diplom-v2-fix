import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Router} from "@angular/router";
import {FormControl, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(public authService: AuthService,
              private router: Router) {
  }

  ngOnInit(): void {
  }

  emailFormControl = new FormControl([''], Validators.email)

  register(email: string, password: string) {
    this.authService.register(email, password)
      .subscribe(response => this.router.navigateByUrl('profile'),
        error => {
          if (error.status == '400') {
            alert(`Пользователь с указанной почтой ${error.error.email} уже существует`);
          }
        });
  }
}
