import { Injectable } from '@angular/core';
import {CdkDropList} from "@angular/cdk/drag-drop";
import {Player} from "../../shared/Player";
import {Element} from "@angular/compiler";

@Injectable({
  providedIn: 'root'
})
export class DragAndDropService {
  dropLists: CdkDropList[] = [];
  isDraggingMatch = false;

  constructor() { }

  public register(dropList: CdkDropList) {
    this.dropLists.push(dropList);
  }
}
