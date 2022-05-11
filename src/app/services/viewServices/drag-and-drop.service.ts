import { Injectable } from '@angular/core';
import {CdkDropList} from "@angular/cdk/drag-drop";
import {Player} from "../../shared/Player";
import {Match} from "../../shared/Match";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  bracketDropLists: CdkDropList<Player>[] = [];
  scheduleDropLists: CdkDropList<Match>[] = [];
  isDraggingBracket = false;
  isDraggingSchedule = false;

  constructor() { }

  public registerInBracket(dropList: CdkDropList) {
    this.bracketDropLists.push(dropList);
  }

  public registerInSchedule(dropList: CdkDropList) {
    this.scheduleDropLists.push(dropList);
  }
}
