import {NgttRound, NgttTournament} from "ng-tournament-tree";
import {Player} from "./Player";

export class Bracket implements NgttTournament {
  rounds: Round[] = [];

  constructor() {
    this.testSeed();
  }

  testSeed(): void{
    let player1 = new Player();
    player1.rni = 1;
    player1.surname = "Dummy"
    player1.name = "Tidehunter"

    let player2 = new Player();
    player2.rni = 2;
    player2.surname = "Macropyre"
    player2.name = "Jakiro"

    this.rounds = [
      {
        matches: [
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
        ],
        type: "Winnerbracket",
      },

      {
        matches: [
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
        ],
        type: "Winnerbracket",
      },

      {
        matches: [
          { player1: player1, player2: player2, score: '60 60' },
          { player1: player1, player2: player2, score: '60 60' },
        ],
        type: "Winnerbracket",
      },

      {
        matches: [
          { player1: player1, player2: player2, score: '60 60' },
        ],
        type: "Final",
      },
    ];

    this.rounds[3].matches[0].score = "62 63";
  }
}

export class Round implements NgttRound{
  matches: Match[] = [];
  type: "Winnerbracket" | "Loserbracket" | "Final" = "Winnerbracket";
}

export class Match{
  player1?: Player;
  player2?: Player;
  score?: string;
}
