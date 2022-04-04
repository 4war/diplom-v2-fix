import {TennisCenter} from "./TennisCenter";
import {Gender, Tournament} from "./Tournament";

export class TournamentFactory{
  firstTournamentId: number = 0;

  name: string ='';
  category: string = '';
  ages: number[] = [];
  netRange = 32;

  hasQualification = true;
  numberOfQualificationWinners = 4;

  dateStart: Date = new Date();
  dateEnd: Date = new Date();
  dateRequest?: Date;

  tennisCenter!: TennisCenter;
  genders: number[] = [0,1];
  tournaments: Tournament[] = [];
}
