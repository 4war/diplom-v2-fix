import {Component, OnInit} from '@angular/core';
import {GeneralTournamentService} from "../services/general-tournament.service";
import {Tournament} from "../shared/Tournament";
import {TournamentService} from "../services/tournament.service";
import {ActivatedRoute, NavigationEnd, Router} from "@angular/router";
import {TournamentFactory} from "../shared/TournamentFactory";
import {filter} from "rxjs";
import {AuthService} from "../services/auth.service";
import {Account} from "../shared/Account";

@Component({
  selector: 'app-get-single-tournament',
  templateUrl: './get-tournament.component.html',
  styleUrls: ['./get-tournament.component.scss']
})

export class GetTournamentComponent implements OnInit {

  tournamentId!: number;
  factory!: TournamentFactory;
  canRegister = false;
  account?: Account;

  constructor(public general: GeneralTournamentService,
              private tournamentService: TournamentService,
              private authService: AuthService,
              private route: ActivatedRoute,
              private router: Router) {

    this.authService.getCurrentAccount().subscribe(response => {
      this.account = response;
      if (this.account) {
        let split = this.account.roles.split(' ');
        if (split && split.length == 1 && split[0] == 'user') {
          this.canRegister = !!this.account.player;
        }
      }
    });

    this.factory = general.currentFactory;

    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    if (this.factory.tournaments.length == 0) {
      this.tournamentService.getSingleFactoryFromTournament(this.tournamentId).subscribe(response => {
        this.general.currentFactory = response;
        this.factory = response;
      })
    }

    this.tournamentService.getTournament(this.tournamentId)
      .subscribe(t => this.general.currentTournament = t);
  }

  ngOnInit(): void {
  }

  redirectToFactory(): void {
    this.router.navigateByUrl(`factory/${this.general.currentFactory.id}`);
  }

  redirectToTournamentInFactory(id: number): void {
    if (id == 0) return;
    this.tournamentService.getTournament(id)
      .subscribe(t => {
        this.general.currentTournament = t;
        this.router.navigateByUrl(`tournament/${id}/${this.general.currentTournamentTab}`);
      });
  }

  redirectToTab(tab: string): void {
    this.general.currentTournamentTab = tab;
    this.router.navigateByUrl(`tournament/${this.tournamentId}/${tab}`);
  }
}
