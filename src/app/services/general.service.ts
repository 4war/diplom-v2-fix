import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TennisCenter} from "../shared/TennisCenter";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {TournamentFactory} from "../shared/TournamentFactory";
import {Tournament} from "../shared/Tournament";

@Injectable({
  providedIn: 'root'
})
export class GeneralService {

  currentFactory: TournamentFactory = new TournamentFactory();
  currentTournament: Tournament = new Tournament();

  constructor(private httpClient: HttpClient, public  router: Router) {
  }
}
