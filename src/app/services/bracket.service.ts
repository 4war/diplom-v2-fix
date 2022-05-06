import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bracket} from "../shared/Bracket";
import {server} from "../../environments/environment";
import {Match} from "../shared/Match";
import {Round} from "../shared/Round";
import {Tournament} from "../shared/Tournament";
import {Player} from "../shared/Player";

@Injectable({
  providedIn: 'root'
})

export class BracketService {

  editMode = false;

  constructor(private httpClient: HttpClient) {
  }

  getBracket(id: number): Observable<Bracket> {
    return this.httpClient.get<Bracket>(`${server}/bracket/${id}`);
  }

  getRound(id: number): Observable<Round>{
    return this.httpClient.get<Round>(`${server}/bracket/round/${id}`);
  }

  updateBracket(bracket: Bracket): Observable<Bracket>{
    return this.httpClient.patch<Bracket>(`${server}/bracket`, bracket);
  }

  moveWinnerInBracket(match: Match): Observable<any>{
    return this.httpClient.patch<Bracket>(`${server}/bracket/move`, match);
  }

  getUniquePlayer(id: number): Observable<Player[]>{
    return this.httpClient.get<Player[]>(`${server}/bracket/${id}/uniquePlayers`);
  }

  getMissingPlayer(id: number): Observable<Player[]>{
    return this.httpClient.get<Player[]>(`${server}/bracket/${id}/missingPlayers`);
  }

}
