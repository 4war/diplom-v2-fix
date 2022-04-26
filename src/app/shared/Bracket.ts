import {NgttRound, NgttTournament} from "ng-tournament-tree";
import {Player} from "./Player";
import {Tournament} from "./Tournament";
import {Time} from "@angular/common";
import {Round} from "./Round";
import {Match} from "./Match";

export class Bracket implements NgttTournament {
  tournamentId!: number;
  tournament!: Tournament;
  rounds: Round[] = [];

  constructor() {
   this.testSeed();
  }

  testSeed(): void {
    this.rounds = [
      {
        id: 0,
        matches: [],
        type: "Final",
        stage: 1,
      },
    ];
  }
}



