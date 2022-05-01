import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {GeneralService} from "../services/general.service";
import {MatchService} from "../services/match.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Match} from "../shared/Match";
import {Digit, Score} from "../shared/Score";
import {WinDialogComponent} from "./win-dialog/win-dialog.component";
import {filter} from "rxjs";
import Enumerable from "linq";
import from = Enumerable.from;
import {DigitComponent} from "./digit/digit.component";
import {F} from "@angular/cdk/keycodes";

@Component({
  selector: 'app-single-match-overview',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})
export class SingleMatchOverviewComponent implements OnInit {

  score: Score;
  win = 59;
  finished: boolean;
  initialMatch?: Match;
  winDialogRef?: MatDialogRef<WinDialogComponent>;

  constructor(private general: GeneralService,
              public matchService: MatchService,
              @Inject(MAT_DIALOG_DATA) public match: Match,
              private dialog?: MatDialog,) {

    this.score = new Score(match);
    this.finished = !!this.match.winner;
  }

  ngOnInit(): void {
  }

  setWin(playerNumber: number): void {
    if (this.checkScore(playerNumber)) {
      this.finished = true;
      this.match.winner = playerNumber == 0 ? this.match.player1 : this.match.player2;
      return;
    }

    this.openDialog(playerNumber);
  }

  resetVictory(): void{
    this.finished = false;
    this.match.winner = undefined;
  }

  updateScore(): void {
    let array = from(this.score.playerScore1).zip(this.score.playerScore2,
      (x, y) => `${x.value}${y.value}`)
      .toArray();

    if (this.score.situationMessage)
      array.push(this.score.situationMessage);

    this.match.score = array.join(' ');

    if (this.match.winner){
      let number = this.match.player1?.rni == this.match.winner.rni ? 0 : 1;
      if(!this.score.situationMessage && !this.checkScore(number)){
        this.finished = false;
        this.match.winner = undefined;
      }
    }
  }

  checkScore(playerNumber: number): boolean {
    let counter1 = 0;
    let counter2 = 0;
    let setsToWin = 2;
    for (let i = 0; i < Math.min(this.score?.playerScore1?.length, this.score?.playerScore2?.length); i++) {
      let games1 = this.score?.playerScore1![i];
      let games2 = this.score?.playerScore2![i];
      if (games1.value! > games2.value! && (games1.value! >= 7) || (games1.value! == 6 && games1.value! - games2.value! >= 2))
        counter1++;
      if (games2.value! > games1.value! && (games2.value! >= 7) || (games2.value! == 6 && games2.value! - games1.value! >= 2))
        counter2++;

      if (counter1 >= setsToWin && playerNumber == 0)
        return true;

      if (counter2 >= setsToWin && playerNumber == 1)
        return true;
    }

    return false;
  }

  startEdit(match: Match): void {
    this.matchService.editMode = true;
    this.initialMatch = Object.assign({}, match);
  }

  save(): void {
    this.matchService.editMode = false;
    if (this.match) {
      this.matchService.updateMatch(this.match).subscribe(console.log);
    }
  }

  cancel(): void {
    this.matchService.editMode = false;
    this.copyFrom(this.initialMatch!);
    this.score = new Score(this.match);
    this.updateScore();
  }

  openDialog(playerNumber: number): void {
    this.winDialogRef = this.dialog?.open(WinDialogComponent);
    this.winDialogRef?.afterClosed().subscribe(response => {
      if (!response) return;
      this.score.situationMessage = response;
      this.finished = true;
      this.match.winner = playerNumber == 0 ? this.match.player1 : this.match.player2;
      this.updateScore();
    });
  }

  copyFrom(clone: Match): void {
    for (let propertyName of Object.getOwnPropertyNames(this.match)) {
      let value = Reflect.get(clone, propertyName)
      Reflect.set(this.match, propertyName, value);
    }
  }

  addSet(): void {
    let digit1 = new Digit();
    digit1.value = 0;
    this.score.playerScore1.push(digit1);

    let digit2 = new Digit();
    digit2.value = 0;
    this.score.playerScore2.push(digit2);
  }

  removeSet(): void {
    if (this.score.playerScore1.length > 0)
      this.score.playerScore1.pop();

    if (this.score.playerScore2.length > 0)
      this.score.playerScore2.pop();

    this.updateScore();
  }
}
