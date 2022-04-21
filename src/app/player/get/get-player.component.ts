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



  ngOnInit(): void {
  }

}
