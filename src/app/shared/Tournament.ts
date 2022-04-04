import {TennisCenter} from "./TennisCenter";

export class Tournament {
  id = 0;
  name: string = '';
  category: string = '';

  age: number = 0;
  netRange = 32;
  gender: number = 0;
  stage: number = 0;
  TennisCenter!: TennisCenter;

  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  dateRequest?: Date;
}

export enum Gender {
  Male = 'М',
  Female = 'Ж'
}

export enum Stage{
  Main,
  Qual
}
