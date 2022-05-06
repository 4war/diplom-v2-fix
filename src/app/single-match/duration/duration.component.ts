import {Component, Input, OnInit} from '@angular/core';
import {Match} from "../../shared/Match";
import {MatchService} from "../../services/match.service";
@Component({
  selector: 'app-duration',
  templateUrl: './duration.component.html',
  styleUrls: ['./duration.component.scss']
})

export class DurationComponent implements OnInit {

  constructor(public matchService: MatchService) {
  }

  @Input() match!: Match;

  start = {hour: 9, minute: 30} as Time;
  end = {hour: 11, minute: 30} as Time;
  duration?: Time;

  startDate?: Date;
  endDate?: Date;
  offset: number = new Date().getTimezoneOffset() * 60000;

  edit = false;

  ngOnInit(): void {
    if (this.match.start) {
      let input = new Date(this.match.start!.toString()).getTime();
      this.startDate = new Date(input - this.offset);
      this.start.hour = this.startDate.getHours();
      this.start.minute = this.startDate.getMinutes();
    }

    if (this.match.end) {
      let input = new Date(this.match.end!.toString()).getTime();
      this.endDate = new Date(input - this.offset);
      this.end.hour = this.endDate.getHours();
      this.end.minute = this.endDate.getMinutes();
    }
  }

  updateStart(): void {
    if (this.startDate) {
      this.startDate.setHours(this.start.hour);
      this.startDate.setMinutes(this.start.minute);
      this.startDate = new Date(JSON.parse(JSON.stringify(this.startDate)));
    }

    this.updateDuration();
  }

  updateEnd(): void {
    if (this.endDate) {
      this.endDate.setHours(this.end.hour);
      this.endDate.setMinutes(this.end.minute);
      this.endDate = new Date(JSON.parse(JSON.stringify(this.endDate)));
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
    if (this.edit) this.save();
    this.edit = !this.edit;
  }

  save(): void {
    if (this.startDate)
      this.match.start = new Date(this.startDate.getTime());

    if (this.endDate)
      this.match.end = new Date(this.endDate.getTime());
  }

  clearStart(): void{
    this.match.start = undefined;
  }

  clearEnd(): void{
    this.match.end = undefined;
  }
}

export class Time {
  hour = 0;
  minute = 0;
}
