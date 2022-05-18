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

  constructor(public authService: AuthService,
              private dialog: MatDialog) {
    this.reInit();
  }

  reInit(): void{
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
        if (this.authService.account && player) {
          this.authService.account!.player = player;
          this.authService.bindPlayerToAccount(this.authService.account, player.rni).subscribe();
        }
      }
    );
  }
}
