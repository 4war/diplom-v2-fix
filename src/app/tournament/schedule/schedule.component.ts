import {Component, OnInit} from '@angular/core';
import {ITab} from "../ITab";
import {filter, map} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {GeneralService} from "../../services/general.service";
import {Schedule} from "../../shared/Schedule";
import {ScheduleService} from "../../services/schedule.service";
import {Tournament} from "../../shared/Tournament";
import {TournamentService} from "../../services/tournament.service";
import {Court} from "../../shared/Court";
import {Match} from "../../shared/Match";
import Enumerable from "linq";
import from = Enumerable.from;
import {DragAndDropService} from "../../services/viewServices/drag-and-drop.service";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, ITab {

  schedule?: Schedule;
  tournamentId?: number;
  tournament?: Tournament;
  days: Date[] = [];
  courts: Court[] = [];
  orders: number[] = [];
  warn = false;

  dictionary = new Map<number, Map<Court, Match>>();

  constructor(public general: GeneralService,
              public dragDropService: DragAndDropService,
              private scheduleService: ScheduleService,
              private tournamentService: TournamentService,
              private router: Router) {
    router.events.pipe(filter(e => e instanceof NavigationEnd && general.currentTournamentTab == "schedule"))
      .subscribe(response => this.reInit());
  }

  ngOnInit(): void {
    this.reInit();
  }

  reInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.tournamentId) {
      this.tournamentService.getSingleTournament(this.tournamentId).subscribe(tournament => {
        this.tournament = tournament;

        this.scheduleService
          .getDays(this.general.currentFactory.firstTournamentId)
          .subscribe(response => {
            this.days = response;
            this.showSchedule(this.days[0]);
          });
      });
    }
  }

  showSchedule(day: Date): void {
    this.scheduleService
      .getSchedule(day, this.general.currentFactory.firstTournamentId)
      .subscribe(response => {
        this.schedule = response;
        this.updateDictionary(this.schedule);
      });
  }

  updateDictionary(schedule: Schedule) {
    this.dictionary = new Map<number, Map<Court, Match>>();
    let courtsNotSorted: Court[] = [];
    let orderNotSorted: number[] = [];

    for (let match of schedule.matches) {
      let court = match.court;
      let order = match.orderInSchedule;
      if (!order || !court) continue;
      courtsNotSorted.push(court);
      orderNotSorted.push(order);

      if (!this.dictionary.has(order)) {
        this.dictionary.set(order, new Map<Court, Match>());
      }

      if (!this.dictionary.get(order)?.has(court)) {
        this.dictionary.get(order)!.set(court, match);
      } else {
        this.warn = true;
        console.log("Collision in schedule");
      }
    }

    this.courts = from(courtsNotSorted).distinct(x => x.name).orderBy(c => c.name).toArray();
    this.orders = from(orderNotSorted).distinct().orderBy(x => x).toArray();
  }
}
