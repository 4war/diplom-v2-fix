import {Component, OnInit, ViewChild} from '@angular/core';
import {NgttTournament} from "ng-tournament-tree";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {Tournament} from "../../shared/Tournament";
import {ITab} from "../ITab";
import {filter} from "rxjs";
import {BracketService} from "../../services/bracket.service";
import {CdkDragDrop, CdkDropList, moveItemInArray, transferArrayItem} from "@angular/cdk/drag-drop";
import {Player} from "../../shared/Player";
import {DragAndDropService} from "../../services/viewServices/drag-and-drop.service";
import {MatDialog} from "@angular/material/dialog";
import {SingleMatchOverviewComponent} from "../../single-match/single-match.component";
import {Match} from "../../shared/Match";
import {MatchService} from "../../services/match.service";
import {Bracket} from "../../shared/Bracket";
import {AuthService} from "../../services/auth.service";
import {Account} from "../../shared/Account";
import {Role} from "../../profile/profile.component";

@Component({
  selector: 'app-bracket',
  templateUrl: './bracket.component.html',
  styleUrls: ['./bracket.component.scss']
})
export class BracketComponent implements OnInit, ITab {
  Role: typeof Role = Role;
  canEdit = false;
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
  account?: Account;
  playerList: Player[] = [];
  firstRoundMatches: Set<number> = new Set<number>();

  constructor(public general: GeneralTournamentService,
              public dragDropService: DragAndDropService,
              public bracketService: BracketService,
              public matchService: MatchService,
              public authService: AuthService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog,
  ) {
    this.authService.getCurrentAccount().subscribe(response => {
      this.account = response;
      this.canEdit = (this.authService.role == Role.Org || this.authService.role == Role.Admin) && authService.isAuthenticated();
    });

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
      this.tournamentService.getTournament(this.tournamentId).subscribe(response =>
        this.tournament = response,
      );

      this.bracketService.getBracket(this.tournamentId).subscribe(response => {
        this.bracket = response;
        if (this.bracket.rounds.length > 0){
          this.bracket.rounds[0].matches.forEach(m => this.firstRoundMatches.add(m.id));
        }
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

  isFirstRound(match: Match): boolean{
    return !!match && this.firstRoundMatches.has(match!.id!);
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
