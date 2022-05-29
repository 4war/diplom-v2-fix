import {Component, HostListener, OnInit} from '@angular/core';
import {Player} from "../../shared/Player";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {PlayerService} from "../../services/player.service";
import {Router} from "@angular/router";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {TennisCenter} from "../../shared/TennisCenter";
import {LabelType, Options} from "@angular-slider/ngx-slider";
import Enumerable from "linq";
import {PlayerFilterOptions} from "../../shared/filter/PlayerFilterOptions";
import from = Enumerable.from;

const defaultYearFrom = 1980;
const defaultYearUntil = 2015;
const defaultPointFrom = 0;
const defaultPointUntil = 5000;

const defaultPlayerOptions: PlayerFilterOptions = {
  dobYearFrom: defaultYearFrom,
  dobYearUntil: defaultYearUntil,
  pointsFrom: defaultPointFrom,
  pointsUntil: defaultPointUntil,
  gender: undefined,
};


@Component({
  selector: 'app-player',
  templateUrl: './get-player-list.component.html',
  styleUrls: ['./get-player-list.component.scss'],
  host: {
    '(document:keypress)': 'handleKeyboardEvent($event)'
  }
})
export class GetPlayerListComponent implements OnInit {

  players?: Player[];
  totalPlayers?: Player[];

  displayedColumns = ["Index", "FIO", "RNI", "DoB", "City", "Points"];
  pages: number[] = [];
  pageSize = 40;
  currentPage = 1;

  formGroup = this.formBuilder.group({
    surname: new FormControl([''], [Validators.pattern('^[а-яА-Я \-\']+')]),
    city: new FormControl([''], [Validators.pattern('^[а-яА-я \-\']+')]),
    dobYearFrom: new FormControl(defaultYearFrom),
    dobYearUntil: new FormControl(defaultYearUntil),
    pointsFrom: new FormControl(['']),
    pointsUntil: new FormControl(defaultPointUntil),
    gender: new FormControl([''])
  });

  surnameFormControl = new FormControl([''], [Validators.pattern('^[а-яА-Я \-\']+')]);
  cityFormControl = new FormControl([''], [Validators.pattern('^[а-яА-Я \-\']+')]);

  yearRange = Enumerable.rangeTo(defaultYearFrom, defaultYearUntil, 1).toArray();
  yearOptions: Options = {
    stepsArray: this.yearRange.map((year: number) => {
      return {value: year};
    }),
    translate: (value: number, label: LabelType): string => {
      return value.toString();
    }
  };

  pointRange = Enumerable.rangeTo(0, 1000, 100)
    .concat(Enumerable.rangeTo(1500, 10000, 500))
    .concat(Enumerable.rangeTo(20000, 100000, 10000)).toArray();
  pointOptions: Options = {
    stepsArray: this.pointRange.map((point: number) => {
      return {value: point};
    }),
    translate: (value: number, label: LabelType): string => {
      return value.toString();
    }
  };

  playerListFilterOptions: PlayerFilterOptions = defaultPlayerOptions;

  searchMode = false;
  genderOptions = [{name: 'М', value: 0}, {name: 'Ж', value: 1},];

  constructor(public general: GeneralTournamentService,
              private playerService: PlayerService,
              private formBuilder: FormBuilder,
              private router: Router) {

    this.submitFilterOptions();
  }


  minYearChange(event: number): void {
    this.playerListFilterOptions.dobYearFrom = event;
  }

  maxYearChange(event: number): void {
    this.playerListFilterOptions.dobYearUntil = event;
  }

  minPointChange(event: number): void {
    this.playerListFilterOptions.pointsFrom = event;
  }

  maxPointChange(event: number): void {
    this.playerListFilterOptions.pointsUntil = event;
  }

  startSearch(): void {
    this.searchMode = true;
  }

  endSearch(): void {
    this.searchMode = false;
    this.formGroup.reset();
    this.formGroup.patchValue({dobYearUntil: defaultYearUntil});
    this.formGroup.patchValue({pointsUntil: defaultPointUntil});
    this.playerListFilterOptions = defaultPlayerOptions;
    this.submitFilterOptions();
  }

  submitFilterOptions(): void {
    this.totalPlayers = undefined;
    this.playerService.getFilteredPlayerListAsync(this.playerListFilterOptions)
      .subscribe(response => {
        this.totalPlayers = response;
        this.updatePaginatedList(1);
        let pageCount = Math.trunc(response.length / this.pageSize) + (response.length % this.pageSize == 0 ? 0 : 1);
        this.pages = Enumerable.range(1, pageCount, 1).toArray();
      });
  }

  updatePaginatedList(page: number): void {
    this.currentPage = page;
    if (!this.totalPlayers) return;
    let skip = (page - 1) * this.pageSize;
    this.players = from(this.totalPlayers).skip(skip).take(this.pageSize).toArray();
  }

  @HostListener('document:keypress', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.code == "Enter" && this.searchMode) {
      this.submitFilterOptions();
    }
  }


  ngOnInit(): void {
  }

  redirectToPlayer(rni: number): void {
    this.router.navigateByUrl(`player/${rni}`);
  }
}

