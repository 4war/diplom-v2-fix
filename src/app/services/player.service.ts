import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Player} from "../shared/Player";
import {server} from "../../environments/environment";
import {Tournament} from "../shared/Tournament";
import {PlayerFilterOptions} from "../shared/filter/PlayerFilterOptions";
import {TournamentResult} from "../shared/TournamentResult";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {
  constructor(private httpClient: HttpClient) {
  }

  getPlayerList(): Observable<Player[]>{
    return this.httpClient.get<Player[]>(`${server}/player/list`);
  }

  getFilteredPlayerListAsync(filterOptions: PlayerFilterOptions): Observable<Player[]>{
    return this.httpClient.post<Player[]>(`${server}/player/filter`, filterOptions);
  }

  getPlayer(rni: number): Observable<Player>{
    return this.httpClient.get<Player>(`${server}/player/${rni}`);
  }

  getTournaments(rni: number): Observable<Tournament[]>{
    return this.httpClient.get<Tournament[]>(`${server}/player/${rni}/tournaments`);
  }

  getTournamentResults(rni: number): Observable<TournamentResult[]>{
    return this.httpClient.get<TournamentResult[]>(`${server}/player/${rni}/tournamentResults`);
  }

  getPlayerWinRate(rni: number): Observable<number>{
    return this.httpClient.get<number>(`${server}/player/winRate/${rni}`);
  }

  getAge(player: Player): number | undefined {
    if (!player) return undefined;
    let dob = new Date(player!.dateOfBirth.toString());
    let difference = Date.now() - dob.getTime();
    return Math.abs(Math.round(difference / 1000 / 60 / 60 / 24 / 365.25));
  }
}
