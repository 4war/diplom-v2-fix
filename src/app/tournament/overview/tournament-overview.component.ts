import {Component, OnInit} from '@angular/core';
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {TournamentService} from "../../services/tournament.service";
import {Tournament} from "../../shared/Tournament";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Player} from "../../shared/Player";
import {filter} from "rxjs";
import {ITab} from "../ITab";

@Component({
  selector: 'app-overview',
  templateUrl: './tournament-overview.component.html',
  styleUrls: ['./tournament-overview.component.css']
})

export class TournamentOverviewComponent implements OnInit, ITab {

  tournament?: Tournament;
  tournamentId?: number;
  players?: Player[];
  qualificationPlayers?: Player[];

  constructor(public general: GeneralTournamentService,
              private tournamentService: TournamentService,
              private router: Router) {

      router.events.pipe(filter(e => e instanceof NavigationEnd && general.currentTournamentTab == "overview"))
        .subscribe(response => this.reInit());
  }

  ngOnInit(): void {
    this.reInit();
  }

  reInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.tournamentId){
      this.tournamentService.getTournament(this.tournamentId ?? 0).subscribe(response => {
          this.tournament = response;
          if (this.tournament.qualification) {
            this.tournamentService.getPlayerList(this.tournament.qualification.id).subscribe(qp =>
              this.qualificationPlayers = qp,
            );
          }
        }
      );

      this.tournamentService.getPlayerList(this.tournamentId ?? 0).subscribe(response =>
        this.players = response,
      );
    }
  }


}
