import {Match} from "./Match";

export class Schedule{
  day!: Date;
  factoryId!: number;
  matches: Match[] = [];
}
