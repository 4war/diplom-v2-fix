import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../shared/Tournament";
import {Player} from "../../shared/Player";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {ITab} from "../ITab";
import {MatDialog} from "@angular/material/dialog";
import {SeekPlayerDialogComponent} from "../../helpComponents/seek-player-dialog/seek-player-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {AlreadyExistDialogComponent} from "./already-exist-dialog/already-exist-dialog.component";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, ITab {

  players: Player[] = [];

  displayedColumns = ["Index", "RNI", "FIO", "DoB", "City", "Points", "Delete"];

  editMode = false;

  constructor(public general: GeneralService,
              public tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
    router.events.pipe(filter(e => e instanceof NavigationEnd && general.currentTournamentTab == "playerList"))
      .subscribe(response => this.reInit());
  }

  ngOnInit(): void {
    this.reInit();
  }

  reInit(): void {
    if (this.general.currentTournament && this.general.currentTournament.name.length > 0){
      this.tournamentService.getPlayerList(this.general.currentTournament.id).subscribe(response => {
          this.players = response;
        }
      );
    }
  }

  redirectToPlayer(rni: number): void {
    this.router.navigateByUrl(`player/${rni}`);
  }

  openDialogFor(id: number): void {
    this.dialog.open(SeekPlayerDialogComponent, {
      data: {
        tournamentId: this.general.currentTournament.id,
      }
    })
      .afterClosed()
      .subscribe(playerResponse => {
        if (playerResponse) {
          this.tournamentService.postPlayerInTournament(id, playerResponse)
            .subscribe(response => {
              this.reInit();
            }, (error: HttpErrorResponse) => {
              if (error.status == 400) {
                let a = playerResponse;
                this.dialog.open(AlreadyExistDialogComponent, {
                  data: playerResponse
                });
              }
            });
        }
      });
  }

  changeEdit(): void {
    this.editMode = !this.editMode;
  }

  delete(tournamentId: number, player: Player): void {
    if (!player || !tournamentId) return;
    this.tournamentService.deletePlayerInTournament(tournamentId, player.rni)
      .subscribe(_ => this.reInit());
  }
}
