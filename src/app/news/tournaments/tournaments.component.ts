import { Component, OnInit } from '@angular/core';
import {TournamentFactory} from "../../shared/TournamentFactory";

@Component({
  selector: 'app-tournaments',
  templateUrl: './tournaments.component.html',
  styleUrls: ['./tournaments.component.scss']
})
export class TournamentsComponent implements OnInit {

  tournaments: TournamentFactory[] = [];

  constructor() { }

  ngOnInit(): void {
  }

}
