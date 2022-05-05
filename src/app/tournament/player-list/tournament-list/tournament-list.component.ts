import {Component, Input, OnInit} from '@angular/core';
import {SeekPlayerInTournamentDialogComponent} from "../../../helpComponents/seek-player-dialog/seek-player-in-tournament-dialog.component";
import {HttpErrorResponse} from "@angular/common/http";
import {AlreadyExistDialogComponent} from "../already-exist-dialog/already-exist-dialog.component";
import {Player} from "../../../shared/Player";
import {GeneralService} from "../../../services/general.service";
import {TournamentService} from "../../../services/tournament.service";
import {ActivatedRoute, Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {Tournament} from "../../../shared/Tournament";

@Component({
  selector: 'app-tournament-list',
  templateUrl: './tournament-list.component.html',
  styleUrls: ['./tournament-list.component.css']
})
export class TournamentListComponent implements OnInit {

  players: Player[] = [];
  @Input() tournament!: Tournament;

  displayedColumns = ["Index", "RNI", "FIO", "DoB", "City", "Points", "Delete"];

  editMode = false;

  constructor(public general: GeneralService,
              public tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.reInit();
  }

  reInit(): void{
    this.tournamentService.getPlayerList(this.tournament.id).subscribe(response =>
      this.players = response,
    );
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
      .subscribe(playerResponse => {
        if (playerResponse) {
          this.tournamentService.postPlayerInTournament(id, playerResponse)
            .subscribe(response => {
              this.reInit();
            }, (error: HttpErrorResponse) => {
              if (error.status == 400){
                let a = playerResponse;
                this.dialog.open(AlreadyExistDialogComponent, {
                  data: playerResponse
                });
              }
            });
        }
      });
  }

  changeEdit(): void{
    this.editMode = !this.editMode;
  }

  delete(tournamentId: number, player: Player): void{
    if (!player || !tournamentId) return;
    this.tournamentService.deletePlayerInTournament(tournamentId, player.rni)
      .subscribe(_ => this.reInit());
  }
}
