import {Component, OnInit} from '@angular/core';
import {AuthService} from "../../../services/auth.service";
import {Player} from "../../../shared/Player";
import {PlayerService} from "../../../services/player.service";

@Component({
  selector: 'app-profile-overview-fio',
  templateUrl: './profile-overview-fio.component.html',
  styleUrls: ['./profile-overview-fio.component.css']
})
export class ProfileOverviewFioComponent implements OnInit {

  player?: Player;

  constructor(private authService: AuthService,
              private playerService: PlayerService) {
    this.player = authService.account?.player;
  }

  ngOnInit(): void {
  }

  getAge(): string {
    if (!this.player) return '';
    let dob = new Date(this.player!.dateOfBirth.toString());
    let difference = Date.now() - dob.getTime();
    let years = Math.abs(Math.round(difference / 1000 / 60 / 60 / 24 / 365.25));
    return years.toString();
  }

}
