import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Match} from "../../../shared/Match";
import {MatDialog} from "@angular/material/dialog";
import {SingleMatchOverviewComponent} from "../../../single-match/single-match.component";

@Component({
  selector: 'app-match-in-schedule',
  templateUrl: './match-in-schedule.component.html',
  styleUrls: ['./match-in-schedule.component.scss']
})
export class MatchInScheduleComponent implements OnInit {

  progressBarValue = 100;

  constructor(private dialog: MatDialog) {
  }

  @Input() match?: Match;
  @Output() onMatchChange = new EventEmitter<Match>();

  ngOnInit(): void {
  }

  openMatch(): void {
    this.dialog.open(SingleMatchOverviewComponent, {
      data: this.match,
    });
  }
}
