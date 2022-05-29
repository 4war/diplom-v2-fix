import {Player} from "./Player";

export class TestResult {
  id?: number;
  player!: Player;
  defensive!: number;
  reactive!: number;
  active!: number;
  moral!: number;

  lastTimeCompleted!: Date;
}
