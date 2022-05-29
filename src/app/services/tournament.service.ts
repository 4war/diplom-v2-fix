import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Tournament} from "../shared/Tournament";
import {Observable} from "rxjs";
import {TournamentFactory} from "../shared/TournamentFactory";
import {Player} from "../shared/Player";
import {server} from "../../environments/environment";
import {ACCESS_TOKEN_KEY} from "./auth.service";
import {ages} from "../defaults";
import Enumerable from "linq";
import from = Enumerable.from;

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
    return this.httpClient.get<Tournament[]>(`${server}/tournament`);
  }

  getTournament(id: number): Observable<Tournament> {
    return this.httpClient.get<Tournament>(`${server}/tournament/${id}`);
  }

  postTournament(tournament: Tournament): Observable<any> {
    return this.httpClient.post(`${server}/tournament/`,
      tournament);
  }

  getPlayerList(id: number): Observable<Player[]> {
    console.log(localStorage.getItem(ACCESS_TOKEN_KEY));
    return this.httpClient.get<Player[]>(`${server}/playerTournament/${id}`, {
      headers: new HttpHeaders({
        'Authorization': localStorage.getItem(ACCESS_TOKEN_KEY) ?? ''
      })
    });
  }

  postPlayerInTournament(idTournament: number, player: Player): Observable<any> {
    return this.httpClient.post(`${server}/playerTournament/${idTournament}`, player);
  }

  requestPlayerRegistration(idTournament: number, player: Player, formData: FormData): Observable<any> {
    return this.httpClient.post(`${server}/playerTournament/${idTournament}/request`, formData); //todo: new Class
  }

  requestRegistration(formData: FormData) {
    return this.httpClient.post(`${server}/playerTournament/document`, formData);
  }

  getDocument(): Observable<Blob> {
    return this.httpClient.get(`${server}/playerTournament/document`,
      { responseType: 'blob' });
  }

  deletePlayerInTournament(idTournament: number, rni: number): Observable<any> {
    return this.httpClient.delete(`${server}/playerTournament/${idTournament}/${rni}`);
  }

  getTournamentFactories(): Observable<TournamentFactory[]> {
    return this.httpClient.get<TournamentFactory[]>(`${server}/tournamentFactory`);
  }

  getFutureTournamentFactories(): Observable<TournamentFactory[]> {
    return this.httpClient.get<TournamentFactory[]>(`${server}/tournamentFactory/future`);
  }

  getSingleFactory(idTournament: number): Observable<TournamentFactory> {
    return this.httpClient.get<TournamentFactory>(`${server}/tournamentFactory/${idTournament}`);
  }

  getSingleFactoryFromTournament(id: number): Observable<TournamentFactory> {
    return this.httpClient.get<TournamentFactory>(`${server}/tournamentFactory/fromTournament/${id}`);
  }

  postFactory(factory: TournamentFactory): Observable<TournamentFactory> {
    return this.httpClient.post<TournamentFactory>(`${server}/tournamentFactory/`,
      factory);
  }

  deleteFactory(factory: TournamentFactory): Observable<TournamentFactory> {
    return this.httpClient.delete<TournamentFactory>(`${server}/tournamentFactory/${factory.id}`);
  }
}
