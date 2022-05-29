import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ACCESS_TOKEN_KEY, AuthService, CURRENT_USER_EMAIL} from "../../services/auth.service";
import {Account} from "../../shared/Account";
import {SeekPlayerDialogComponent} from "../../helpComponents/seek-player-dialog/seek-player-dialog.component";
import {MatDialog} from "@angular/material/dialog";

@Component({
  selector: 'app-settings',
  templateUrl: './profile-user-settings.component.html',
  styleUrls: ['./profile-user-settings.component.scss']
})
export class ProfileUserSettingsComponent implements OnInit, AfterViewInit {
  account?: Account;

  constructor(public authService: AuthService,
              private dialog: MatDialog) {
    this.authService.getCurrentAccount().subscribe(a => {
      this.account = a;
      this.reInit();
    });
  }

  reInit(): void {
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
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
}
