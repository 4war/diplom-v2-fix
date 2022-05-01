import {Component, Inject, OnInit, ViewChild} from '@angular/core';
import {NgttTournament} from "ng-tournament-tree";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Tournament} from "../../shared/Tournament";
import {ITab} from "../ITab";
import {filter} from "rxjs";
import {BracketService} from "../../services/bracket.service";
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Player} from "../../shared/Player";
import {DragAndDropService} from "../../services/viewServices/drag-and-drop.service";
import {MAT_DIALOG_DATA, MatDialog} from "@angular/material/dialog";
import {SingleMatchOverviewComponent} from "../../single-match/single-match.component";
import {Match} from "../../shared/Match";

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit, ITab {

  @ViewChild(CdkDropList) dropList?: CdkDropList;

  bracket!: NgttTournament;
  tournament!: Tournament;
  tournamentId!: number;

  testData: Player[] = [{
    rni: 1,
    surname: "Артем",
    name: "Фомин",
    patronymic: "Леонидович",
    gender: 1,
    city: "Самара",
    point: 1000,
    dateOfBirth: new Date(2000, 10, 10),
    getShortFio(): string {
      return "Фомин А.Л."
    },
  },
    {
      rni: 2,
      surname: "Алексеев",
      name: "Кирилл",
      patronymic: "Андреевич",
      gender: 1,
      city: "Самара",
      point: 1000,
      dateOfBirth: new Date(2000, 10, 10),
      getShortFio(): string {
        return "Алексеев К.А."
      },
    },
    {
      rni: 1,
      surname: "Хуйкин",
      name: "Грю",
      patronymic: "Миньонович",
      gender: 1,
      city: "Самара",
      point: 1000,
      dateOfBirth: new Date(2000, 10, 10),
      getShortFio(): string {
        return "Хуйкин Г.М."
      },
    },
    {
      rni: 2,
      surname: "Террорблейд",
      name: "Инвокер",
      patronymic: "Миранович",
      gender: 1,
      city: "Тольятти",
      point: 1000,
      dateOfBirth: new Date(2000, 10, 10),
      getShortFio(): string {
        return "Террорблейд И.М."
      }
    }];

  constructor(public general: GeneralService,
              public dragDropService: DragAndDropService,
              public bracketService: BracketService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
  ) {

    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(response => this.reInit());

    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    this.reInit();
  }

  ngAfterViewInit(): void {
    if (this.dropList) {
      this.dragDropService.register(this.dropList);
    }
  }

  ngOnInit(): void {
  }

  reInit(): void {
    if (this.tournamentId) {
      this.tournamentService.getSingleTournament(this.tournamentId).subscribe(response =>
        this.tournament = response,
      );

      this.bracketService.getBracket(this.tournamentId).subscribe(response => {
        this.bracket = response;
      });
    }
  }

  update(): void {

  }


  dropHandle(event: CdkDragDrop<Player[]>): void {
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

  dropPlayer(event: CdkDragDrop<Player>): void {
  }

  openMatch(match: Match): void {
    this.dialog.open(SingleMatchOverviewComponent, {
      data: match,
    }).afterClosed().subscribe(_ => this.reInit());
  }
}
