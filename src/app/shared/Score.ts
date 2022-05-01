import {MatchService} from "../services/match.service";
import {Match} from "./Match";
import Enumerable from "linq";
import from = Enumerable.from;

export class Score{
  situationMessage? : string;
  playerScore1: Digit[] = [];
  playerScore2: Digit[] = [];
  finished = false;
  raw: string;

  constructor(public match: Match) {
    this.raw = match.score;
    this.finished = !!match.winner;
    this.getScoreArray(match);
  }

  getScoreArray(match: Match){
    let score = match?.score;
    if (!score)
      return;

    if (score.toLowerCase().startsWith("отказ")) {
      this.situationMessage = "Отказ по болезни"
    }

    let split = score.split(" ");
    for (let i = 0; i < split.length; i++){
      let set = split[i];

      if (!(set.length >= 2 && /^\d+$/.test(set))){
        this.situationMessage = from(split).skip(i).toArray().join(' ');
        break;
      }

      let reverseFactor = match?.player1?.rni == match?.winner?.rni ? 0 : 1;
      let game1 = parseInt(set[reverseFactor]);
      let game2 = parseInt(set[1 - reverseFactor]);

      let digit1 = new Digit();
      digit1.finished = this.finished;
      digit1.win = this.finished && game1 > game2;
      digit1.value = game1;

      let digit2 = new Digit();
      digit2.finished = this.finished;
      digit2.win =  this.finished && game1 < game2;
      digit2.value = game2;

      this.playerScore1.push(digit1);
      this.playerScore2.push(digit2);
    }
  }
}

export class Digit {
  win = false;
  finished = false;
  value?: number;
}
