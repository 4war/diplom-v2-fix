import {Component, OnInit} from '@angular/core';
import {PlayerService} from "../../services/player.service";
import {GeneralService} from "../../services/general.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Player} from "../../shared/Player";

@Component({
  selector: 'app-get',
  templateUrl: './get-player.component.html',
  styleUrls: ['./get-player.component.css']
})
export class GetPlayerComponent implements OnInit {

  player!: Player;
  playerRni!: number;

  constructor(private playerService: PlayerService,
              private general: GeneralService,
              private route: ActivatedRoute,
              private router: Router) {

    this.route.params.subscribe(response =>
      this.playerRni = response["rni"],
    );

    this.general.currentPlayerRni = this.playerRni;

    this.playerService.getPlayer(this.playerRni).subscribe(response =>
      this.player = response
    );
  }

  ngOnInit(): void {
  }

}
