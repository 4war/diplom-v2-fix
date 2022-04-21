import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../../../services/general.service";
import {PlayerService} from "../../../services/player.service";
import {Router} from "@angular/router";
import {Tournament} from "../../../shared/Tournament";

@Component({
  selector: 'app-tournaments',
  templateUrl: './get-player-tournaments.component.html',
  styleUrls: ['./get-player-tournaments.component.css']
})
export class GetPlayerTournamentsComponent implements OnInit {

  playerRni!: number;
  tournaments: Tournament[] = [];

  constructor(private general: GeneralService,
              private playerService: PlayerService,
              private router: Router) {

    this.playerRni = this.general.currentPlayerRni;

    this.playerService.getTournaments(this.playerRni).subscribe(response =>
      this.tournaments = response
    );
  }

  ngOnInit(): void {
  }

  redirectToTournament(id: number): void{
    this.router.navigateByUrl(`factory/get/tournament/${id}`);
  }
}
