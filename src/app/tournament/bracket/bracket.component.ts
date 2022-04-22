import { Component, OnInit } from '@angular/core';
import {NgttTournament} from "ng-tournament-tree";
import {TestTournament} from "../../shared/viewModels/TestTournament";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Tournament} from "../../shared/Tournament";

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.css']
})
export class BracketComponent implements OnInit {

  singleTournamentViewModel: NgttTournament = new TestTournament();
  tournament!: Tournament;
  tournamentId!: number;

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
  }

  ngOnInit(): void {
  }
}
