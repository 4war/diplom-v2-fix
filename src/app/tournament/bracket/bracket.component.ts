import { Component, OnInit } from '@angular/core';
import {NgttTournament} from "ng-tournament-tree";
import {TestTournament} from "../../shared/viewModels/TestTournament";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Tournament} from "../../shared/Tournament";
import {ITab} from "../ITab";
import {filter} from "rxjs";
import {Bracket} from "../../shared/Bracket";

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit, ITab {

  bracket: NgttTournament = new Bracket();
  tournament!: Tournament;
  tournamentId!: number;

  constructor(public general: GeneralService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router) {

    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(response => this.reInit());

    this.reInit();
  }

  ngOnInit(): void {
  }

  reInit(): void {
    this.route.params.subscribe(response => {
      this.tournamentId = response['id'];
    });

    this.tournamentService.getSingleTournament(this.tournamentId).subscribe(response =>
      this.tournament = response,
    );
  }
}
