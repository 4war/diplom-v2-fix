import {TennisCenter} from "./TennisCenter";
import {Bracket} from "./Bracket";

export class Tournament {
  id = 0;
  name: string = '';
  category: string = '';

  age: number = 0;
  netRange = 32;
  gender: number = 0;
  stage: number = 0;
  tennisCenter!: TennisCenter;

  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  dateRequest?: Date;

  bracket?: Bracket;

  qualification?: Tournament;
  numberOfQualificationWinners: number = 4;
}

export enum Gender {
  Male = 'М',
  Female = 'Ж'
}

export enum Stage{
  Main,
  Qual
}
