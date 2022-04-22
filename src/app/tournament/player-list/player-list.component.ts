import { Component, OnInit } from '@angular/core';
import {Tournament} from "../../shared/Tournament";
import {Player} from "../../shared/Player";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit {

  tournament!: Tournament;
  tournamentId!: number;
  players!: Player[];

  displayedColumns = ["Index", "FIO", "DoB", "City", "Points"];

  constructor(public general: GeneralService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router) {
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


  redirectToPlayer(rni: number): void {
    this.router.navigateByUrl(`player/${rni}`);
  }

}
