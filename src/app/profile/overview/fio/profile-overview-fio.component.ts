import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Player} from "../../../shared/Player";
import {PlayerService} from "../../../services/player.service";
import {Account} from "../../../shared/Account";
import {GeneralTournamentService} from "../../../services/general-tournament.service";

@Component({
  selector: 'app-profile-overview-fio',
  templateUrl: './profile-overview-fio.component.html',
  styleUrls: ['./profile-overview-fio.component.css']
})
export class ProfileOverviewFioComponent implements OnInit {

  player?: Player;
  account?: Account;

  constructor(private authService: AuthService,
              public playerService: PlayerService,
              private generalTournamentService: GeneralTournamentService) {

    this.authService.getCurrentAccount().subscribe(a => this.account = a);
    this.player = this.account?.player;
  }

  ngOnInit(): void {
  }

}
