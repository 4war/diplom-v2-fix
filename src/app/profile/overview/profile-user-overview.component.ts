import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Account} from "../../shared/Account";
import {Role} from "../profile.component";

@Component({
  selector: 'app-overview',
  templateUrl: './profile-user-overview.component.html',
  styleUrls: ['./profile-user-overview.component.scss']
})
export class ProfileUserOverviewComponent implements OnInit {

  account?: Account;
  visible = false;

  constructor(public authService: AuthService) {
    this.authService.getCurrentAccount().subscribe(x => {
      this.account = x;
      this.visible = this.authService.role == Role.User;
      this.reInit();
    });
  }

  reInit(): void{

  }

  ngOnInit(): void {
  }

}
