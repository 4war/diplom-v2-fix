import { Component, OnInit } from '@angular/core';
import Enumerable from "linq";
import {TournamentFactory} from "../../shared/TournamentFactory";
import {GeneralService} from "../../services/general.service";
import from = Enumerable.from;
import {ages} from "../../defaults";
import {Router} from "@angular/router";
import {Stage, Tournament} from "../../shared/Tournament";

@Component({
  selector: 'app-overview',
  templateUrl: './get-factory.component.html',
  styleUrls: ['./get-factory.component.scss']
})
export class GetFactoryComponent implements OnInit {

  factory: TournamentFactory;
  mainTournaments: Tournament[];

  constructor(public general: GeneralService,
              private router: Router) {

    this.factory = general.currentFactory;
    this.mainTournaments = from(this.factory.tournaments).where(t => t.stage == Stage.Main).toArray();
  }

  ngOnInit(): void {
  }

  redirectToTournament(id: number){
    this.router.navigateByUrl(`tournament/${id}`);
  }
}
