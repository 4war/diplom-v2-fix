import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CdkDropList} from "@angular/cdk/drag-drop";

import Enumerable from "linq";
import {GeneralService} from "../../../services/general.service";
import {PlayerService} from "../../../services/player.service";
import {DragAndDropService} from "../../../services/viewServices/drag-and-drop.service";
import {Player} from "../../../shared/Player";
import {Match} from "../../../shared/Match";
import {Digit, Score} from "../../../shared/Score";

@Component({
  selector: 'app-single-match-preview',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})
export class SingleMatchComponent implements OnInit {

  constructor(public general: GeneralService,
              public dragDropService: DragAndDropService,
              private playerService: PlayerService) {
  }

  @ViewChild(CdkDropList) dropList?: CdkDropList;
  @Input() match!: Match;
  @Output() onMatchChange = new EventEmitter<Match>();
  score1: Digit[] = [];
  score2: Digit[] = [];

  ngOnInit(): void {
    this.update();
  }

  update(): void {
    this.updateScore();
  }

  updateScore(): void {
    if (this.match) {
      let score = new Score(this.match);
      this.score1 = score.playerScore1;
      this.score2 = score.playerScore2;
    }
  }

  setPlayer1(player?: Player): void {
    this.match.player1 = player;
    this.onMatchChange.emit(this.match);
  }

  setPlayer2(player?: Player): void {
    this.match.player2 = player;
    this.onMatchChange.emit(this.match);
  }
}
