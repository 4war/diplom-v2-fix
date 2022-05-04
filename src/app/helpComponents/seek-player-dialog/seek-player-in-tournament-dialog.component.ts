import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {Player} from "../../shared/Player";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {map, Observable, startWith} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {PlayerFilterOptions} from "../../shared/filter/PlayerFilterOptions";

@Component({
  selector: 'app-seek-player-dialog',
  templateUrl: './seek-player-in-tournament-dialog.component.html',
  styleUrls: ['./seek-player-in-tournament-dialog.component.scss']
})
export class SeekPlayerInTournamentDialogComponent implements OnInit {

  playerList: Player[] = [];
  player?: Player;
  tournamentId?: number;

  formControl = new FormControl();
  filteredOptions!: Observable<Player[]>;

  options = ['One', 'Two', 'Three'];

  constructor(public general: GeneralService,
              public tournamentService: TournamentService,
              public playerService: PlayerService,
              private dialogRef: MatDialogRef<SeekPlayerInTournamentDialogComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public seekSetting: SeekSettings) {
  }

  displayDelegate(inputPlayer: Player): string {
    return inputPlayer?.surname;
  }

  ngOnInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.seekSetting.seekInOneTournament) {
      this.tournamentService.getPlayerList(this.tournamentId)
        .subscribe(response => {
          this.playerList = response;
          this.setFilterOptions();
        });
      return;
    }
  }

  updateFilter(event: any): void {
    let inputString = event!.target!.value.toString();
    if (!this.seekSetting.seekInOneTournament && inputString.length > 4) {
      let filterOptions = new PlayerFilterOptions();
      filterOptions.startWith = inputString;

      this.playerService.getFilteredPlayerListAsync(filterOptions)
        .subscribe(response => {
          this.playerList = response;
          this.filteredOptions = this.formControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filter(value)));
        });
    }
  }

  private setFilterOptions(): void {
    this.filteredOptions = this.formControl.valueChanges
      .pipe(
        startWith(''),
        map(value => this._filter(value)));
  }

  private _filter(value: string): Player[] {
    return this.playerList.filter(p => p.surname.toLowerCase().includes(value.toLowerCase()));
  }

  clear(): void {
    this.player = undefined;
    this.dialogRef.close();
  }

  confirm(player: Player): void {
    this.dialogRef.close(player);
  }
}


export class SeekSettings {
  seekInOneTournament = false;
}


