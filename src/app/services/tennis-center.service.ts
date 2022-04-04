import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {TennisCenter} from "../shared/TennisCenter";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TennisCenterService {

  constructor(private httpClient: HttpClient) { }

  getTennisCenters(): Observable<TennisCenter[]>{
    let a = this.httpClient.get<TennisCenter[]>('https://localhost:5001/api/tennisCenter/');
    //debugger
    return a;
  }
}
