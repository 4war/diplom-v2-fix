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
import {City} from "../../shared/City";
import {CityService} from "../../services/city.service";

@Component({
  selector: 'app-seek-player-dialog',
  templateUrl: './seek-player-in-tournament-dialog.component.html',
  styleUrls: ['./seek-player-in-tournament-dialog.component.scss']
})
export class SeekPlayerInTournamentDialogComponent implements OnInit {

  tournamentId?: number;

  playerFormControl = new FormControl();
  playerList: Player[] = [];
  player?: Player;
  playerFilteredOptions!: Observable<Player[]>;

  filterOptions = new PlayerFilterOptions();

  cityFormControl = new FormControl();
  cityList: City[] = [];
  cityFilteredOptions!: Observable<City[]>;

  constructor(public general: GeneralService,
              public tournamentService: TournamentService,
              public playerService: PlayerService,
              private cityService: CityService,
              private dialogRef: MatDialogRef<SeekPlayerInTournamentDialogComponent>,
              private router: Router,
              @Inject(MAT_DIALOG_DATA) public seekSetting: SeekSettings) {
  }

  displayDelegatePlayer(inputPlayer: Player): string {
    return inputPlayer?.surname;
  }

  displayDelegateCity(city: City): string {
    return city?.name;
  }

  ngOnInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.seekSetting.seekInOneTournament) {
      this.tournamentService.getPlayerList(this.tournamentId)
        .subscribe(response => {
          this.playerList = response;
        });
      return;
    }
  }

  updatePlayerFilter(event: any): void {
    if (!event) {
      this.filterOptions = new PlayerFilterOptions();
      return;
    }

    if (!this.seekSetting.seekInOneTournament && event.length > 4) {
      this.filterOptions.startWith = event;

      this.playerService.getFilteredPlayerListAsync(this.filterOptions)
        .subscribe(response => {
          this.playerList = response;
          this.playerFilteredOptions = this.playerFormControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filterPlayer(this.playerFormControl.value, 4)));
        });
    }
  }

  updateCityFilter(event: any){
    if (!event || event.toString().length == 0) return;

    //todo: add city to filterOptions

    this.cityService.getCities(event).subscribe(response => {
      this.cityList = response;
      this.cityFilteredOptions = this.cityFormControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCity(this.cityFormControl.value, 1)));
    });
  }

  private _filterPlayer(value: string, minLength: number): Player[] {
    return value && value.length > minLength
      ? this.playerList.filter(p => p.surname.toLowerCase().includes(value.toLowerCase()))
      : [];
  }

  private _filterCity(value: string, minLength: number): City[] {
    return value && value.length > minLength
      ? this.cityList.filter(p => p.name.toLowerCase().includes(value.toLowerCase()))
      : [];
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


