import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../../services/player.service";
import {Player} from "../../../shared/Player";
import {AuthService} from "../../../services/auth.service";
import {Account} from "../../../shared/Account";

@Component({
  selector: 'app-profile-overview-statistics',
  templateUrl: './profile-overview-statistics.component.html',
  styleUrls: ['./profile-overview-statistics.component.css']
})
export class ProfileOverviewStatisticsComponent implements OnInit {

  player?: Player;
  winRate?: number;

  timeRanges = [
    {min: '08', max: 10, played: 3, won: 2},
    {min: 10, max: 12, played: 0, won: 0},
    {min: 12, max: 14, played: 0, won: 0},
    {min: 14, max: 16, played: 0, won: 0},
    {min: 16, max: 18, played: 0, won: 0},
    {min: 18, max: 20, played: 0, won: 0},
    {min: 20, max: 22, played: 0, won: 0},
  ];

  account?: Account;

  constructor(private authService: AuthService,
              private playerService: PlayerService) {
    this.authService.getCurrentAccount().subscribe(a => this.account = a);
    this.player = this.account?.player;
    if (this.player)
      this.playerService.getPlayerWinRate(this.player?.rni).subscribe(response =>
          this.winRate = response);
  }

  ngOnInit():void {
  }

}
