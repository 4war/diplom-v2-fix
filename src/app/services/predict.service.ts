import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Match} from "../shared/Match";
import {Observable} from "rxjs";
import {Player} from "../shared/Player";
import {server} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class PredictService {

  constructor(private httpClient: HttpClient) {
  }

  getPredictionFromMatch(match: Match): Observable<Prediction>{
    return this.httpClient.post<Prediction>(`${server}/winPredict/fromMatch`, match);
  }

}

export class Prediction{
  self!: Player;
  enemy!: Player;
  win: number = 50;
}
