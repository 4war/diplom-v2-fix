import {NgttRound} from "ng-tournament-tree";
import {Match} from "./Match";
import {Bracket} from "./Bracket";

export class Round implements NgttRound{
  id: number = 0;
  matches: Match[] = [];
  type: "Winnerbracket" | "Loserbracket" | "Final" = "Winnerbracket";

  stage: number = 0;
  bracket!: Bracket;
}
