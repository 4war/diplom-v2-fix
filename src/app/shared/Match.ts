import {Player} from "./Player";
import {Time} from "@angular/common";

export class Match{
  id?:number;
  playerId1?: number;
  player1?: Player;
  playerId2?: number;
  player2?: Player;
  score: string = '';
  start?: Date;
  duration?: Date;
  winnerId?: number;
  winner?: Player;
}
