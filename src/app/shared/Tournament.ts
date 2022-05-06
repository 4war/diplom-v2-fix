﻿import {TennisCenter} from "./TennisCenter";
import {Bracket} from "./Bracket";
import {TournamentFactory} from "./TournamentFactory";

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

  qualification?: Tournament;
  numberOfQualificationWinners: number = 4;

  factoryId!: number;
}

export enum Gender {
  Male = 'М',
  Female = 'Ж'
}

export enum Stage{
  Main,
  Qual
}
