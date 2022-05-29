import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../../../shared/Player";
import {PlayerService} from "../../../services/player.service";
import {GeneralTournamentService} from "../../../services/general-tournament.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class PlayerOverviewComponent implements OnInit {

  player!: Player;

  constructor(private general: GeneralTournamentService, private playerService: PlayerService) {
    this.playerService.getPlayer(this.general.currentPlayerRni).subscribe(response =>
      this.player = response
    );
  }

  ngOnInit(): void {
  }

}
