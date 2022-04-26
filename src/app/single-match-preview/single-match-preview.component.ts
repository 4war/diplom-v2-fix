import {Component, Input, OnInit} from '@angular/core';
import {Player} from "../shared/Player";
import {GeneralService} from "../services/general.service";
import {PlayerService} from "../services/player.service";
import {Match} from "../shared/Match";

@Component({
  selector: 'app-single-match-preview',
  templateUrl: './single-match-preview.component.html',
  styleUrls: ['./single-match-preview.component.scss']
})
export class SingleMatchPreviewComponent implements OnInit {

  constructor(public general: GeneralService,
              private playerService: PlayerService) {

  }

  @Input() match?: Match;
  score1 = '';
  score2 = '';

  player1?: Player;
  player2?: Player;

  ngOnInit(): void {
    this.update();
  }

  getViewScore(player: number, score?: string): string{
    if (player != 1 && player != 2 || !score)
      return '';

    let split = score.split(' ');
    if (split.length == 0)
      return '';

    let result: string[] = [];
    for (let set of split) {
      if (set.length < 2)
        break;

      if (set.length >= 2)
        result.push(set[player - 1]);
    }

    return result.join(' ');
  }

  update(): void {
    this.player1 = this.match?.player1;
    this.player2 = this.match?.player2;
    this.score1 = this.getViewScore(1, this.match?.score);
    this.score2 = this.getViewScore(2, this.match?.score);
  }
}
