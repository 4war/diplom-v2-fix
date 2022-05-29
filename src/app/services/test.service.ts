import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {TestResult} from "../shared/TestResult";
import {server} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TestService {

  testResults: TestResult[] = [];

  constructor(private httpClient: HttpClient) { }

  get(rni: number): Observable<TestResult[]>{
    return this.httpClient.get<TestResult[]>(`${server}/test/${rni}`);
  }

  post(rni: number, testResult: TestResult): Observable<any>{
    return this.httpClient.post<any>(`${server}/test/${rni}`, testResult);
  }
}
