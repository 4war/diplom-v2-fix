import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from "@angular/common/http";
import {Tournament} from "../shared/Tournament";
import {catchError, Observable, throwError} from "rxjs";
import {TournamentFactory} from "../shared/TournamentFactory";
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
    return this.httpClient.get<Tournament[]>('https://localhost:5001/api/tournament/');
  }

  getTournamentFactories(): Observable<TournamentFactory[]> {
    return this.httpClient.get<TournamentFactory[]>('https://localhost:5001/api/tournamentFactory/');
  }

  getSingleFactory(idTournament: number): Observable<TournamentFactory>{
    return this.httpClient.get<TournamentFactory>(`https://localhost:5001/api/tournamentFactory/${idTournament}`);
  }

  getSingleTournament(id: number): Observable<Tournament> {
    return this.httpClient.get<Tournament>(`https://localhost:5001/api/tournament/${id}`);
  }

  postTournaments(factory: TournamentFactory): Observable<any> {
    console.log(JSON.stringify(factory));
    return this.httpClient.post('https://localhost:5001/api/tournamentFactory/',
      factory);
  }

  postTournament(tournament: Tournament): Observable<any> {
    console.log(JSON.stringify(tournament));
    return this.httpClient.post('https://localhost:5001/api/tournament/',
      tournament);
  }

  private handleError(error: HttpErrorResponse) {
    if (error.status === 0) {
      console.error('An error occurred:', error.error);
    } else {
      console.error(
        `Backend returned code ${error.status}, body was: `, error.error);
    }
    return throwError(() => new Error('Something bad happened; please try again later.'));
  }
}
