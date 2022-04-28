import {Component, OnInit, ViewChild} from '@angular/core';
import {NgttTournament} from "ng-tournament-tree";
import {TestTournament} from "../../shared/viewModels/TestTournament";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Tournament} from "../../shared/Tournament";
import {ITab} from "../ITab";
import {filter} from "rxjs";
import {Bracket} from "../../shared/Bracket";
import {BracketService} from "../../services/bracket.service";
import {Match} from "../../shared/Match";
import {Round} from "../../shared/Round";
import Enumerable from "linq";
import from = Enumerable.from;
import {CdkDrag, CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Player} from "../../shared/Player";
import {DragAndDropService} from "../../services/viewServices/drag-and-drop.service";
import matches = Enumerable.matches;
import {type} from "os";

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
      }
    }];
  editMode = true;

  constructor(public general: GeneralService,
              public dragDropService: DragAndDropService,
              private tournamentService: TournamentService,
              private bracketService: BracketService,
              private route: ActivatedRoute,
              private router: Router) {

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

        // this.bracket = new Bracket();
        // this.bracket.rounds = [{
        //   type: "Final",
        //   matches: [new Match()]
        // }]
      });
    }
  }

  update(): void {

  }

  startEdit(): void {
    this.editMode = true;
  }

  save(): void {
    this.editMode = false;
  }

  cancel(): void {
    this.editMode = false;
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
    let a = event.item.data as Player;
    //this.testData.push(a);

  }
}
