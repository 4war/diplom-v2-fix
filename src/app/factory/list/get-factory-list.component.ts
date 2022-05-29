import {Component, Input, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {ages, Category} from "../../defaults";
import Enumerable from "linq";
import {TournamentFactory} from "../../shared/TournamentFactory";
import {GeneralTournamentService} from "../../services/general-tournament.service";
import {AuthService} from "../../services/auth.service";
import {Account} from "../../shared/Account";
import {Role} from "../../profile/profile.component";
import from = Enumerable.from;

@Component({
  selector: 'app-get-tournament-list',
  templateUrl: './get-factory-list.component.html',
  styleUrls: ['./get-factory-list.component.scss']
})

export class GetFactoryListComponent implements OnInit {
  factories: TournamentFactory[] = [];
  response: any;

  editMode = false;
  canEdit = false;
  account?: Account;
  displayedColumns: string[] = ['Index', 'Name', 'City', 'Date', 'Category', 'Ages', 'Delete'];

  constructor(private tournamentService: TournamentService,
              public authService: AuthService,
              private general: GeneralTournamentService) {
  }

  public ListSettings: typeof ListSettings = ListSettings;

  @Input() listSettings?: ListSettings = ListSettings.None;

  ngOnInit(): void {
    this.authService.getCurrentAccount().subscribe(response => {
      this.account = response;
      this.canEdit = this.listSettings == ListSettings.None && this.authService.isAuthenticated() && this.authService.role == Role.Admin;
      this.reInit();
    })
  }

  reInit(): void {
    if (this.listSettings == ListSettings.NearestFuture) {
      this.tournamentService.getFutureTournamentFactories().subscribe(response => {
        this.factories = response;
      });
    } else {
      this.tournamentService.getTournamentFactories().subscribe(response => {
        this.factories = response;
      });
    }
  }

  open(id: number): void {
    this.tournamentService.getSingleFactory(id)
      .subscribe(x => {
        let mainTournaments = from(x.tournaments).where(t => t.stage == 0).toArray();
        this.general.currentFactory = x;
        this.general.currentFactory.tournaments = mainTournaments;
        this.general.router.navigateByUrl('factory/get');
      });
  }

  getAgeViewValue(ageArray: string): string {
    return from(from(ageArray.split(' ')).select(a => parseInt(a)))
      .select(a => from(ages).first(x => x.max == a).viewValue).toArray().join('; ');
  }

  changeEdit(): void {
    this.editMode = !this.editMode;
  }

  delete(factory: TournamentFactory) {
    this.tournamentService.deleteFactory(factory).subscribe(response => {
      console.log(`Удалено ${response.name}`);
      this.reInit();
    })
  }
}

export enum ListSettings {
  None,
  NearestFuture,
}
