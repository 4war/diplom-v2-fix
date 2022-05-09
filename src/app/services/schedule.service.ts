import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Schedule} from "../shared/Schedule";
import {server} from "../../environments/environment";
import {Court} from "../shared/Court";
import {Match} from "../shared/Match";

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  constructor(private httpClient: HttpClient) {
  }

  getSchedule(day: Date, factoryId: number): Observable<Schedule> {
    return this.httpClient.post<Schedule>(`${server}/schedule/${factoryId}`, JSON.stringify(day), {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getCourts(day: Date, factoryId: number): Observable<Court[]> {
    return this.httpClient.post<Court[]>(`${server}/schedule/${factoryId}/courts`, JSON.stringify(day), {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getOrders(day: Date, factoryId: number): Observable<number[]> {
    return this.httpClient.post<number[]>(`${server}/schedule/${factoryId}/order`, JSON.stringify(day), {
      headers: {'Content-Type': 'application/json'}
    });
  }

  getDays(factoryId: number): Observable<Date[]> {
    return this.httpClient.get<Date[]>(`${server}/schedule/${factoryId}/days`);
  }


}
