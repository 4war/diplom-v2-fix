import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../services/general.service";
import {Tournament} from "../../shared/Tournament";
import {NgttTournament} from "ng-tournament-tree";
import {TestTournament} from "../../shared/viewModels/TestTournament";

@Component({
  selector: 'app-get-single-tournament',
  templateUrl: './get-tournament.component.html',
  styleUrls: ['./get-tournament.component.scss']
})
export class GetTournamentComponent implements OnInit {
  tournament: Tournament;
  singleTournamentViewModel: NgttTournament = new TestTournament();

  constructor(private general: GeneralService) {
    this.tournament = general.currentTournament;
  }

  ngOnInit(): void {
  }

}
