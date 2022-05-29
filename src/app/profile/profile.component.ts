import {Component, OnInit} from '@angular/core';
import {Account} from "../shared/Account";
import {AuthService, CURRENT_USER_EMAIL} from "../services/auth.service";
import {MatDialog} from "@angular/material/dialog";
import {SeekPlayerDialogComponent} from "../helpComponents/seek-player-dialog/seek-player-dialog.component";
import {Router} from "@angular/router";
import {FormControl} from "@angular/forms";
import Enumerable from "linq";
import from = Enumerable.from;
import {Player} from "../shared/Player";
import {TestService} from "../services/test.service";
import {ProfileService} from "../services/profile.service";

const folder = "assets/Images";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  imageSrc = `${folder}/missing.png`;
  role: Role = Role.User;

  userTabs: Tab[] = [
    {view: 'Обзор', link: 'overview'},
    {view: 'Матчи', link: 'matches'},
    {view: 'Турниры', link: 'tournaments'},
    {view: 'Тест', link: 'test'},
    {view: 'Уведомления', link: 'notifications'},
    {view: 'Настройки', link: 'settings'}
  ];

  orgTabs: Tab[] = [
    {view: 'Обзор', link: 'org/overview'},
    {view: 'Турниры', link: 'org/tournaments'},
    {view: 'Уведомления', link: 'org/tournaments'},
    {view: 'Настройки', link: 'org/settings'},
  ]

  userSelected = new FormControl(0);
  orgSelected = new FormControl(0);
  account?: Account;

  public get Roles(): typeof Role {
    return Role;
  }

  constructor(public authService: AuthService,
              private testService: TestService,
              private profileService: ProfileService,
              private router: Router,
              private dialog: MatDialog) {
    this.authService.getCurrentAccount().subscribe(a => {
      this.account = a;
      this.reInit();
    });
  }

  reInit(): void {
    if (!this.account) {
      if (this.authService.isAuthenticated()) {
        let email = localStorage.getItem(CURRENT_USER_EMAIL);
        if (email) {
          this.authService.getAccount(email).subscribe(response => {
            this.account = response;
            this.defineAccount(this.account);
            this.checkTest();
          });
        }
      }
    }

    if (this.account) {
      this.defineAccount(this.account);
    }

    this.defineTab();
  }

  checkTest(): void {
    if (this.account?.player) {
      this.testService.get(this.account.player.rni)
        .subscribe(list => {
          this.testService.testResults = list;
          if (list.length == 0) {
            this.profileService.notifications.push({
              read: false,
              message: 'Вы можете пройти тест',
              date: new Date(Date.now())
            })
          }
        })
    }
  }

  defineTab(): void {
    let tabLink = from(this.router.url.split('/')).last();
    if (this.role == Role.User) {
      let tabIndex = from(this.userTabs).indexOf(t => t.link == tabLink);
      if (tabIndex >= 0)
        this.userSelected.setValue(tabIndex);
    }
    if (this.role == Role.Org) {
      let tabIndex = from(this.orgTabs).indexOf(t => t.link == tabLink);
      if (tabIndex >= 0)
        this.orgSelected.setValue(tabIndex);
    }
  }

  defineAccount(account: Account): void {
    this.role = this.authService.defineRole(account.roles);
    this.imageSrc = this.defineImage(this.role, account.player);
  }

  ngOnInit(): void {
  }


  private defineImage(role: Role, player?: Player): string {
    if (role == Role.Admin)
      return `${folder}/org.png`;

    if (role == Role.Org)
      return `${folder}/org.png`;

    if (role == Role.User) {
      if (!player) return `${folder}/missing.png`;
      if (player.gender == 0) return `${folder}/man.png`;
      if (player.gender == 1) return `${folder}/woman.png`;
    }

    return `${folder}/missing.png`;
  }

  findPlayer(): void {
    this.dialog.open(SeekPlayerDialogComponent, {
      data: {
        tournamentId: undefined,
      }
    })
      .afterClosed().subscribe(player => {
        if (this.account && player) {
          this.account!.player = player;
          this.authService.bindPlayerToAccount(this.account, player.rni).subscribe();
        }
      }
    );
  }

  openTab(tab: Tab): void {
    this.router.navigateByUrl(`profile/${tab.link}`);
  }
}

class Tab {
  view!: string;
  link!: string;
}

export enum Role {
  User,
  Org,
  Admin
}
