import {Component, OnInit} from '@angular/core';
import {GeneralTournamentService} from "../../../services/general-tournament.service";
import {PlayerService} from "../../../services/player.service";
import {Router} from "@angular/router";
import {Stage, Tournament} from "../../../shared/Tournament";
import Enumerable from "linq";
import from = Enumerable.from;

@Component({
  selector: 'app-tournaments',
  templateUrl: './get-player-tournaments.component.html',
  styleUrls: ['./get-player-tournaments.component.css']
})
export class GetPlayerTournamentsComponent implements OnInit {

  playerRni!: number;
  tournaments: Tournament[] = [];
  displayedColumns = ["Index", "Name", "Category", "Date", "City", "Age", "Point"];

  constructor(public general: GeneralTournamentService,
              private playerService: PlayerService,
              private router: Router) {

    this.playerRni = this.general.currentPlayerRni;

    this.playerService.getTournaments(this.playerRni).subscribe(response =>
      this.tournaments = from(response).where(t => t.stage == Stage.Main).toArray(),
    );
  }

  ngOnInit(): void {
  }

  redirectToTournament(id: number): void{
    this.router.navigateByUrl(`tournament/${id}`);
  }
}
