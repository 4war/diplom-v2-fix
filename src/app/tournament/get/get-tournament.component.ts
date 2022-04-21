import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {Tournament} from "../../shared/Tournament";
import {NgttTournament} from "ng-tournament-tree";
import {TestTournament} from "../../shared/viewModels/TestTournament";
import {Player} from "../../shared/Player";
import {TournamentService} from "../../services/tournament.service";
import {Observable} from "rxjs";
import {ActivatedRoute, Route, Router} from "@angular/router";

@Component({
  selector: 'app-get-single-tournament',
  templateUrl: './get-tournament.component.html',
  styleUrls: ['./get-tournament.component.scss']
})
export class GetTournamentComponent implements OnInit {
  get players(): Player[] {
    return this._players;
  }

  set players(value: Player[]) {
    this._players = value;
  }

  tournament!: Tournament;
  tournamentId!: number;
  private _players!: Player[];

  singleTournamentViewModel: NgttTournament = new TestTournament();

  constructor(private general: GeneralService, private tournamentService: TournamentService, private route: ActivatedRoute) {
    this.route.params.subscribe(response => {
      this.tournamentId = response['id'];
    });

    tournamentService.getSingleTournament(this.tournamentId).subscribe(response =>
      this.tournament = response
    );

    tournamentService.getPlayerList(this.tournamentId).subscribe(response =>
      this.players = response,
    );
  }


  ngOnInit(): void {
  }


  update(): void{
    let a = this.players;
    debugger;
  }
}
