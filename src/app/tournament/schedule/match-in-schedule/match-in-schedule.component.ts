import {AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Match} from "../../../shared/Match";
import {MatDialog} from "@angular/material/dialog";
import {SingleMatchOverviewComponent} from "../../../single-match/single-match.component";
import {DragAndDropService} from "../../../services/viewServices/drag-and-drop.service";
import {ScheduleService} from "../../../services/schedule.service";
import {
  CdkDrag,
  CdkDragDrop, CdkDragEnd,
  CdkDragStart,
  CdkDropList,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";

@Component({
  selector: 'app-match-in-schedule',
  templateUrl: './match-in-schedule.component.html',
  styleUrls: ['./match-in-schedule.component.scss']
})
export class MatchInScheduleComponent implements OnInit, AfterViewInit {

  @ViewChild(CdkDropList) dropList?: CdkDropList;
  progressBarValue!: number;
  matchArray: Match[] = [];

  constructor(public dragDropService: DragAndDropService,
              public scheduleService: ScheduleService,
              private dialog: MatDialog) {
  }

  @Input() match?: Match;
  @Output() onMatchAdd = new EventEmitter<Match>();
  @Output() onMatchRemove = new EventEmitter<Match>();

  ngOnInit(): void {
    this.progressBarValue = this.getProgressBarValue();
  }

  ngAfterViewInit(): void {
    if (this.dropList) {
      this.dragDropService.registerInSchedule(this.dropList);
    }

    if (this.match)
      this.matchArray.push(this.match);
  }

  dropHandle(event: CdkDragDrop<Match[]>): void {
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex,
      );

      this.match = this.matchArray[0];
      this.onMatchAdd.emit(this.match);
    }
  }

  public predicate = (drag: CdkDrag, drop: CdkDropList) => {
    let matchDrag = drag.data as Match;
    if (!matchDrag) return false;
    return !!(matchDrag.player1 && matchDrag.player2);
  }

  dragDrop(event: CdkDragDrop<Match>) {
    if (event.previousContainer === event.container)
      return;

    this.match = undefined;
    this.matchArray = [];
    this.onMatchRemove.emit(event.item.data);
  }

  dragStart(event: CdkDragStart): void {
    this.dragDropService.isDraggingSchedule = true;
  }

  dragEnd(event: CdkDragEnd): void {
    this.dragDropService.isDraggingSchedule = false;
  }

  openMatch(): void {
    this.dialog.open(SingleMatchOverviewComponent, {
      data: this.match,
    });
  }

  getProgressBarValue(): number{
    if (!this.match?.orderInSchedule) return 0;
    if (this.match?.orderInSchedule <= 2) return 100;
    if (this.match.orderInSchedule >= 4) return 0;
    return Math.round(Math.random() * 100);
  }
}
