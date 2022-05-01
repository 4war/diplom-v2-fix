import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../shared/Match";
import {Player} from "../../shared/Player";

@Component({
  selector: 'app-player-in-match-dialog',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerInMatchDialogComponent implements OnInit {

  constructor() { }

  @Input() match?: Match;
  @Input() player?: Player;

  ngOnInit(): void {
  }

}
