import {City} from "../City";

export class PlayerFilterOptions{
  surname?: string;
  pointsFrom!: number;
  pointsUntil!: number;
  dobYearFrom!: number;
  dobYearUntil!: number;
  page?: number;
  take?: number;
  city?: string;
  gender?: number;
}
