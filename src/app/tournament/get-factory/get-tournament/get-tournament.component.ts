import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../services/general.service";
import {Tournament} from "../../../shared/Tournament";


@Component({
  selector: 'app-get-single-tournament',
  templateUrl: './get-tournament.component.html',
  styleUrls: ['./get-tournament.component.scss']
})
export class GetTournamentComponent implements OnInit {
  tournament: Tournament;

  constructor(private general: GeneralService) {
    this.tournament = general.currentTournament;
  }

  ngOnInit(): void {
  }

}
