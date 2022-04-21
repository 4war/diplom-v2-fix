import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Player} from "../shared/Player";
import {server} from "../../environments/environment";
import {Tournament} from "../shared/Tournament";

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  constructor(private httpClient: HttpClient) {

  }

  getPlayerList(): Observable<Player[]>{
    return this.httpClient.get<Player[]>(`${server}/player`);
  }

  getPlayer(rni: number): Observable<Player>{
    return this.httpClient.get<Player>(`${server}/player/${rni}`);
  }

  getTournaments(rni: number): Observable<Tournament[]>{
    return this.httpClient.get<Tournament[]>(`${server}/player/${rni}/tournaments`);
  }
}
