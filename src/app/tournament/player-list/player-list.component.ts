import {Component, OnInit} from '@angular/core';
import {Tournament} from "../../shared/Tournament";
import {Player} from "../../shared/Player";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";
import {ITab} from "../ITab";
import {MatDialog} from "@angular/material/dialog";
import {SeekPlayerInTournamentDialogComponent} from "../../helpComponents/seek-player-dialog/seek-player-in-tournament-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {AlreadyExistDialogComponent} from "./already-exist-dialog/already-exist-dialog.component";

@Component({
  selector: 'app-player-list',
  templateUrl: './player-list.component.html',
  styleUrls: ['./player-list.component.css']
})
export class PlayerListComponent implements OnInit, ITab {

  tournament?: Tournament;
  tournamentId?: number;
  players?: Player[];
  qualificationPlayers?: Player[];

  displayedColumns = ["Index", "RNI", "FIO", "DoB", "City", "Points"];

  constructor(public general: GeneralService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {

    router.events.pipe(filter(e => e instanceof NavigationEnd))
      .subscribe(response => this.reInit());

    this.reInit();
  }

  reInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    this.tournamentService.getSingleTournament(this.tournamentId ?? 0).subscribe(response => {
        this.tournament = response;
        if (this.tournament.qualification) {
          this.tournamentService.getPlayerList(this.tournament.qualification.id).subscribe(qp =>
            this.qualificationPlayers = qp,
          );
        }
      }
    );

    this.tournamentService.getPlayerList(this.tournamentId ?? 0).subscribe(response =>
      this.players = response,
    );
  }

  ngOnInit(): void {
  }


  redirectToPlayer(rni: number): void {
    this.router.navigateByUrl(`player/${rni}`);
  }

  openDialogFor(id: number): void {
    this.dialog.open(SeekPlayerInTournamentDialogComponent, {
      data: {
        seekInOneTournament: false,
      }
    })
      .afterClosed()
      .subscribe(response2 => {
        if (response2) {
          this.tournamentService.postPlayerInTournament(id, response2)
            .subscribe(response => {
              this.reInit();
            }, (error: HttpErrorResponse) => {
              if (error.status == 400){
                let a = response2;
                //todo: pass response to dialog
                this.dialog.open(AlreadyExistDialogComponent);
              }
            });
        }
      });
  }
}
