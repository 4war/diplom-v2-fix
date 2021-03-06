import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';

import {
  CdkDrag,
  CdkDragDrop,
  CdkDragEnd,
  CdkDragStart,
  CdkDropList, DragRef, DropListRef,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import {GeneralTournamentService} from "../../../../services/general-tournament.service";
import {DragAndDropService} from "../../../../services/viewServices/drag-and-drop.service";
import {BracketService} from "../../../../services/bracket.service";
import {Player} from "../../../../shared/Player";
import {Match} from "../../../../shared/Match";
import {Round} from "../../../../shared/Round";


@Component({
  selector: 'app-player-in-bracket',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  @ViewChild(CdkDropList) dropList?: CdkDropList;
  @Input() player?: Player;
  @Input() orderInBracket = 0;
  @Input() showPosition = false;
  @Output() onAdd = new EventEmitter<Player | undefined>();

  playerArray: Player[] = [];

  constructor(public general: GeneralTournamentService,
              public dragDropService: DragAndDropService,
              public bracketService: BracketService){
  }

  ngOnInit(): void {
    if (this.player)
      this.playerArray.push(this.player);
  }

  ngAfterViewInit(): void {
    if (this.dropList) {
      this.dragDropService.registerInBracket(this.dropList);
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

      this.player = this.playerArray[0];
      this.onAdd.emit(this.player);
    }
  }

  dragStart(event: CdkDragStart): void {
    this.dragDropService.isDraggingBracket = true;
  }

  dragEnd(event: CdkDragEnd): void {
    this.dragDropService.isDraggingBracket = false;
  }

  dragDrop(event: CdkDragDrop<Player>) {
    if (event.previousContainer === event.container)
      return;

    this.player = undefined;
    this.playerArray = [];
  }

  public predicate = (drag: CdkDrag, drop: CdkDropList) => {
    return (drop.data as Player[]).length == 0;
  }
}
