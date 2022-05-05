import {Component, OnInit} from '@angular/core';
import {TournamentService} from "../../services/tournament.service";
import {ages, Category} from "../../defaults";
import Enumerable from "linq";
import from = Enumerable.from;
import {TournamentFactory} from "../../shared/TournamentFactory";
import {GeneralService} from "../../services/general.service";

@Component({
  selector: 'app-get-tournament',
  templateUrl: './get-factory-list.component.html',
  styleUrls: ['./get-factory-list.component.scss']
})

export class GetFactoryListComponent implements OnInit {
  factories: TournamentFactory[] = [];
  response: any;

  editMode = false;

  displayedColumns: string[] = ['Index', 'Name', 'City', 'Date', 'Category', 'Ages', 'Delete'];

  constructor(private tournamentService: TournamentService,
              private general: GeneralService) {
  }

  ngOnInit(): void {
    this.reInit();
  }

  reInit(): void {
    this.tournamentService.getTournamentFactories().subscribe(response => {
      this.factories = response;
    });
  }

  open(firstTournamentId: number): void {
    this.tournamentService.getSingleFactory(firstTournamentId, true)
      .subscribe(x => {
        this.general.currentFactory = x;
        this.general.router.navigateByUrl('factory/get');
      });
  }

  getAgeViewValue(ageArray: number[]): string {
    return from(ageArray).select(a => from(ages).first(x => x.max == a).viewValue).toArray().join('; ');
  }

  changeEdit(): void{
    this.editMode = !this.editMode;
  }

  delete(factory: TournamentFactory){
    this.tournamentService.deleteFactory(factory).subscribe(response => {
      console.log(`Удалено ${response.name}`);
      this.reInit();
    })
  }


}
