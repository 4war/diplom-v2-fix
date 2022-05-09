import {Player} from "./Player";
import {Time} from "@angular/common";
import {Round} from "./Round";
import {Court} from "./Court";

export class Match {
  id?: number;
  player1?: Player;
  player2?: Player;
  score: string = '';
  start?: Date;
  end?: Date;
  winner?: Player;
  placeInRound!: number;

  round!: Round;
  court?: Court;
  orderInSchedule?: number;
}
