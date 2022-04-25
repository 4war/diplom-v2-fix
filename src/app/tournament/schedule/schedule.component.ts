import { Component, OnInit } from '@angular/core';
import {ITab} from "../ITab";
import {filter} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {GeneralService} from "../../services/general.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.css']
})
export class ScheduleComponent implements OnInit, ITab {

  constructor(public general: GeneralService,
              private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(response => this.reInit());

    this.reInit();
  }

  ngOnInit(): void {
  }

  reInit(): void {
  }

}
