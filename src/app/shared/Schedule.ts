import {Match} from "./Match";

export class Schedule{
  id!: number;
  day!: Date;
  factoryId!: number;
  matches: Match[] = [];
}
