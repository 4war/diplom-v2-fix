import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {  CdkDropList } from "@angular/cdk/drag-drop";


import Enumerable from "linq";
import {GeneralService} from "../../../services/general.service";
import {PlayerService} from "../../../services/player.service";
import {DragAndDropService} from "../../../services/viewServices/drag-and-drop.service";
import {Player} from "../../../shared/Player";
import {Match} from "../../../shared/Match";

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
  @Input() match?: Match;
  score1: Digit[] = [];
  score2: Digit[] = [];

  player1?: Player;
  player2?: Player;

  testData: Player[] = [];

  ngOnInit(): void {
    this.update();
  }


  update(): void {
    this.player1 = this.match?.player1;
    this.player2 = this.match?.player2;
    this.updateScore();
  }

  updateScore(): void {
    let score = this.match?.score;

    if (!score)
      return;

    if (score.toLowerCase().startsWith("отказ")) {
      //todo: do smth
      return;
    }

    this.score1 = [];
    this.score2 = [];
    let split = score.split(" ");
    for (let set of split) {
      if (set.length < 2)
        break;

      let reverseFactor = this.match?.player1?.rni == this.match?.winner?.rni ? 0 : 1;
      let game1 = parseInt(set[reverseFactor]);
      let game2 = parseInt(set[1 - reverseFactor]);

      let digit1 = new Digit();
      digit1.win = game1 > game2;
      digit1.value = game1;

      let digit2 = new Digit();
      digit2.win = game1 < game2;
      digit2.value = game2;

      this.score1.push(digit1);
      this.score2.push(digit2);
    }
  }


}

class Digit {
  win = false;
  value?: number;
}
