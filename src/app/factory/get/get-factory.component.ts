import { Component, OnInit } from '@angular/core';
import Enumerable from "linq";
import {TournamentFactory} from "../../shared/TournamentFactory";
import {GeneralService} from "../../services/general.service";
import from = Enumerable.from;
import {ages} from "../../defaults";
import {Router} from "@angular/router";

@Component({
  selector: 'app-overview',
  templateUrl: './get-factory.component.html',
  styleUrls: ['./get-factory.component.scss']
})
export class GetFactoryComponent implements OnInit {

  factory: TournamentFactory;

  constructor(private general: GeneralService,
              private router: Router) {
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

  redirectToTournament(id: number){
    this.router.navigateByUrl(`tournament/${id}`);
  }
}
