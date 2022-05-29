import {Component, OnInit} from '@angular/core';
import {Account} from "../../shared/Account";
import {AuthService} from "../../services/auth.service";
import {TournamentService} from "../../services/tournament.service";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {PlayerService} from "../../services/player.service";
import {NavigationEnd, Router} from "@angular/router";
import {filter} from "rxjs";

@Component({
  selector: 'app-tournament-register',
  templateUrl: './tournament-register.component.html',
  styleUrls: ['./tournament-register.component.scss']
})
export class TournamentRegisterComponent implements OnInit {

  account?: Account;
  playerFitsTournamentRules = false;
  mug?: FormData;

  constructor(private authService: AuthService,
              public general: GeneralTournamentService,
              private tournamentService: TournamentService,
              private playerService: PlayerService,
              private router: Router) {
    this.authService.getCurrentAccount().subscribe(a => {
      this.account = a;
      this.reInit();
    });

    router.events.pipe(filter(e => e instanceof NavigationEnd && general.currentTournamentTab == "register"))
      .subscribe(response => this.reInit());
  }

  reInit(): void {
    let urlSplit = this.router.url.split('/');
    let tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.general.currentTournament.age == 0) {
      this.tournamentService.getTournament(tournamentId)
        .subscribe(response => {
            this.general.currentTournament = response;
            this.updatePlayerFitsTournamentRules();
          }
        );
    } else {
      this.updatePlayerFitsTournamentRules();
    }
  }

  ngOnInit(): void {
  }

  updatePlayerFitsTournamentRules(): void {
    if (this.account?.player) {
      let age = this.playerService.getAge(this.account.player);
      this.playerFitsTournamentRules = !!age
        && this.general.currentTournament.age >= age
        && this.general.currentTournament.gender == this.account.player.gender;
    }
  }

  confirm(event: any) {
    let files = event.target.files;
    if (files.length > 0) {
      let formData: FormData = new FormData();
      formData.append('passport', files[0], files[0].name);
      formData.append('medicalCertificate', files[1], files[1].name);
      formData.append('polys', files[2], files[2].name);
      this.tournamentService.requestRegistration(formData)
        .subscribe(console.log);
    }
  }
}

