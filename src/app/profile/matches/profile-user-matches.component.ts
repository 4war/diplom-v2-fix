import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../services/auth.service";
import {Match} from "../../shared/Match";
import {Player} from "../../shared/Player";
import {MatchService} from "../../services/match.service";
import {MatDialog} from "@angular/material/dialog";
import {SingleMatchOverviewComponent} from "../../single-match/single-match.component";
import {offset} from "../../single-match/duration/duration.component";

@Component({
  selector: 'app-matches',
  templateUrl: './profile-user-matches.component.html',
  styleUrls: ['./profile-user-matches.component.scss']
})
export class ProfileUserMatchesComponent implements OnInit {

  matches: Match[] = [];
  player?: Player;

  displayedColumns = ["Self", "Score", "Enemy", "Date", "Duration"]

  constructor(public authService: AuthService,
              private matchService: MatchService,
              private dialog: MatDialog) {
    this.reInit();
  }

  reInit(): void {
    this.player = this.authService.account?.player;
    if (this.player)
      this.matchService.getPlayerMatches(this.player).subscribe(response => this.matches = response);
  }

  ngOnInit(): void {
  }

  getDuration(match: Match): Date | undefined {
    if (match.start && match.end) {
      let start = new Date(match.start?.toString());
      let end = new Date(match.end?.toString());
      return new Date(end.getTime() - start.getTime() + offset);
    }
    return undefined;
  }

  getScore(match: Match): string {
    if (this.player?.rni == match.winner?.rni) return match.score;
    let split = match.score.split(' ');
    let sb = '';
    split.forEach(set => {
      if (set.length != 2) {
        sb += set;
      } else {
        sb += set[1];
        sb += set[0];
        sb += ' ';
      }
    });
    return sb;
  }

  open(match: Match) {
    this.dialog.open(SingleMatchOverviewComponent, {
      data: match,
    });
  }


}
