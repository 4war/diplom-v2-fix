import {Component, EventEmitter, Inject, InjectionToken, Input, OnInit, Output} from '@angular/core';
import {Match} from "../../shared/Match";
import {Player} from "../../shared/Player";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {MatchService} from "../../services/match.service";
import {MatDialog} from "@angular/material/dialog";
import {SeekPlayerDialogComponent} from "../../helpComponents/seek-player-dialog/seek-player-dialog.component";

export declare const MAT_SEEK_PLAYER_DIALOG_DATA: InjectionToken<any>;

@Component({
  selector: 'app-player-in-match-dialog',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerInMatchDialogComponent implements OnInit {

  constructor(public general: GeneralTournamentService,
              public matchService: MatchService,
              private dialog?: MatDialog,) {
  }

  @Input() match?: Match;
  @Input() player?: Player;

  @Output() onPlayerChange = new EventEmitter<Player>();

  ngOnInit(): void {
  }

  openSeekPlayerDialog(): void {
    if (!this.matchService.editMode) return;

    this.dialog?.open(SeekPlayerDialogComponent, {
      data: {
        seekInOneTournament: true,
      }
    })
      .afterClosed().subscribe(response => {
      this.player = response;
      this.onPlayerChange.emit(this.player);
    });
  }
}


