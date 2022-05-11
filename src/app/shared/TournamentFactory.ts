import {TennisCenter} from "./TennisCenter";
import {Gender, Tournament} from "./Tournament";

export class TournamentFactory{
  id: number = 0;

  name: string ='';
  category: string = '';
  ages: string = '';
  netRange = 32;

  hasQualification = true;
  numberOfQualificationWinners = 4;

  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  dateRequest?: Date;

  tennisCenter!: TennisCenter;
  genders: string = '0 1';
  tournaments: Tournament[] = [];
}
