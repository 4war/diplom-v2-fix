import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bracket} from "../shared/Bracket";
import {server} from "../../environments/environment";
import {Match} from "../shared/Match";
import {Round} from "../shared/Round";

@Injectable({
  providedIn: 'root'
})

export class BracketService {

  constructor(private httpClient: HttpClient) {
  }

  getBracket(id: number): Observable<Bracket> {
    return this.httpClient.get<Bracket>(`${server}/bracket/${id}`);
  }

  getRound(id: number): Observable<Round>{
    return this.httpClient.get<Round>(`${server}/bracket/round/${id}`)
  }

  getMatch(id: number): Observable<Match>{
    return this.httpClient.get<Match>(`${server}/bracket/match/${id}`)
  }
}
