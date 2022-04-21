import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TennisCenter} from "../shared/TennisCenter";
import {Observable} from "rxjs";
import {server} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TennisCenterService {

  constructor(private httpClient: HttpClient) { }

  getTennisCenters(): Observable<TennisCenter[]>{
    return this.httpClient.get<TennisCenter[]>(`${server}/tennisCenter/`);
  }
}
