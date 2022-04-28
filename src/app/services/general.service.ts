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
import {Player} from "../shared/Player";

@Injectable({
  providedIn: 'root'
})

export class GeneralService {
  currentFactory: TournamentFactory = new TournamentFactory();
  currentTournament: Tournament = new Tournament();
  currentPlayerRni: number = 0;

  currentTournamentTab = "overview";

  missingPlayers: Player[] = [
    {
      rni: 1,
      surname: "Хуйкин",
      name: "Грю",
      patronymic: "Миньонович",
      gender: 1,
      city: "Самара",
      point: 1000,
      dateOfBirth: new Date(2000, 10, 10),
      getShortFio(): string {
        return "Хуйкин Г.М."
      },
    },
    {
      rni: 2,
      surname: "Террорблейд",
      name: "Инвокер",
      patronymic: "Миранович",
      gender: 1,
      city: "Тольятти",
      point: 1000,
      dateOfBirth: new Date(2000, 10, 10),
      getShortFio(): string {
        return "Террорблейд И.М."
      }
    }
  ];

  constructor(private httpClient: HttpClient, public router: Router) {
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
