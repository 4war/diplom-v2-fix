import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {ITab} from "../ITab";
import {filter, map} from "rxjs";
import {NavigationEnd, Router} from "@angular/router";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {Schedule} from "../../shared/Schedule";
import {ScheduleService} from "../../services/schedule.service";
import {Tournament} from "../../shared/Tournament";
import {TournamentService} from "../../services/tournament.service";
import {Court} from "../../shared/Court";
import {Match} from "../../shared/Match";
import Enumerable from "linq";
import from = Enumerable.from;
import {DragAndDropService} from "../../services/viewServices/drag-and-drop.service";
import {Player} from "../../shared/Player";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Round} from "../../shared/Round";
import {Role} from "../../profile/profile.component";
import {AuthService} from "../../services/auth.service";
import {Account} from "../../shared/Account";
import {MatTabChangeEvent} from "@angular/material/tabs";

@Component({
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss']
})
export class ScheduleComponent implements OnInit, ITab, AfterViewInit {

  @ViewChild(CdkDropList) dropList?: CdkDropList;
  schedule?: Schedule;
  tournamentId?: number;
  tournament?: Tournament;
  days: Date[] = [];
  courts: Court[] = [];
  orders: number[] = [];
  warn = false;

  draggableMatchList: Match[] = [{
    id: 10000,
    player1: {
      surname: 'Дерево',
      name: 'Дуб',
      patronymic: 'Березович',
      rni: 0,
      city: 'Самара',
      dateOfBirth: new Date(),
      point: 0,
      gender: 0
    },
    player2: {
      surname: 'Впадлу',
      name: 'Придумывать',
      patronymic: 'Похуй',
      rni: 1,
      city: 'Тольятти',
      dateOfBirth: new Date(),
      point: 0,
      gender: 0
    },
    round: new Round(),
    placeInRound: 0,
    score: '64 60',
  }, {
    id: 10001,
    player1: {
      surname: 'Маяк',
      name: 'Пила',
      patronymic: 'Субмаринович',
      rni: 0,
      city: 'Самара',
      dateOfBirth: new Date(),
      point: 0,
      gender: 0
    },
    player2: {
      surname: 'Прей',
      name: 'Дизонорд',
      patronymic: 'Дезлупович',
      rni: 1,
      city: 'Тольятти',
      dateOfBirth: new Date(),
      point: 0,
      gender: 0
    },
    round: new Round(),
    placeInRound: 0,
    score: '63 62',
  }];

  account?: Account;
  canEdit = false;
  dictionary = new Map<number, Map<number, Match>>();

  constructor(public general: GeneralTournamentService,
              public dragDropService: DragAndDropService,
              public authService: AuthService,
              public scheduleService: ScheduleService,
              private tournamentService: TournamentService,
              private router: Router) {

    this.authService.getCurrentAccount().subscribe(response => {
      this.account = response;
      this.canEdit = (this.authService.role == Role.Org || this.authService.role == Role.Admin) && authService.isAuthenticated();
    });

    router.events.pipe(filter(e => e instanceof NavigationEnd && general.currentTournamentTab == "schedule"))
      .subscribe(response => this.reInit());
  }

  ngOnInit(): void {
    this.reInit();
  }

  ngAfterViewInit(): void {
    if (this.dropList) {
      this.dragDropService.registerInSchedule(this.dropList);
    }
  }

  reInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.tournamentId) {
      this.tournamentService.getTournament(this.tournamentId).subscribe(tournament => {
        this.tournament = tournament;

        this.scheduleService
          .getDays(this.general.currentFactory.id)
          .subscribe(response => {
            this.days = response;
            this.showSchedule(this.days[0]);
          });
      });
    }
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
    }
  }

  public predicate = (drag: CdkDrag, drop: CdkDropList) => {
    let matchDragArray = drag.data as Match[];
    if (!matchDragArray || matchDragArray.length == 0) return false;
    let matchDrag = matchDragArray[0];
    return !!(matchDrag?.player1 && matchDrag?.player2);
  }

  onTabChanged(event: MatTabChangeEvent) {
    if (this.days && this.days.length > 0)
      this.showSchedule(this.days[event.index]);
  }

  showSchedule(day: Date): void {
    this.scheduleService
      .getSchedule(day, this.general.currentFactory.id)
      .subscribe(response => {
        this.schedule = response;
        this.updateDictionary(this.schedule);
      });

    this.scheduleService
      .getNotScheduledMatches(day, this.general.currentFactory.id)
      .subscribe(response => {
        this.draggableMatchList = response;
      });
  }

  addMatch(match: Match, court: Court, order: number): void {
    if (!match) return;

    let oldMatch = this.dictionary.get(order)?.get(court?.id);
    if (oldMatch) {
      this.draggableMatchList.push(oldMatch);
    }

    this.dictionary.get(order)?.set(court.id, match);
  }

  removeMatch(match: Match, court: Court, order: number): void {
    this.dictionary.get(order)?.delete(court.id);
  }

  updateDictionary(schedule: Schedule): void {
    this.dictionary = new Map<number, Map<number, Match>>();
    let courtsNotSorted: Court[] = [];

    let maxOrder = from(schedule.matches).where(x => !!x.orderInSchedule).max(x => x.orderInSchedule!);
    Enumerable.rangeTo(1, maxOrder).forEach(x => this.dictionary.set(x, new Map<number, Match>()));
    for (let match of schedule.matches) {
      let court = match.court;
      let order = match.orderInSchedule;
      if (!order || !court) continue;
      courtsNotSorted.push(court);

      if (!this.dictionary.has(order)) {
        this.dictionary.set(order, new Map<number, Match>());
      }

      if (!this.dictionary.get(order)!.has(court.id)) {
        this.dictionary.get(order)!.set(court.id, match);
      } else {
        this.warn = true;
        console.log("Collision in schedule");
      }
    }

    this.courts = from(courtsNotSorted).distinct(x => x.name).orderBy(c => c.name).toArray();
    this.orders = Enumerable.rangeTo(1, maxOrder).toArray();
  }

  addOrder(): void {
    if (this.orders.length == 0) {
      this.orders.push(1);
    }

    let lastOrder = this.orders[this.orders.length - 1];
    this.orders.push(lastOrder + 1);
    this.dictionary.set(lastOrder + 1, new Map<number, Match>());
  }

  removeLastOrder(): void {
    if (this.orders.length == 0) return;
    let last = this.orders.pop();
    let poppedDictionary = this.dictionary.get(last!);
    if (!poppedDictionary) return;

    poppedDictionary.forEach((value, key) => {
      this.draggableMatchList.push(value);
    });

    this.dictionary.delete(last!);
  }

  startEdit(): void {
    this.scheduleService.editMode = true;
  }

  save(): void {
    this.scheduleService.editMode = false;
    if (this.schedule) {
      this.schedule.matches = this.getMatchesFromDictionary();
      this.scheduleService.save(this.schedule).subscribe();
    }
  }

  cancel(): void {
    this.scheduleService.editMode = false;
    this.reInit();
  }

  getMatchesFromDictionary(): Match[] {
    let result: Match[] = [];

    this.dictionary.forEach((value, key) => {
      value.forEach((v, k) => {
        v.court = from(this.courts).first(x => x.id == k);
        v.orderInSchedule = key;
        result.push(v);
      })
    })

    return result;
  }

  orderTimes = [
    '08:00', '09:30',
    '11:00', '12:30',
    '14:00', '15:30',
    '17:00', '18:30',
    '20:00', '21:30',
  ]

  getTimeFromOrder(order: number): string {
    if (order <= 0 || order >= this.orderTimes.length) return '';
    return this.orderTimes[order - 1];
  }
}
