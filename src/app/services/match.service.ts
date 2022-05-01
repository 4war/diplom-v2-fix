import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../shared/Match";
import {server} from "../../environments/environment";

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
}
