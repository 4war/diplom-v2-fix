import {Component, OnInit} from '@angular/core';
import {GeneralService} from "../services/general.service";
import {Tournament} from "../shared/Tournament";
import {TournamentService} from "../services/tournament.service";
import {ActivatedRoute, Router} from "@angular/router";
import {TournamentFactory} from "../shared/TournamentFactory";

@Component({
  selector: 'app-get-single-tournament',
  templateUrl: './get-tournament.component.html',
  styleUrls: ['./get-tournament.component.scss']
})

export class GetTournamentComponent implements OnInit {

  tournamentId!: number;
  factory!: TournamentFactory;

  constructor(public general: GeneralService,
              private tournamentService: TournamentService,
              private route: ActivatedRoute,
              private router: Router) {

    this.factory = general.currentFactory;

    this.route.params.subscribe(response => {
      this.tournamentId = response['id'];
      if (this.factory.tournaments.length == 0){
        this.tournamentService.getSingleFactoryFromTournament(this.tournamentId).
          subscribe(response => {
            this.general.currentFactory = response;
            this.factory = response;
        })
      }
      this.tournamentService.getSingleTournament(this.tournamentId)
        .subscribe(t => this.general.currentTournament = t);
    });
  }



  ngOnInit(): void {
  }

  redirectToFactory(): void {
    this.router.navigateByUrl(`factory/${this.general.currentFactory.firstTournamentId}`);
  }

  redirectToTournamentInFactory(id: number): void {
    this.router.navigateByUrl(`tournament/${id}/${this.general.currentTournamentTab}`);
  }

  redirectToTab(tab: string): void{
    this.general.currentTournamentTab = tab;
    this.router.navigateByUrl(`tournament/${this.tournamentId}/${tab}`);
  }
}
