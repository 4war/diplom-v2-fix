﻿import {Player} from "./Player";
import {Time} from "@angular/common";

export class Match {

  id?: number;
  player1?: Player;
  player2?: Player;
  score: string = '';
  start?: Date;
  duration?: Date;
  winner?: Player;
  placeInRound!: number;
  
}
