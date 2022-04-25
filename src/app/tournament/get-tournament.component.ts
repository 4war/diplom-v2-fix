import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../services/general.service";
import {Tournament} from "../shared/Tournament";
import {NgttTournament} from "ng-tournament-tree";
import {TestTournament} from "../shared/viewModels/TestTournament";
import {Player} from "../shared/Player";
import {TournamentService} from "../services/tournament.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TournamentFactory} from "../shared/TournamentFactory";
import {F} from "@angular/cdk/keycodes";
import {BracketComponent} from "./bracket/bracket.component";

@Component({
  selector: 'app-get-single-tournament',
  templateUrl: './get-tournament.component.html',
  styleUrls: ['./get-tournament.component.scss']
})

export class GetTournamentComponent implements OnInit {

  tournament!: Tournament;
  tournamentId!: number;
  factory!: TournamentFactory;

  constructor(public general: GeneralService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router) {
    this.route.params.subscribe(response => {
      this.tournamentId = response['id'];
    });

    tournamentService.getSingleTournament(this.tournamentId).subscribe(response =>
      this.tournament = response,
    );

    tournamentService.getSingleFactory(this.tournamentId, false).subscribe(response =>
      this.factory = response,
    );
  }

  ngOnInit(): void {
  }

  redirectToFactory(): void {
    this.router.navigateByUrl(`factory/get`);
  }

  redirectToTournamentInFactory(id: number): void {
    this.router.navigateByUrl(`tournament/${id}/${this.general.currentTournamentTab}`);
  }

  redirectToTab(tab: string): void{
    this.general.currentTournamentTab = tab;
    this.router.navigateByUrl(`tournament/${this.tournamentId}/${tab}`);
  }

}
