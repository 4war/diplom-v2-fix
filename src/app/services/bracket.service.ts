import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Bracket} from "../shared/Bracket";
import {server} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})

export class BracketService {

  constructor(private httpClient: HttpClient) {
  }

  getBracket(id: number): Observable<Bracket> {
    return this.httpClient.get<Bracket>(`${server}/bracket/${id}`);
  }

}
