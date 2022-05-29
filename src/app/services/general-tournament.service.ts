import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TennisCenter} from "../shared/TennisCenter";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {TournamentFactory} from "../shared/TournamentFactory";
import {Tournament} from "../shared/Tournament";
import {ages} from "../defaults";
import Enumerable from "linq";
import from = Enumerable.from;
import {server} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class GeneralTournamentService {
  currentFactory: TournamentFactory = new TournamentFactory();
  currentTournament: Tournament = new Tournament();
  currentPlayerRni: number = 0;

  currentTournamentTab = "overview";

  constructor(private httpClient: HttpClient,
              public router: Router) {
    this.currentTournamentTab =  from(router.url.split('/')).last();
  }

  getAgeViewValue(age: number): string {
    return from(ages).first(x => x.max == age).viewValue;
  }

  getGender(gender: number): string {
    return gender == 0 ? 'М' : 'Ж';
  }

  getStage(stage: number): string {
    return stage == 0 ? 'Основной тур' : 'Квалификация';
  }

  getAge(age: number): string {
    return from(ages).first(x => x.max == age).viewValue;
  }

  getFactory(): Observable<TournamentFactory> {
    let tournamentId = from(this.router.url.split('/'))
      .skipWhile(x => x != 'tournament')
      .skip(1)?.first();

    return this.httpClient.get<TournamentFactory>(`${server}/tournamentFactory/${tournamentId}`);
  }

}
