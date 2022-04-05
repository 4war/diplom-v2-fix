import { Component, OnInit } from '@angular/core';
import {GeneralService} from "../../../services/general.service";
import {TournamentFactory} from "../../../shared/TournamentFactory";
import {ages} from "../../../defaults";
import Enumerable from "linq";
import from = Enumerable.from;

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.css', '../../../../styles.scss']
})
export class OverviewComponent implements OnInit {

  factory: TournamentFactory;

  constructor(private general: GeneralService) {
    this.factory = general.currentFactory;
  }

  ngOnInit(): void {
  }

  getGender(gender: number): string{
    return gender == 0 ? 'М' : 'Ж';
  }

  getStage(stage: number): string{
    return stage == 0 ? 'Основной тур' : 'Квалификация';
  }

  getAge(age: number): string{
    return from(ages).first(x => x.max == age).viewValue;
  }
}
