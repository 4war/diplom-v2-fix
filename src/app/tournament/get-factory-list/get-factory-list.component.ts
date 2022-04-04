import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {Gender, Tournament} from "../../shared/Tournament";
import {ages, Category} from "../../defaults";
import Enumerable from "linq";
import from = Enumerable.from;
import {TournamentFactory} from "../../shared/TournamentFactory";
import {GeneralService} from "../../services/general.service";

@Component({
  selector: 'app-get-tournament',
  templateUrl: './get-factory-list.component.html',
  styleUrls: ['./get-factory-list.component.css', '../../../styles.scss']
})
export class GetFactoryListComponent implements OnInit {
  factories: TournamentFactory[] = [];
  response: any;

  displayedColumns: string[] = ['FirstTournamentId', 'Name', 'City', 'Date', 'Category', 'Ages'];

  constructor(private tournamentService: TournamentService, private general: GeneralService) {
  }

  ngOnInit(): void {
    this.getList();
  }

  getList(): void {
    this.tournamentService.getTournamentFactories().subscribe(response => {
      this.factories = response;
      console.log(this.factories);
    });
  }

  open(firstTournamentId: number): void {
    this.tournamentService.getSingleFactory(firstTournamentId)
      .subscribe(x => {
        console.log(x);
        this.general.currentFactory = x;
        this.general.router.navigateByUrl('factory/get');
      });
  }

  getAgeViewValue(ageArray: number[]): string {
    return from(ageArray).select(a => from(ages).first(x => x.max == a).viewValue).toArray().join('; ');
  }
}
