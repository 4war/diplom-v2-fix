import { Injectable } from '@angular/core';
import {CdkDropList} from "@angular/cdk/drag-drop";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  dropLists: CdkDropList[] = [];
  isDraggingBracket = false;
  isDraggingSchedule = false;

  constructor() { }

  public register(dropList: CdkDropList) {
    this.dropLists.push(dropList);
  }
}
