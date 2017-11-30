import {User} from "./user";
import {PokerTable} from "./pokertable";

export class TableStatus {

  smallBlind: User;
  bigBlind: User;
  currentBet: number;
  pot: number;
  turn: User;
  users: User[] = [];
  table: PokerTable;
}
