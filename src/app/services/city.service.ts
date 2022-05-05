import {Injectable} from '@angular/core';
import {Observable} from "rxjs";
import {City} from "../shared/City";
import {HttpClient} from "@angular/common/http";
import {server} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class CityService {

  constructor(private httpClient: HttpClient) {
  }

  getCities(startWith: string): Observable<City[]> {
    return this.httpClient.post<City[]>(`${server}/city`, JSON.stringify(startWith), {
      headers: {'Content-Type': 'application/json'}
    });
  }
}
