import {Player} from "./Player";
import {Tournament} from "./Tournament";

export class RegistrationRequest{
  player!: Player;
  tournament!: Tournament;
  medicalCertificate?: FormData;
  insurance?: FormData;
  passport?: FormData;

  status: 'none' | 'waiting' | 'accepted' | 'rejected' = 'none';
  date?: Date;
  payment: 'online' | 'later' = 'later';
}
