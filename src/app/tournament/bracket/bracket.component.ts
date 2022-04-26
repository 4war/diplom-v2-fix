import {Component, OnInit} from '@angular/core';
import {NgttTournament} from "ng-tournament-tree";
import {TestTournament} from "../../shared/viewModels/TestTournament";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Tournament} from "../../shared/Tournament";
import {ITab} from "../ITab";
import {filter} from "rxjs";
import {Bracket} from "../../shared/Bracket";
import {BracketService} from "../../services/bracket.service";
import {Match} from "../../shared/Match";
import {Round} from "../../shared/Round";
import Enumerable from "linq";
import from = Enumerable.from;

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit, ITab {

  bracket!: NgttTournament;
  tournament!: Tournament;
  tournamentId!: number;
  round!: Round;
  match!: Match;
  final?: Match;

  constructor(public general: GeneralService,
              private tournamentService: TournamentService,
              private bracketService: BracketService,
              private route: ActivatedRoute,
              private router: Router) {

    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(response => this.reInit());

    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    this.reInit();
  }

  ngOnInit(): void {
  }

  reInit(): void {
    if (this.tournamentId) {
      this.tournamentService.getSingleTournament(this.tournamentId).subscribe(response =>
        this.tournament = response,
      );

      this.bracketService.getBracket(this.tournamentId).subscribe(response => {
        this.bracket = response;
      });
    }
  }

  update(): void{
    this.bracket.rounds[4].matches[0].player2.surname = "Ыд";
  }
}
