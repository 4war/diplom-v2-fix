import { Component, OnInit } from '@angular/core';
import {Player} from "../../shared/Player";
import {GeneralService} from "../../services/general.service";
import {PlayerService} from "../../services/player.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-player',
  templateUrl: './get-player-list.component.html',
  styleUrls: ['./get-player-list.component.css']
})
export class GetPlayerListComponent implements OnInit {

  players?: Player[];
  displayedColumns = ["RNI", "FIO", "DoB", "City", "Points"];

  constructor(public general: GeneralService,
              private playerService: PlayerService,
              private router: Router) {

    playerService.getPlayerList().subscribe(response => this.players = response);
  }

  ngOnInit(): void {
  }

  redirectToPlayer(rni: number): void{
    this.router.navigateByUrl(`player/${rni}`);
  }
}
