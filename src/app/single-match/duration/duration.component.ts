import {AfterViewInit, Component, Input, OnInit} from '@angular/core';
import {Match} from "../../shared/Match";
import {MatchService} from "../../services/match.service";

export const offset: number = new Date().getTimezoneOffset() * 60000;

@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})
export class DurationComponent implements OnInit, AfterViewInit {

  constructor(public matchService: MatchService) {
  }

  @Input() match!: Match;
  day?: Date;

  start = {hour: 9, minute: 30} as Time;
  end = {hour: 11, minute: 29} as Time;
  duration?: Time;

  edit = false;

  ngAfterViewInit() {
    this.matchService.getDay(this.match.id!).subscribe(response => {
      let input = new Date(response.toString()).getTime();
      this.day = new Date(input - offset);
    });
  }

  ngOnInit(): void {
    if (this.match.start) {
      let input = new Date(this.match.start!.toString()).getTime();
      this.match.start = new Date(input - offset);
      this.start.hour = this.match.start.getHours();
      this.start.minute = this.match.start.getMinutes();
    }

    if (this.match.end) {
      let input = new Date(this.match.end!.toString()).getTime();
      this.match.end = new Date(input - offset);
      this.end.hour = this.match.end.getHours();
      this.end.minute = this.match.end.getMinutes();
    }
  }

  updateStart(): void {
    if (this.match.start) {
      this.match.start.setHours(this.start.hour);
      this.match.start.setMinutes(this.start.minute);
      this.match.start = new Date(this.match.start.getTime());
    }

    this.updateDuration();
  }

  updateEnd(): void {
    if (this.match.end) {
      this.match.end.setHours(this.end.hour);
      this.match.end.setMinutes(this.end.minute);
      this.match.end = new Date(this.match.end.getTime());
    }

    this.updateDuration();
  }

  updateDuration(): void {
    if (this.match.start && this.match.end) {
      let minutes = this.end.minute - this.start.minute;
      let hours = this.end.hour - this.start.hour;

      if (minutes < 0) {
        minutes = 60 + minutes;
        hours--;
      }

      this.duration = hours < 0 ? undefined : {hour: hours, minute: minutes};
    }
  }

  changeEdit(): void {
    if (!this.edit) {
      this.match.start = new Date(this.day!.toDateString());
      this.match.start?.setHours(this.start.hour);
      this.match.start?.setMinutes(this.start.minute);
      this.match.start = new Date(this.match.start.getTime());
      this.match.end = new Date(this.day!.toDateString());
      this.match.end?.setHours(this.end.hour);
      this.match.end?.setMinutes(this.end.minute);
      this.match.end = new Date(this.match.end.getTime());
    }
    this.edit = !this.edit;
  }

  clearStart(): void {
    this.match.start = undefined;
  }

  clearEnd(): void {
    this.match.end = undefined;
  }
}

export class Time {
  hour = 0;
  minute = 0;
}
