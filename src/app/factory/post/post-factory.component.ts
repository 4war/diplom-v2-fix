import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from "@angular/forms";
import {ages, Category, categoryMap} from "../../defaults";
import Enumerable from "linq";
import from = Enumerable.from;
import {TournamentService} from "../../services/tournament.service";
import {TennisCenterService} from "../../services/tennis-center.service";
import {TennisCenter} from "../../shared/TennisCenter";
import {TournamentFactory} from "../../shared/TournamentFactory";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {Router} from "@angular/router";


@Component({
  selector: 'app-tournament',
  templateUrl: './post-factory.component.html',
  styleUrls: ['./post-factory.component.css']
})

export class PostFactoryComponent implements OnInit {
  secondAgeIsNeeded = false;
  factory = new TournamentFactory();
  centers: TennisCenter[] = [];

  firstAge!: number;
  secondAge?: number;
  categoryLetters: string[] = [];
  ages = ages;
  pinned = true;
  selected = '';
  secondAges = ages;

  tennisCenters: TennisCenter[] = [];

  getCategoryDigits(): string[] {
    return from(categoryMap.keys()).toArray();
  }

  getCategoryLetters(digit: string): string[] {
    if (digit == null || digit.length == 0)
      return [];

    if (!categoryMap.has(digit))
      return [];

    return categoryMap.get(digit)!;
  }

  constructor(private formBuilder: FormBuilder,
              private tournamentService: TournamentService,
              private tennisCenterService: TennisCenterService,
              private general: GeneralTournamentService,
              private router: Router) {
  }

  form = this.formBuilder.group({
    name: new FormControl([''], [Validators.required]),
    categoryDigit: new FormControl([''], [Validators.required, Validators.minLength(1)]),
    categoryLetter: new FormControl([''], [Validators.required, Validators.minLength(1)]),
    firstAge: new FormControl([''], [Validators.required, Validators.minLength(3)]),
    secondAge: new FormControl([''], [Validators.nullValidator]),
    netRange: new FormControl(32, [Validators.required]),
    dateStart: new FormControl(Date, [Validators.required]),
    dateEnd: new FormControl(Date, [Validators.required]),
    dateRequest: new FormControl(Date, [Validators.required]),
    tennisCenter: new FormControl(TennisCenter, [Validators.required, Validators.minLength(3)]),
  });


  ngOnInit(): void {
    this.listTennisCenters();
  }

  updateDateEnd(): void {
    this.factory.dateRequest = new Date();
    this.factory.dateRequest!.setDate(this.form.value.dateStart.getDate() - 14);
    this.form.patchValue({
      dateRequest: this.factory.dateRequest,
    });

    if (!this.pinned)
      return;

    let dateEnd = new Date();
    dateEnd.setDate(this.form.value.dateStart.getDate() + 4);
    this.form.patchValue({
      dateEnd: dateEnd,
    });
  }

  categoryDigitValueChanged(event: any): void {
    this.form.patchValue({
      categoryDigit: event,
    });

    this.updateCategory();
  }


  updateCategory(): void {
    this.factory.category = this.form.value.categoryDigit + " " + this.form.value.categoryLetter;
  }

  categoryLetterClicked(): void {
    this.categoryLetters = this.getCategoryLetters(this.form.value.categoryDigit);
  }

  firstAgeValueChanged(event: any): void {
    this.form.patchValue({
      firstAge: event,
    });

    this.updateAge();
  }

  secondAgeValueChanged(event: any): void {
    this.form.patchValue({
      secondAge: event,
    });

    this.updateAge();
  }

  updateAge(): void {
    let array: number[] = [];
    array = this.secondAgeIsNeeded
      ? [this.form.value.firstAge, this.form.value.secondAge]
      : [this.form.value.firstAge];

    this.factory.ages = from(array).orderBy(x => x).toArray().join(' ');
    this.secondAges = from(ages).skipWhile(x => x.max <= this.form.value.firstAge).toArray();
  }

  tennisCenterValueChanged(event: any): void {
    this.form.patchValue({
      tennisCenter: event,
    });
  }

  categoryLetterValueChanged(event: any): void {
    this.form.patchValue({
      categoryLetter: event,
    });

    this.updateCategory();
  }

  updatePinStartEndDate(): void {
    this.pinned = !this.pinned;
    this.updateDateEnd();
  }

  listTennisCenters(): void {
    this.tennisCenterService.getTennisCenters().subscribe(response => {
        this.tennisCenters = response;
      }
    );
  }

  addSecondAge(): void {
    this.secondAgeIsNeeded = true;
    let ageArray = this.factory.ages.split(' ');
    if (ageArray.length == 2){
      this.factory.ages = ageArray[0];
    }

    this.updateAge();
  }

  removeSecondAge(): void {
    this.secondAgeIsNeeded = false;
    this.updateAge();
  }

  confirm(): void {
    if (!this.form.valid)
      return;

    this.tournamentService.postFactory(this.factory)
      .subscribe(response => {
        this.general.currentFactory = response;
        this.router.navigateByUrl(`factory/get`);
      });
  }

  cancel(): void{
    this.router.navigateByUrl(`factory/get`);
  }
}
