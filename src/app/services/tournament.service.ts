import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Tournament} from "../shared/Tournament";
import {Observable} from "rxjs";
import {TournamentFactory} from "../shared/TournamentFactory";
import {Player} from "../shared/Player";
import {server} from "../../environments/environment";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};

@Injectable({
  providedIn: 'root'
})
export class TournamentService {

  constructor(private httpClient: HttpClient) {
  }

  getTournaments(): Observable<Tournament[]> {
    return this.httpClient.get<Tournament[]>(`${server}/tournament/`);
  }

  getTournamentFactories(): Observable<TournamentFactory[]> {
    return this.httpClient.get<TournamentFactory[]>(`${server}/tournamentFactory/`);
  }

  getSingleFactory(idTournament: number, mainOnly: boolean = false): Observable<TournamentFactory> {
    return this.httpClient.get<TournamentFactory>(`${server}/tournamentFactory/${idTournament}${mainOnly ? '' : '/all'}`);
  }

  getSingleTournament(id: number): Observable<Tournament> {
    return this.httpClient.get<Tournament>(`${server}/tournament/${id}`);
  }

  getPlayerList(id: number): Observable<Player[]> {
    return this.httpClient.get<Player[]>(`${server}/playerTournament/${id}`);
  }

  postPlayerInTournament(idTournament: number, player: Player): Observable<any> {
    return this.httpClient.post(`${server}/playerTournament/${idTournament}`, player);
  }

  postTournaments(factory: TournamentFactory): Observable<any> {
    return this.httpClient.post(`${server}/tournamentFactory/`,
      factory);
  }

  postTournament(tournament: Tournament): Observable<any> {
    return this.httpClient.post(`${server}/tournament/`,
      tournament);
  }
}
