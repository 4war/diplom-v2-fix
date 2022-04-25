import { Component, OnInit } from '@angular/core';
import {Player} from "../../shared/Player";

@Component({
  selector: 'app-player',
  templateUrl: './get-player-list.component.html',
  styleUrls: ['./get-player-list.component.css']
})
export class GetPlayerListComponent implements OnInit {

  players?: Player[];

  constructor() { }

  ngOnInit(): void {
  }

}
