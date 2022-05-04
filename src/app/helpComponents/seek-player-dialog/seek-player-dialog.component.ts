import {Component, Inject, OnInit} from '@angular/core';
import {MatDialogRef} from "@angular/material/dialog";
import {GeneralService} from "../../services/general.service";
import {TournamentService} from "../../services/tournament.service";
import {Player} from "../../shared/Player";
import {FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {map, Observable, startWith} from "rxjs";

@Component({
  selector: 'app-seek-player-dialog',
  templateUrl: './seek-player-dialog.component.html',
  styleUrls: ['./seek-player-dialog.component.scss']
})
export class SeekPlayerDialogComponent implements OnInit {

  playerList: Player[] = [];
  player?: Player;
  tournamentId?: number;

  formControl = new FormControl();
  filteredOptions!: Observable<Player[]>;

  options = ['One', 'Two', 'Three'];

  constructor(public general: GeneralService,
              public tournamentService: TournamentService,
              private dialogRef: MatDialogRef<SeekPlayerDialogComponent>,
              private router: Router) {
  }

  displayDelegate(inputPlayer: Player): string {
    return inputPlayer?.surname;
  }

  ngOnInit(): void {
    let urlSplit = this.router.url.split('/');
    this.tournamentId = parseInt(urlSplit[urlSplit.length - 2]);

    this.tournamentService.getPlayerList(this.tournamentId)
      .subscribe(response => {
        this.playerList = response;
        this.filteredOptions = this.formControl.valueChanges
          .pipe(
            startWith(''),
            map(value => this._filter(value)));
      });
  }

  private _filter(value: string): Player[] {
    return this.playerList.filter(p =>  p.surname.toLowerCase().includes(value.toLowerCase()));
  }

  clear(): void{
    this.player = undefined;
    this.dialogRef.close();
  }

  confirm(player: Player): void {
    this.dialogRef.close(player);
  }
}
