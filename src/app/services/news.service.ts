import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {server} from "../../environments/environment";
import {Player} from "../shared/Player";
import {Tournament} from "../shared/Tournament";

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  constructor(private httpClient: HttpClient) {
  }

  post(login: string, password: string) {
    return this.httpClient.post<string>(`${server}/user/register`, {login, password})
      .subscribe(response => localStorage.setItem('token', response));
  }

  registerInTournament(player: Player, tournament: Tournament) {
    let token = localStorage.getItem('token');
    return this.httpClient.post(`${server}/playerTournament/${tournament.id}`, player,
      {
        headers: new HttpHeaders({
          'authorization': token ?? ''
        })
      });
  }
}
