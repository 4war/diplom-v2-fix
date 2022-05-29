import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {TournamentService} from "../../services/tournament.service";
import {Player} from "../../shared/Player";
import {FormControl, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {map, Observable, startWith} from "rxjs";
import {PlayerService} from "../../services/player.service";
import {PlayerFilterOptions} from "../../shared/filter/PlayerFilterOptions";
import {City} from "../../shared/City";
import {CityService} from "../../services/city.service";
import Enumerable from "linq";
import from = Enumerable.from;

@Component({
  selector: 'app-seek-player-dialog',
  templateUrl: './seek-player-dialog.component.html',
  styleUrls: ['./seek-player-dialog.component.scss']
})
export class SeekPlayerDialogComponent implements OnInit {

  tournamentId?: number;

  playerFormControl = new FormControl();
  playerList: Player[] = [];
  player?: Player;
  playerFilteredOptions!: Observable<Player[]>;

  filterOptions = new PlayerFilterOptions();

  cityFormControl = new FormControl();
  cityList: City[] = [];
  cityFilteredOptions!: Observable<City[]>;

  gender: string = '2';

  genderFormControl = new FormControl();

  favoriteSeason: string = '';
  seasons: string[] = ['Winter', 'Spring', 'Summer', 'Autumn'];

  constructor(public general: GeneralTournamentService,
              public tournamentService: TournamentService,
              public playerService: PlayerService,
              private cityService: CityService,
              private dialogRef: MatDialogRef<SeekPlayerDialogComponent>,
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
    if (this.seekSetting?.tournamentId) {
      this.tournamentService.getPlayerList(this.seekSetting?.tournamentId)
        .subscribe(response => {
          this.playerList = response;
        });
      return;
    }
  }

  updatePlayerFilter(event: any): void {
    if (!event || event.length == 0) {
      this.filterOptions = new PlayerFilterOptions();
      return;
    }

    if (!this.seekSetting?.tournamentId && event.length >= 3) {
      this.filterOptions.surname = this.trim(event);

      let a = this.gender;
      this.playerService.getFilteredPlayerListAsync(this.filterOptions)
        .subscribe(response => {
          this.playerList = response;
          this.playerFilteredOptions = this.playerFormControl.valueChanges
            .pipe(
              startWith(''),
              map(value => this._filterPlayer(this.trim(this.playerFormControl.value), 1)));
        });
    }
  }

  updateCityFilter(event: any) {
    if (!event || event.length == 0) return;
    this.filterOptions.city = event.name;

    this.cityService.getCities(event).subscribe(response => {
      this.cityList = response;
      this.cityFilteredOptions = this.cityFormControl.valueChanges
        .pipe(
          startWith(''),
          map(value => this._filterCity(this.trim(this.cityFormControl.value), 1)));
    });
  }

  private _filterPlayer(value: string, minLength: number): Player[] {
    return value && value.length >= minLength
      ? this.playerList.filter(p => p.surname.toLowerCase().includes(value.toLowerCase()))
      : [];
  }

  private _filterCity(value: string, minLength: number): City[] {
    return value && value.length >= minLength
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

  clearCity(): void {
    this.cityFormControl.patchValue('');
    this.filterOptions.city = '';
  }

  trim(str: string): string {
    let sb = '';
    for (let i = 0; i < str.length; i++)
      if (str[i] != '') sb += str[i];
    return sb;
  }
}


export class SeekSettings {
  tournamentId?: number;
}


