import {Component, Inject, OnInit} from '@angular/core';
import {GeneralService} from "../services/general.service";
import {MatchService} from "../services/match.service";
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {Match} from "../shared/Match";
import {Score} from "../shared/Score";
import {WinDialogComponent} from "./win-dialog/win-dialog.component";
import {filter} from "rxjs";

@Component({
  selector: 'app-single-match-overview',
  templateUrl: './single-match.component.html',
  styleUrls: ['./single-match.component.scss']
})
export class SingleMatchOverviewComponent implements OnInit {

  score: Score;
  win = 59;
  finished = false;

  digitStyle: any = {
    'color': 'green',
  };

  cssColors = ['green', 'red', 'isChanging', ''];
  winDialogRef?: MatDialogRef<WinDialogComponent>;

  constructor(private general: GeneralService,
              public matchService: MatchService,
              @Inject(MAT_DIALOG_DATA) public match: Match,
              private dialog?: MatDialog,) {

    this.score = new Score(match);
  }

  ngOnInit(): void {
  }

  setWin(playerNumber: number): void {
    if (this.checkScore(playerNumber)){
      this.finished = true;
      this.match.winner = playerNumber == 0 ? this.match.player1 : this.match.player2;
      return;
    }

    this.openDialog(playerNumber);
  }

  checkScore(playerNumber: number): boolean {
    let counter1 = 0;
    let counter2 = 0;
    let setsToWin = 2;
    for (let i = 0; i < Math.min(this.score?.playerScore1?.length, this.score?.playerScore2?.length); i++) {
      let games1 = this.score?.playerScore1![i];
      let games2 = this.score?.playerScore2![i];
      if (games1.value! > games2.value! && (games1.value! == 7) || (games1.value! == 6 && games1.value! - games2.value! >= 2))
        counter1++;
      if (games2.value! > games1.value! && (games2.value! == 7) || (games2.value! == 6 && games2.value! - games1.value! >= 2))
        counter2++;

      if (counter1 >= setsToWin && playerNumber == 0)
        return true;

      if (counter2 >= setsToWin && playerNumber == 1)
        return true;
    }

    return false;
  }

  openDialog(playerNumber: number): void {
    this.winDialogRef = this.dialog?.open(WinDialogComponent);
    this.winDialogRef?.afterClosed().subscribe(response => {
      this.score.situationMessage = response;
      //this.finished = true;
      this.match.winner = playerNumber == 0 ? this.match.player1 : this.match.player2;
    });
  }
}
