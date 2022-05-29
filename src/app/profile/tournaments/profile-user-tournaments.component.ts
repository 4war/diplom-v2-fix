import {Component, OnInit} from '@angular/core';
import {Match} from "../../shared/Match";
import {Player} from "../../shared/Player";
import {AuthService} from "../../services/auth.service";
import {offset} from "../../single-match/duration/duration.component";
import {SingleMatchOverviewComponent} from "../../single-match/single-match.component";
import {TournamentResult} from "../../shared/TournamentResult";
import {PlayerService} from "../../services/player.service";
import {Router} from "@angular/router";
import {Account} from "../../shared/Account";

@Component({
  selector: 'app-tournaments',
  templateUrl: './profile-user-tournaments.component.html',
  styleUrls: ['./profile-user-tournaments.component.scss']
})
export class ProfileUserTournamentsComponent implements OnInit {

  tournamentResults: TournamentResult[] = [];
  player?: Player;
  account?: Account;
  displayedColumns = ["Name", "Category", "Age", "Date", "Place", "Points"];

  constructor(public authService: AuthService,
              private playerService: PlayerService,
              private router: Router) {
    this.authService.getCurrentAccount().subscribe(a => {
      this.account = a;
      this.reInit();
    });
  }

  reInit(): void {
    this.player = this.account?.player;
    if (this.player)
      this.playerService.getTournamentResults(this.player.rni)
        .subscribe(response => this.tournamentResults = response);
  }

  ngOnInit(): void {
  }

  open(id: number) {
    this.router.navigateByUrl(`tournament/${id}`);
  }
}
