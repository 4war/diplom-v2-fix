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
import {MatchService} from "../../services/match.service";
import {Bracket} from "../../shared/Bracket";
import Enumerable from "linq";
import from = Enumerable.from;
import {Round} from "../../shared/Round";

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
  changedMatches: Match[] = [];

  options = [
    {name: "Нет в сетке"},
    {name: "Все"},
  ]

  currentOption = this.options[1];

  playerList: Player[] = [];

  constructor(public general: GeneralService,
              public dragDropService: DragAndDropService,
              public bracketService: BracketService,
              public matchService: MatchService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
  ) {

    router.events.pipe(filter(e => e instanceof NavigationEnd
      && general.currentTournamentTab == "bracket"))
      .subscribe(response => this.reInit());
  }

  ngAfterViewInit(): void {
    if (this.dropList) {
      this.dragDropService.registerInBracket(this.dropList);
    }
  }

  ngOnInit(): void {
    this.reInit();
  }

  startEdit(): void {
    this.bracketService.editMode = true;
  }

  save(): void {
    this.bracketService.editMode = false;
    //todo: update every changed match instead of whole bracket
    this.bracketService.save(this.bracket as Bracket).subscribe(response => {
      this.reInit();
    });
  }

  cancel(): void {
    this.bracketService.editMode = false;
    this.reInit();
  }

  reInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.tournamentId) {
      this.tournamentService.getSingleTournament(this.tournamentId).subscribe(response =>
        this.tournament = response,
      );

      this.bracketService.getBracket(this.tournamentId).subscribe(response => {
        this.bracket = response;
      });

      this.updatePlayerList();
    }
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


  openMatch(match: Match): void {
    this.dialog.open(SingleMatchOverviewComponent, {
      data: match,
    }).afterClosed().subscribe(_ => {
      this.matchService.editMode = false;
      this.reInit();
    });
  }

  updatePlayerList(): void {
    if (this.currentOption.name == "Все") {
      this.bracketService.getUniquePlayer(this.tournamentId).subscribe(response => {
        this.playerList = response;
      });
    } else {
      this.bracketService.getMissingPlayer(this.tournamentId).subscribe(response => {
        this.playerList = response;
      });
    }
  }


  updateMatch(match: Match): void {}

}
