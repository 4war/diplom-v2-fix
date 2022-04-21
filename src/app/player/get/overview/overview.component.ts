import { Component, OnInit } from '@angular/core';
import {Player} from "../../../shared/Player";
import {PlayerService} from "../../../services/player.service";
import {GeneralService} from "../../../services/general.service";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css']
})
export class PlayerOverviewComponent implements OnInit {

  player!: Player;
  playerId!: number;

  constructor(private playerService: PlayerService,
              general: GeneralService,
              private route: ActivatedRoute,
              private router: Router) {

    this.route.params.subscribe(response =>
      this.playerId = response["id"]
    );

    this.playerService.getPlayer(this.playerId).subscribe(response =>
      this.player = response
    );
  }


  ngOnInit(): void {
  }

}
