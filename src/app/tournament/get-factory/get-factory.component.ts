import { Component, OnInit } from '@angular/core';
import {TournamentFactory} from "../../shared/TournamentFactory";
import {TournamentService} from "../../services/tournament.service";
import {GeneralService} from "../../services/general.service";
import Enumerable from "linq";

@Component({
  selector: 'app-get-factory',
  templateUrl: './get-factory.component.html',
  styleUrls: ['./get-factory.component.scss', '../../../styles.css']
})
export class GetFactoryComponent implements OnInit {

  factory: TournamentFactory;

  constructor(private tournamentService: TournamentService, private general: GeneralService) {
    this.factory = general.currentFactory;
  }

  ngOnInit(): void {
  }
}
