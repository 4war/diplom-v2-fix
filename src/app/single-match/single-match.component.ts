import {Component, EventEmitter, Inject, OnInit, Output, ViewChild} from '@angular/core';
import {GeneralTournamentService} from "../services/general-tournament.service";
import {MatchService} from "../services/match.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Match} from "../shared/Match";
import {Digit, Score} from "../shared/Score";
import {WinDialogComponent} from "./win-dialog/win-dialog.component";
import Enumerable from "linq";
import from = Enumerable.from;
import {Player} from "../shared/Player";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BracketService} from "../services/bracket.service";
import {AuthService} from "../services/auth.service";
import {Account} from "../shared/Account";
import {PredictService} from "../services/predict.service";

@Component({
  selector: 'app-single-match-overview',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})
export class SingleMatchOverviewComponent implements OnInit {

  score?: Score;
  win = Math.round(Math.random() * 100);
  finished?: boolean;
  initialMatch?: Match;
  winDialogRef?: MatDialogRef<WinDialogComponent>;

  formGroup = this.formBuilder.group({
    dateStart: new FormControl(),
    dateEnd: new FormControl(),
  });

  editDuration = false;
  canEdit = false;
  account?: Account;

  constructor(public matchService: MatchService,
              private general: GeneralTournamentService,
              private bracketService: BracketService,
              public authService: AuthService,
              private formBuilder: FormBuilder,
              private predictService: PredictService,
              @Inject(MAT_DIALOG_DATA) public match: Match,
              private dialog?: MatDialog,) {
    this.authService.getCurrentAccount().subscribe(a => {
      this.account = a;
      this.score = new Score(match);
      this.finished = !!this.match.winner;
      let split = this.account?.roles.split(' ');
      this.canEdit = !!split && (split.includes('org') || split.includes('admin'));
      this.predictService.getPredictionFromMatch(match).subscribe(prediction => {
        this.win = prediction.win;
      }, error => {
        let a = error;
      })
    });
  }

  ngOnInit(): void {
  }

  setWin(playerNumber: number): void {
    if ((playerNumber == 0 && !this.match.player2 && this.match.player1
        || playerNumber == 1 && !this.match.player1 && this.match.player2)
      || this.checkScore(playerNumber)) {
      this.finished = true;
      if (playerNumber == 1) this.match.score = this.reverseScore(this.match.score);
      this.match.winner = playerNumber == 0 ? this.match.player1 : this.match.player2;
      this.bracketService.moveWinnerInBracket(this.match).subscribe();
      return;
    }

    this.openDialog(playerNumber);
  }

  reverseScore(score: string) : string{
    let split = score.split(' ');
    let result: string[] = [];
    split.forEach(x => result.push(x[1] + x[0]));
    return result.join(' ');
  }


  resetVictory(): void {
    this.finished = false;
    this.match.winner = undefined;
  }

  updateScore(): void {
    if (this.score) {
      let array = from(this.score.playerScore1).zip(this.score.playerScore2,
        (x, y) => `${x.value}${y.value}`)
        .toArray();

      if (this.score.situationMessage)
        array.push(this.score.situationMessage);

      this.match.score = array.join(' ');

      if (this.match.winner) {
        let number = this.match.player1?.rni == this.match.winner.rni ? 0 : 1;
        if (!this.score.situationMessage && !this.checkScore(number)) {
          this.finished = false;
          this.match.winner = undefined;
        }
      }
    }
  }

  checkScore(playerNumber: number): boolean {
    let counter1 = 0;
    let counter2 = 0;
    let setsToWin = 2;

    if (this.score) {
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
      if (this.score)
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

  changePlayer(number: number, player: Player): void {
    if (number == 0)
      this.match.player1 = player;
    if (number == 1)
      this.match.player2 = player;
  }

  addSet(): void {
    let digit1 = new Digit();
    digit1.value = 0;
    this.score?.playerScore1.push(digit1);

    let digit2 = new Digit();
    digit2.value = 0;
    this.score?.playerScore2.push(digit2);
  }

  removeSet(): void {
    if (this.score && this.score.playerScore1.length > 0)
      this.score?.playerScore1.pop();

    if (this.score && this.score.playerScore2.length > 0)
      this.score.playerScore2.pop();

    this.updateScore();
  }
}
