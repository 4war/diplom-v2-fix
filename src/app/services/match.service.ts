import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../shared/Match";
import {server} from "../../environments/environment";
import {Player} from "../shared/Player";

@Injectable({
  providedIn: 'root'
})
export class MatchService {
  editMode = false;

  constructor(private httpClient: HttpClient) {
  }

  getMatch(id: number): Observable<Match> {
    return this.httpClient.get<Match>(`${server}/match/${id}`)
  }

  updateMatch(match: Match): Observable<any> {
    return this.httpClient.patch<Match>(`${server}/match`, match);
  }

  getPlayerMatches(player: Player): Observable<Match[]> {
    return this.httpClient.get<Match[]>(`${server}/match/${player.rni}`);
  }

  getDay(matchId: number): Observable<Date> {
    return this.httpClient.get<Date>(`${server}/match/day/${matchId}`);
  }
}
