import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Notification} from "../shared/Notification";
import {Observable} from "rxjs";
import {server} from "../../environments/environment";
import {TestResult} from "../shared/TestResult";
import {Player} from "../shared/Player";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  notifications: Notification[] = [];

  constructor(private httpClient: HttpClient) { }
}
