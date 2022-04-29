import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Match} from "../shared/Match";
import {server} from "../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class MatchService {

  editMode = false;

  startEdit(): void{
    this.editMode = true;
  }

  save(): void{
    this.editMode = false;
  }

  cancel(): void{
    this.editMode = false;
  }

  constructor(private httpClient: HttpClient) { }

  getMatch(id: number): Observable<Match>{
    return this.httpClient.get<Match>(`${server}/match/${id}`)
  }
}
