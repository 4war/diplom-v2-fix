import {Player} from "./Player";
import {Byte} from "@angular/compiler/src/util";

const roleHierarchy = ["admin", "org", "user"];

export class Account{
  email!: string;
  roles!: string;
  password!: string;
  confirmedEmail!: boolean;
  player?: Player;
  avatar?: Byte[];
}




