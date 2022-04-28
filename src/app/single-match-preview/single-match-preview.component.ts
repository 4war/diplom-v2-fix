import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {Player} from "../shared/Player";
import {GeneralService} from "../services/general.service";
import {PlayerService} from "../services/player.service";
import {Match} from "../shared/Match";
import {F} from "@angular/cdk/keycodes";
import {
  CdkDragDrop,
  CdkDragEnd,
  CdkDragEnter,
  CdkDragStart, CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {DragAndDropService} from "../services/viewServices/drag-and-drop.service";
import Enumerable from "linq";
import from = Enumerable.from;

@Component({
  selector: 'app-single-match-preview',
  templateUrl: './single-match-preview.component.html',
  styleUrls: ['./single-match-preview.component.scss']
})
export class SingleMatchPreviewComponent implements OnInit {

  constructor(public general: GeneralService,
              public dragDropService: DragAndDropService,
              private playerService: PlayerService) {
    this.tempDeleteMePls = general.missingPlayers;
  }

   @ViewChild(CdkDropList) dropList?: CdkDropList;
  //@ViewChild("someInput") dropList?: CdkDropList;
  @Input() match?: Match;
  score1: Digit[] = [];
  score2: Digit[] = [];

  player1?: Player;
  player2?: Player;


  tempDeleteMePls?: Player[] = [];

  testData: Player[] = [];

  ngOnInit(): void {
    this.update();
  }


  ngAfterViewInit(): void {
    if (this.dropList) {
      this.dragDropService.register(this.dropList);
    }
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

  dropHandle(event: CdkDragDrop<Player[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );
    }
  }

  dragStart(event: CdkDragStart): void {
    this.dragDropService.isDraggingMatch = true;
    let a = this.dragDropService.dropLists;
  }

  dragEnd(event: CdkDragEnd): void {
    this.dragDropService.isDraggingMatch = false;
  }
}

class Digit {
  win = false;
  value?: number;
}
